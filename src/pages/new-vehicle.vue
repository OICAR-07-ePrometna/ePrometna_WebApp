<!-- eslint-disable-->
<template>

  <v-stepper ref="stepper" :items="steps" class="fill-all">
    <template v-slot:item.1>
      <v-card>
        <SearchBar :label="SearchOption.driver.label" :tooltip="SearchOption.driver.tooltip"
          :placeholder="SearchOption.driver.placeholder" :on-click="searchUserByOIB" />
        <VehicleOwnerSummaryPage :summary="owner" />
      </v-card>
    </template>

    <template v-slot:item.2>
      <VehicleSummaryPage 
        v-if="vehicleData" 
        v-bind:data="vehicleData.summary" 
        variant="create"
        @update:data="handleVehicleDataUpdate" 
      />
      <div v-else>No vehicle data</div>
    </template>

    <template v-slot:actions>
      <v-row>
        <v-col>
          <v-btn
            variant="text"
            @click="stepper?.prev()"
            :disabled="stepper && stepper.currentStep === 1"
          >
            Previous
          </v-btn>
        </v-col>
        <v-col cols="auto">
          <v-btn
            variant="text"
            @click="stepper?.next()"
            :disabled="stepper && stepper.currentStep === steps.length"
          >
            Next
          </v-btn>
        </v-col>
        <v-col cols="auto" class="ml-auto">
          <v-btn
            color="primary"
            @click="saveNewVehicle"
            :disabled="!vehicleData.owner.uuid || !vehicleData.registration"
          >
            Save Vehicle
          </v-btn>
        </v-col>
      </v-row>
    </template>

  </v-stepper>


</template>

<script lang="ts" setup>
import SearchBar from '@/components/Search.vue';
import VehicleOwnerSummaryPage from '@/components/vehicleData/VehicleOwnerSummary.vue';
import VehicleSummaryPage from '@/components/vehicleData/VehicleSummary.vue';
import type { VehicleOwnerSummary, vehicleDetails, VehicleSummary } from '@/models/vehicleDataModels';
import { SearchOption } from '@/constants/searchOptions'
import { useSnackbar } from '@/components/SnackbarProvider.vue';
import { getUserByOIB } from '@/services/userService';
import { isOibValid } from '@/utils/validateOIB';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';
import { UserRole } from '@/enums/userRole';
import { createVehicle } from '@/services/vehicleService';

const router = useRouter();
const authStore = useAuthStore();
const snackbar = useSnackbar();
const stepper = ref();

// Check role on component mount
onMounted(() => {
  if (authStore.UserRole !== UserRole.HAK) {
    snackbar.Error("You don't have permission to access this page");
    router.push('/');
  }
});

const steps = ["Owner", "Car"]
const currentDate = ref(new Date().toLocaleDateString());

const owner = ref<VehicleOwnerSummary>({
  firstName: "",
  lastName: "",
  residence: "",
  licenceHolderType: "A-VLASNIK",
  registrationPlate: "",
  dateOfRegistration: currentDate.value,
  oib: "",
  issuedBy: "PTS H840 ZG",
  issuedDate: currentDate.value,
});

const vehicleData = ref<vehicleDetails>({
  uuid: '',
  registration: '',
  owner: {
    uuid: '',
    firstName: '',
    lastName: '',
    email: '',
    oib: '',
    residence: '',
    role: UserRole.Osoba,
    birthDate: ''
  },
  drivers: [],
  pastOwners: [],
  summary: {
    vehicleCategory: '',
    mark: '',
    homologationType: '',
    tradeName: '',
    chassisNumber: '',
    bodyShape: '',
    vehicleUse: '',
    dateFirstRegistration: '',
    firstRegistrationInCroatia: '',
    technicallyPermissibleMaximumLadenMass: '',
    permissibleMaximumLadenMass: '',
    unladenMass: '',
    permissiblePayload: '',
    typeApprovalNumber: '',
    engineCapacity: '',
    enginePower: '',
    fuelOrPowerSource: '',
    ratedEngineSpeed: '',
    numberOfSeats: '',
    colourOfVehicle: '',
    length: '',
    width: '',
    height: '',
    maximumNetPower: '',
    numberOfAxles: '',
    numberOfDrivenAxles: '',
    mb: '',
    stationaryNoiseLevel: '',
    engineSpeedForStationaryNoiseTest: '',
    co2Emissions: '',
    ecCategory: '',
    tireSize: '',
    uniqueModelCode: '',
    model: '',
    additionalTireSizes: '',
    vehicleType: ''
  }
});

// Function to search user by OIB and update owner summary

const searchUserByOIB = async (oib: string) => {
  if (!isOibValid(oib)) {
    snackbar.Error("Invalid OIB format");
    return;
  }

  try {
    const user = await getUserByOIB(oib);
    if (user) {
      owner.value = {
        firstName: user.firstName,
        lastName: user.lastName,
        residence: user.residence,
        licenceHolderType: user.role === 'firma' ? 'P-VLASNIK' : 'A-VLASNIK',
        registrationPlate: "", // This will be filled when vehicle is registered
        dateOfRegistration: currentDate.value,
        oib: user.oib,
        issuedBy: "PTS H840 ZG",
        issuedDate: currentDate.value,
      };
      // Update vehicleData with owner information
      vehicleData.value.owner = {
        uuid: user.uuid,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        oib: user.oib,
        residence: user.residence,
        role: user.role as UserRole,
        birthDate: user.birthDate
      };
      snackbar.Success("User found successfully");
    }
  } catch (error: any) {
    if (error.response?.status === 401) {
      snackbar.Error("Your session has expired. Please log in again.");
      router.push('/login');
    } else {
      snackbar.Error("Error finding user");
      console.error("Error searching user:", error);
    }
  }
};

// Update the search function to use OIB search
const fu = async (query: string) => {
  await searchUserByOIB(query);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('Promise resolved');
    }, 2000);
  });
};

// Add function to handle vehicle data updates
const handleVehicleDataUpdate = (data: VehicleSummary) => {
  if (vehicleData.value) {
    vehicleData.value.summary = data;
  }
};

// Add function to save the new vehicle
const saveNewVehicle = async () => {
  try {
    if (!vehicleData.value.owner.uuid) {
      snackbar.Error("Please select an owner first");
      return;
    }

    if (!vehicleData.value.registration) {
      snackbar.Error("Please enter a registration plate number");
      return;
    }

    const response = await createVehicle({
      ownerUuid: vehicleData.value.owner.uuid,
      registration: vehicleData.value.registration,
      summary: vehicleData.value.summary
    });

    snackbar.Success("Vehicle created successfully");
    router.push(`/vehicles/${response.uuid}`); // Navigate to the new vehicle's detail page
  } catch (error: any) {
    if (error.response?.status === 401) {
      snackbar.Error("Your session has expired. Please log in again.");
      router.push('/login');
    } else {
      snackbar.Error("Error creating vehicle");
      console.error("Error creating vehicle:", error);
    }
  }
};

// Watch for changes in owner's registration plate and update vehicleData
watch(
  () => owner.value.registrationPlate,
  (newValue) => {
    if (vehicleData.value) {
      vehicleData.value.registration = newValue;
    }
  },
  { immediate: true }
);

</script>
<style lang="css" scoped>
.fill-all {
  height: 100%;
}
</style>

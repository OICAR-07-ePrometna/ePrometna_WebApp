<!-- eslint-disable-->
<template>

  <v-stepper :items="steps" class="fill-all">
    <template v-slot:item.1>
      <v-card>
        <SearchBar :label="SearchOption.driver.label" :tooltip="SearchOption.driver.tooltip"
          :placeholder="SearchOption.driver.placeholder" :on-click="fu" />
        <VehicleOwnerSummaryPage :summary="owner" />
      </v-card>
    </template>

    <template v-slot:item.2>
      <VehicleSummaryPage v-if="vehicleData" v-bind:data="vehicleData.summary" variant="edit" />
      <div v-else>No vehicle data</div>
    </template>

    <template v-slot:item.3>
      <RegistrationLogsPage :registrationLogs="registrationLogs" />
    </template>

  </v-stepper>


</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import SearchBar from '@/components/Search.vue';
import VehicleOwnerSummaryPage from '@/components/vehicleData/VehicleOwnerSummary.vue';
import VehicleSummaryPage from '@/components/vehicleData/VehicleSummary.vue';
import RegistrationLogsPage from '@/components/vehicleData/RegistrationLogs.vue';
import type { VehicleOwnerSummary, RegistrationLogs, vehicleDetails } from '@/models/vehicleDataModels';
import { SearchOption } from '@/constants/searchOptions'
import { getVehicle } from '@/services/vehicleService';
import { useSnackbar } from '@/components/SnackbarProvider.vue';
import { getUserByOIB } from '@/services/userService';
import { isOibValid } from '@/utils/validateOIB';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';
import { UserRole } from '@/enums/userRole';

const router = useRouter();
const authStore = useAuthStore();
const snackbar = useSnackbar();

// Check role on component mount
onMounted(() => {
  if (authStore.UserRole !== UserRole.HAK) {
    snackbar.Error("You don't have permission to access this page");
    router.push('/');
  }
});

const steps = ["Owner", "Car", "Registrations"]
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

// TODO: OVO je idalje mock
const registrationLogs = ref<RegistrationLogs[]>([
  {
    dateOfValidation: new Date(),
    expirationDate: new Date(2026, 4, 20),
    mileage: '300000',
    note: 'Nema'
  },
  {
    dateOfValidation: new Date(2024, 4, 20),
    expirationDate: new Date(2025, 4, 20),
    mileage: '150000',
    note: 'Nema'
  }
]);

const vehicleData = ref<vehicleDetails | undefined>(undefined)

async function GetVechileDetails() {
  try {
    const rez = await getVehicle("71e99c7a-797d-4e49-9927-dbd6cc7cba95")
    vehicleData.value = rez;
    snackbar.Success("Success fetching vehicel")
  } catch (error) {
    snackbar.Error("Error fetching vehicle")
    console.error("Error fetching vehicle data:", error);
  }
}

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

</script>
<style lang="css" scoped>
.fill-all {
  height: 100%;
}
</style>

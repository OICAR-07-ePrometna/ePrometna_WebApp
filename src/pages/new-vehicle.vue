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
import { ref } from 'vue';
import SearchBar from '@/components/Search.vue';
import VehicleOwnerSummaryPage from '@/components/vehicleData/VehicleOwnerSummary.vue';
import VehicleSummaryPage from '@/components/vehicleData/VehicleSummary.vue';
import RegistrationLogsPage from '@/components/vehicleData/RegistrationLogs.vue';
import type { VehicleOwnerSummary, RegistrationLogs, vehicleDetails } from '@/models/vehicleDataModels';
import { SearchOption } from '@/constants/searchOptions'
import { getVehicle } from '@/services/vehicleService';
import { useSnackbar } from '@/components/SnackbarProvider.vue';

const steps = ["Owner", "Car", "Registrations"]
const currentDate = ref(new Date().toLocaleDateString());

// TODO: Neko to treba fixat
const owner = ref<VehicleOwnerSummary>({
  firstName: "IVO",
  lastName: "IVIC",
  residence: "ADRESA 12, ZAGREB",
  licenceHolderType: "A-VLASNIK",
  registrationPlate: "ZG-0000-AA",
  dateOfRegistration: currentDate.value,
  oib: "12345678901",
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
const snackbar = useSnackbar()

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

// TODO: this is a placeholder function for actual loading functions
const fu = async () => {
  await GetVechileDetails()
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

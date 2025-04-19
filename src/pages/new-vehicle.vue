<!-- eslint-disable-->
<template>

  <v-stepper :items="steps" class="fill-all">
    <template v-slot:item.1>
      <v-card>
        <SearchBar :label="SearchOption.driver.label" :tooltip="SearchOption.driver.tooltip"
          :placeholder="SearchOption.driver.placeholder" :on-click="fu" />
        <VehicleOwnerSummaryPage :summary="summary" />
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
import SearchBar from '@/components/vehicleData/Search.vue';
import VehicleOwnerSummaryPage from '@/components/vehicleData/VehicleOwnerSummary.vue';
import VehicleSummaryPage from '@/components/vehicleData/VehicleSummary.vue';
import RegistrationLogsPage from '@/components/vehicleData/RegistrationLogs.vue';
import type { VehicleOwnerSummary, RegistrationLogs, vehicleDetials } from '@/models/vehicleDataModels';
import { SearchOption } from '@/constants/searchOptions'
import { getVehicle } from '@/services/vehicleService';

const steps = ["Owner", "Car", "Registrations"]
const currentDate = ref(new Date().toLocaleDateString());

const summary = ref<VehicleOwnerSummary>({
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

const vehicleData = ref<vehicleDetials | undefined>(undefined)

async function GetVechileDetails() {
  const rez = await getVehicle("71e99c7a-797d-4e49-9927-dbd6cc7cba95")
  if (!rez) {
    return
  }
  vehicleData.value = rez
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


<!--
Values
label="Pretraga vozača" tooltip="Unsite broj vozačke dozvole" placeholder="12345678"
label="Pretraga prometne" tooltip="Unsite registracijsku oznaku vozila" placeholder="ZG-0000-AA"
label="Pretraga vozila" tooltip="Unsite registracijsku oznaku vozila" placeholder="ZG-0000-AA"
label="Pretraga službenika" tooltip="Unsite ime i prezime službenika" placeholder="Ivo Ivić"
-->

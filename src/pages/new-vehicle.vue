<template>
  <SearchBar :label="SearchOption.driver.label" :tooltip="SearchOption.driver.tooltip"
    :placeholder="SearchOption.driver.placeholder" :on-click="fu" />
  <VehicleOwnerSummaryPage :summary="summary" />
  <VehicleSummaryPage />
  <!-- TODO: add to page 2  -->
  <v-divider thickness="2" class="my-2"></v-divider>
  <RegistrationLogsPage :registrationLogs="registrationLogs" />
  <div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import SearchBar from '@/components/vehicleData/Search.vue';
import VehicleOwnerSummaryPage from '@/components/vehicleData/VehicleOwnerSummary.vue';
import VehicleSummaryPage from '@/components/vehicleData/VehicleSummary.vue';
import RegistrationLogsPage from '@/components/vehicleData/RegistrationLogs.vue';
import type { VehicleOwnerSummary, RegistrationLogs } from '@/models/vehicleDataModels';
import { SearchOption } from '@/constants/searchOptions'

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

// TODO: this is a placeholder function for actual loading functions
const fu = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('Promise resolved');
    }, 2000);
  });
};

</script>

<!-- 
Values
label="Pretraga vozača" tooltip="Unsite broj vozačke dozvole" placeholder="12345678"
label="Pretraga prometne" tooltip="Unsite registracijsku oznaku vozila" placeholder="ZG-0000-AA"
label="Pretraga vozila" tooltip="Unsite registracijsku oznaku vozila" placeholder="ZG-0000-AA"
label="Pretraga službenika" tooltip="Unsite ime i prezime službenika" placeholder="Ivo Ivić"
-->
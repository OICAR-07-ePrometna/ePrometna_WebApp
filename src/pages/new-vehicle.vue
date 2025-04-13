<template>
    <SearchBar label="Pretraga vozača" tooltip="Unsite broj vozačke dozvole" placeholder="12345678" :on-click="fu" />
    <Page1 :summary="summary" />
    <Page2 />
    <Page3 />
    <div>
    </div>
</template>

<script lang="ts" setup>

import SearchBar from '@/components/vehicleData/Search.vue';
import Page1 from '@/components/vehicleData/Page1.vue';
import Page2 from '@/components/vehicleData/Page2.vue';
import Page3 from '@/components/vehicleData/Page3.vue';
import { ref } from 'vue';
import type { VehicleSummary } from '@/models/models';

const currentDate = ref(new Date().toLocaleDateString());

const summary = ref<VehicleSummary>({
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
<template>
    <SearchBar label="Pretraga vozaca" tooltip="bokic" :on-click="fu" />
    <Page1 />
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

// TODO: this is a placeholder function for actual loading functions
const fu = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('Promise resolved');
        }, 2000);
    });
};

</script>

prometna 
vozac 
vozilo 
sluzbenika
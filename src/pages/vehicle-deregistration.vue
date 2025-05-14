<template>
    <div>
        <SearchBar 
            :label="SearchOption.vehicleVin.label" 
            :tooltip="SearchOption.vehicleVin.tooltip"
            :placeholder="SearchOption.vehicleVin.placeholder" 
            :on-click="searchVehicleByVin" 
        />
        <div v-if="vehicleData">
            <FilterDeregistration 
                :vehicle-data="vehicleInfo"
                :driver-data="driverInfo"
            />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import SearchBar from '@/components/Search.vue';
import FilterDeregistration from '@/components/vehicleData/FilterDeregistration.vue';
import type { VehicleDetailsDto } from '@/dtos/vehicleDetailsDto';
import { SearchOption } from '@/constants/searchOptions';
import { getVehicleByVin } from '@/services/vehicleService';
import { useSnackbar } from '@/components/SnackbarProvider.vue';

const vehicleData = ref<VehicleDetailsDto | undefined>(undefined);
const snackbar = useSnackbar();

const vehicleInfo = computed(() => {
    return {
        model: vehicleData.value?.summary?.model || '',
        mark: vehicleData.value?.summary?.mark || '',
        registration: vehicleData.value?.registration || '',
        chassisNumber: vehicleData.value?.summary?.chassisNumber || ''
    };
});

const driverInfo = computed(() => {
    return {
        firstName: vehicleData.value?.owner?.firstName || '',
        lastName: vehicleData.value?.owner?.lastName || ''
    };
});

async function searchVehicleByVin(vin: string) {
    try {
        const vehicle = await getVehicleByVin(vin);
        vehicleData.value = vehicle;
        snackbar.Success("Successfully found vehicle");
    } catch (error) {
        snackbar.Error("Error finding vehicle");
        console.error("Error searching vehicle by VIN:", error);
    }
}
</script>
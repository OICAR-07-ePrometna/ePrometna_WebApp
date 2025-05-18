<template>
    <div>
        <SearchBar 
            ref="searchBarRef"
            :label="SearchOption.vehicleVin.label" 
            :tooltip="SearchOption.vehicleVin.tooltip"
            :placeholder="SearchOption.vehicleVin.placeholder" 
            :on-click="searchVehicleByVin" 
        />
        <div v-if="vehicleData">
            <FilterDeregistration 
                :vehicle-data="vehicleInfo"
                :driver-data="driverInfo"
                @vehicle-deleted="handleVehicleDeleted"
                @vehicle-deregistered="handleVehicleDeregistered"
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
const searchBarRef = ref<InstanceType<typeof SearchBar> | null>(null);
const snackbar = useSnackbar();

const vehicleInfo = computed(() => {
    return {
        model: vehicleData.value?.summary?.model || '',
        mark: vehicleData.value?.summary?.mark || '',
        registration: vehicleData.value?.registration || '',
        chassisNumber: vehicleData.value?.summary?.chassisNumber || '',
        uuid: vehicleData.value?.uuid || ''
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
        snackbar.Success(`Pronađeno vozilo s VIN-om: ${vin}`);
    } catch (error: any) {
        const errorMessage = error.response?.data?.message || 'Nije moguće pronaći vozilo s navedenim VIN-om';
        snackbar.Error(errorMessage);
        console.error("Error searching vehicle by VIN:", error);
    }
}

const handleVehicleDeleted = () => {
    vehicleData.value = undefined;
    if (searchBarRef.value) {
        searchBarRef.value.searchQuery = '';
    }
};

const handleVehicleDeregistered = () => {
    vehicleData.value = undefined;
    if (searchBarRef.value) {
        searchBarRef.value.searchQuery = '';
    }
};
</script>
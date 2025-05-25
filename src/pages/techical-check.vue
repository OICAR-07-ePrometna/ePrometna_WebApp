<template>
    <div>
        <SearchBar 
            ref="searchBarRef"
            :label="SearchOption.vehicleVin.label"
            :placeholder="SearchOption.vehicleVin.placeholder"
            :onClick="searchVehicleByVin"
            :tooltip="SearchOption.vehicleVin.tooltip"
        />
        <div v-if="vehicleData">
            <VehicleSummary 
                :data="vehicleData.summary"
                variant="edit"
                @update:data="handleVehicleDataUpdate"
            />
            <v-row class="mt-4">
                <v-col cols="12" class="text-center">
                    <v-btn
                        color="primary"
                        size="large"
                        :loading="loading"
                        @click="handleSubmit"
                    >
                        Potvrdi tehnički pregled
                    </v-btn>
                </v-col>
            </v-row>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import SearchBar from '@/components/Search.vue';
import VehicleSummary from '@/components/vehicleData/VehicleSummary.vue';
import { SearchOption } from '@/constants/searchOptions';
import { getVehicleByVin } from '@/services/vehicleService';
import { useSnackbar } from '@/components/SnackbarProvider.vue';
import type { VehicleDetailsDto } from '@/dtos/vehicleDetailsDto';
import type { VehicleSummary as VehicleSummaryType } from '@/models/vehicleDataModels';

const searchBarRef = ref<InstanceType<typeof SearchBar> | null>(null);
const vehicleData = ref<VehicleDetailsDto | undefined>(undefined);
const loading = ref(false);
const snackbar = useSnackbar();

async function searchVehicleByVin(vin: string) {
    try {
        loading.value = true;
        const vehicle = await getVehicleByVin(vin);
        vehicleData.value = vehicle;
        snackbar.Success(`Pronađeno vozilo s VIN-om: ${vin}`);
    } catch (error: any) {
        const errorMessage = error.response?.data?.message || 'Nije moguće pronaći vozilo s navedenim VIN-om';
        snackbar.Error(errorMessage);
        console.error("Error searching vehicle by VIN:", error);
    } finally {
        loading.value = false;
    }
}

function handleVehicleDataUpdate(updatedData: VehicleSummaryType) {
    if (vehicleData.value) {
        vehicleData.value.summary = updatedData;
    }
}

async function handleSubmit() {
    if (!vehicleData.value) return;

    try {
        loading.value = true;
        // TODO: Implement API call to submit technical check
        // This would typically involve calling a registration endpoint with the updated vehicle data
        snackbar.Success('Tehnički pregled uspješno spremljen');
        clear();
    } catch (error: any) {
        const errorMessage = error.response?.data?.message || 'Došlo je do greške prilikom spremanja tehničkog pregleda';
        snackbar.Error(errorMessage);
        console.error("Error submitting technical check:", error);
    } finally {
        loading.value = false;
    }
}

function clear() {
    vehicleData.value = undefined;
    if (searchBarRef.value) {
        searchBarRef.value.searchQuery = '';
    }
}
</script>
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
            <div v-if="!showRegistration">
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
                            @click="handleTechnicalCheck"
                        >
                            Potvrdi tehnički pregled
                        </v-btn>
                    </v-col>
                </v-row>
            </div>
            <div v-else>
                <RegistrationDetails
                    v-model:data="registrationData"
                />
                <v-row class="mt-4">
                    <v-col cols="12" class="text-center">
                        <v-btn
                            color="primary"
                            size="large"
                            :loading="loading"
                            @click="handleRegistration"
                        >
                            Registriraj vozilo
                        </v-btn>
                    </v-col>
                </v-row>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import SearchBar from '@/components/Search.vue';
import VehicleSummary from '@/components/vehicleData/VehicleSummary.vue';
import RegistrationDetails from '@/components/vehicleData/RegistrationDetails.vue';
import { SearchOption } from '@/constants/searchOptions';
import { getVehicleByVin, registerVehicle, type RegistrationDto } from '@/services/vehicleService';
import { useSnackbar } from '@/components/SnackbarProvider.vue';
import type { VehicleDetailsDto } from '@/dtos/vehicleDetailsDto';
import type { VehicleSummary as VehicleSummaryType } from '@/models/vehicleDataModels';

const searchBarRef = ref<InstanceType<typeof SearchBar> | null>(null);
const vehicleData = ref<VehicleDetailsDto | undefined>(undefined);
const loading = ref(false);
const snackbar = useSnackbar();
const showRegistration = ref(false);
const registrationData = ref<RegistrationDto>({
    note: '',
    passTechnical: true,
    registration: '',
    traveledDistance: 0
});

async function searchVehicleByVin(vin: string) {
    try {
        loading.value = true;
        const vehicle = await getVehicleByVin(vin);
        vehicleData.value = vehicle;
        showRegistration.value = false;
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

async function handleTechnicalCheck() {
    if (!vehicleData.value) return;

    try {
        loading.value = true;
        // TODO: wait for fran to implement API technical check
        snackbar.Success('Tehnički pregled uspješno spremljen');
        showRegistration.value = true;
    } catch (error: any) {
        const errorMessage = error.response?.data?.message || 'Došlo je do greške prilikom spremanja tehničkog pregleda';
        snackbar.Error(errorMessage);
        console.error("Error submitting technical check:", error);
    } finally {
        loading.value = false;
    }
}

async function handleRegistration() {
    if (!vehicleData.value) return;

    try {
        loading.value = true;
        await registerVehicle(vehicleData.value.uuid, registrationData.value);
        snackbar.Success('Vozilo uspješno registrirano');
        clear();
    } catch (error: any) {
        const errorMessage = error.response?.data?.message || 'Došlo je do greške prilikom registracije vozila';
        snackbar.Error(errorMessage);
        console.error("Error registering vehicle:", error);
    } finally {
        loading.value = false;
    }
}

function clear() {
    vehicleData.value = undefined;
    showRegistration.value = false;
    registrationData.value = {
        note: '',
        passTechnical: true,
        registration: '',
        traveledDistance: 0
    };
    if (searchBarRef.value) {
        searchBarRef.value.searchQuery = '';
    }
}
</script>
<template>
    <div>
        <SearchBar ref="searchBarRef" :label="SearchOption.vehicleVin.label"
            :placeholder="SearchOption.vehicleVin.placeholder" :onClick="searchVehicleByVin"
            :tooltip="SearchOption.vehicleVin.tooltip" />
        <div v-if="vehicleData">
            <v-stepper :items="steps" v-model="currentStep">
                <template v-slot:item.1>
                    <v-card>
                        <RegistrationLogs :registrationLogs="vehicleData?.pastRegistration || []" />
                        <v-row class="mt-4">
                            <v-col cols="12" class="text-center">
                                <v-btn color="primary" size="large" @click="currentStep = 2">
                                    Nastavi na tehnički pregled
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-card>
                </template>

                <template v-slot:item.2>
                    <v-card>
                        <VehicleSummary :data="vehicleData.summary" variant="edit"
                            @update:data="handleVehicleDataUpdate" />
                        <v-row class="mt-4">
                            <v-col cols="12" class="text-center">
                                <v-btn color="primary" size="large" :loading="loading" @click="handleTechnicalCheck">
                                    Potvrdi tehnički pregled
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-card>
                </template>

                <template v-slot:item.3>
                    <v-card>
                        <RegistrationDetails v-model:data="registrationData" />
                        <v-row class="mt-4">
                            <v-col cols="12" class="text-center">
                                <v-btn color="primary" size="large" :loading="loading" @click="handleRegistration">
                                    Registriraj vozilo
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-card>
                </template>
            </v-stepper>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import SearchBar from '@/components/Search.vue';
import VehicleSummary from '@/components/vehicleData/VehicleSummary.vue';
import RegistrationDetails from '@/components/vehicleData/RegistrationDetails.vue';
import RegistrationLogs from '@/components/vehicleData/RegistrationLogs.vue';
import { SearchOption } from '@/constants/searchOptions';
import { getVehicleByVin, registerVehicle, updateVehicle, type RegistrationDto } from '@/services/vehicleService';
import { useSnackbar } from '@/components/SnackbarProvider.vue';
import type { VehicleDetailsDto } from '@/dtos/vehicleDetailsDto';
import type { VehicleSummary as VehicleSummaryType } from '@/models/vehicleDataModels';

const searchBarRef = ref<InstanceType<typeof SearchBar> | null>(null);
const vehicleData = ref<VehicleDetailsDto | undefined>(undefined);

// Add watch effect to log registration logs
watch(() => vehicleData.value?.pastRegistration, (newLogs) => {
    console.log('Registration Logs:', newLogs);
}, { immediate: true });

const loading = ref(false);
const snackbar = useSnackbar();
const currentStep = ref(1);
const steps = ['Povijest registracije', 'Tehnički pregled', 'Registracija'];
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
        currentStep.value = 1;
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
        await updateVehicle(vehicleData.value.uuid, vehicleData.value);
        snackbar.Success('Tehnički pregled uspješno spremljen');
        currentStep.value = 3;
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
    currentStep.value = 1;
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
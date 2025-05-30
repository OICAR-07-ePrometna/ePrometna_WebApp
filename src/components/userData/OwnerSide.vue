<template>
    <div>
        <SearchBar ref="searchBarRef" :label="SearchOption.vehicleVin.label" :tooltip="SearchOption.vehicleVin.tooltip"
            :placeholder="SearchOption.vehicleVin.placeholder" :on-click="searchVehicleByVin" />
        <div v-if="vehicleData">
            <v-container>
                <!-- Driver Information -->
                <v-card class="mb-4" flat>
                    <v-card-title>Podaci o vlasniku i vozilu</v-card-title>
                    <v-card-text>
                        <v-text-field variant="underlined" density="compact" class="mb-2"
                            :model-value="driverInfo.firstName" readonly>
                            <template #prepend-inner>
                                <span>Ime:</span>
                            </template>
                        </v-text-field>

                        <v-text-field variant="underlined" density="compact" :model-value="driverInfo.lastName"
                            readonly>
                            <template #prepend-inner>
                                <span>Prezime:</span>
                            </template>
                        </v-text-field>

                        <v-text-field variant="underlined" density="compact" class="mb-2"
                            :model-value="vehicleData.summary.mark + ' ' + vehicleData.summary.model + ' ' + vehicleData.registration"
                            readonly>
                            <template #prepend-inner>
                                <span>Vozilo:</span>
                            </template>
                        </v-text-field>
                    </v-card-text>
                </v-card>

                <!-- Driver's License Information -->
                <v-progress-circular v-if="isLoadingLicense" indeterminate color="primary"
                    class="d-flex justify-center my-4"></v-progress-circular>

                <DriverLicence v-else-if="licenseData" :license-data="licenseData" />

                <v-alert v-else-if="vehicleData?.owner?.uuid" type="info" class="my-4">
                    Nema dostupnih podataka o vozačkoj dozvoli
                </v-alert>
            </v-container>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import SearchBar from '@/components/Search.vue';
import DriverLicence from '@/components/userData/DriverLicence.vue';
import type { VehicleDetailsDto } from '@/dtos/vehicleDetailsDto';
import { SearchOption } from '@/constants/searchOptions';
import { getVehicleByVin } from '@/services/vehicleService';
import { getDriverLicense } from '@/services/licenseService';
import { useSnackbar } from '@/components/SnackbarProvider.vue';
import type { DriverLicenseDto } from '@/dtos/driverLicenseDto';

const vehicleData = ref<VehicleDetailsDto | undefined>(undefined);
const searchBarRef = ref<InstanceType<typeof SearchBar> | null>(null);
const snackbar = useSnackbar();
const licenseData = ref<DriverLicenseDto | null>(null);
const isLoadingLicense = ref(false);
const driverInfo = computed(() => {
    return {
        firstName: vehicleData.value?.owner?.firstName || '',
        lastName: vehicleData.value?.owner?.lastName || '',
        uuid: vehicleData.value?.owner?.uuid || ''
    };
});

async function searchVehicleByVin(vin: string) {
    try {
        const vehicle = await getVehicleByVin(vin);
        vehicleData.value = vehicle;

        if (vehicleData.value?.owner?.uuid) {
            isLoadingLicense.value = true;
            try {
                const license = await getDriverLicense(vehicleData.value.owner.uuid);
                licenseData.value = license;
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (error: any) {
                const errorMessage = error.response?.data?.message || 'Nije moguće dohvatiti podatke o vozačkoj dozvoli';
                snackbar.Error(errorMessage);
                licenseData.value = null;
            }
        } else {
            licenseData.value = null;
        }

        snackbar.Success(`Pronađeno vozilo s VIN-om: ${vin}`);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        const errorMessage = error.response?.data?.message || 'Nije moguće pronaći vozilo s navedenim VIN-om';
        snackbar.Error(errorMessage);
        vehicleData.value = undefined;
        licenseData.value = null;
    }
    finally {
        isLoadingLicense.value = false;
    }
}

const clear = () => {
    vehicleData.value = undefined;
    licenseData.value = null;
    if (searchBarRef.value) {
        searchBarRef.value.searchQuery = '';
    }
};

defineExpose({
    clear,
    vehicleData
});
</script>

<style scoped>
.v-text-field {
    max-height: 30px;
    white-space: nowrap;
}

.v-card {
    border: 1px solid #e0e0e0;
    border-radius: 8px;
}

.v-card-title {
    font-size: 1.2rem;
    font-weight: 500;
    padding: 16px;
    border-bottom: 1px solid #e0e0e0;
}
</style>

<template>
    <div>
        <div v-if="loading" class="loading">
            <v-progress-circular indeterminate></v-progress-circular>
            <span>Loading vehicle data...</span>
        </div>

        <div v-else-if="error" class="error">
            {{ error }}
        </div>

        <div v-else>
            <h2>Podaci o vozilu</h2>
            <v-container>
                <v-row>
                    <!-- First Big Column -->
                    <v-col cols="12" md="6">
                        <!-- Single Fields -->
                        <v-text-field
                            variant="outlined"
                            density="compact"
                            class="mb-2"
                            v-model="fieldMap['J']"
                            readonly
                        >
                            <template #prepend-inner>
                                <span>J:</span>
                            </template>
                        </v-text-field>
                        <v-text-field
                            variant="outlined"
                            density="compact"
                            class="mb-2"
                            v-model="fieldMap['D.1']"
                            readonly
                        >
                            <template #prepend-inner>
                                <span>D.1:</span>
                            </template>
                        </v-text-field>
                        <v-text-field
                            variant="outlined"
                            density="compact"
                            class="mb-2"
                            v-model="fieldMap['D.2']"
                            readonly
                        >
                            <template #prepend-inner>
                                <span>D.2:</span>
                            </template>
                        </v-text-field>
                        <v-text-field
                            variant="outlined"
                            density="compact"
                            class="mb-2"
                            v-model="fieldMap['D.3']"
                            readonly
                        >
                            <template #prepend-inner>
                                <span>D.3:</span>
                            </template>
                        </v-text-field>
                        <v-text-field
                            variant="outlined"
                            density="compact"
                            class="mb-2"
                            v-model="fieldMap['E']"
                            readonly
                        >
                            <template #prepend-inner>
                                <span>E:</span>
                            </template>
                        </v-text-field>
                        <v-text-field
                            variant="outlined"
                            density="compact"
                            class="mb-2"
                            v-model="fieldMap['(2)']"
                            readonly
                        >
                            <template #prepend-inner>
                                <span>(2):</span>
                            </template>
                        </v-text-field>
                        <v-text-field
                            variant="outlined"
                            density="compact"
                            class="mb-2"
                            v-model="fieldMap['(3)']"
                            readonly
                        >
                            <template #prepend-inner>
                                <span>(3):</span>
                            </template>
                        </v-text-field>

                        <!-- Paired Fields -->
                        <v-row>
                            <v-col cols="6">
                                <v-text-field
                                    variant="outlined"
                                    density="compact"
                                    class="mb-2"
                                    v-model="fieldMap['B']"
                                    readonly
                                >
                                    <template #prepend-inner>
                                        <span>B:</span>
                                    </template>
                                </v-text-field>
                            </v-col>
                            <v-col cols="6">
                                <v-text-field
                                    variant="outlined"
                                    density="compact"
                                    class="mb-2"
                                    v-model="fieldMap['(4)']"
                                    readonly
                                >
                                    <template #prepend-inner>
                                        <span>(4):</span>
                                    </template>
                                </v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="6">
                                <v-text-field
                                    variant="outlined"
                                    density="compact"
                                    class="mb-2"
                                    v-model="fieldMap['F.1']"
                                    readonly
                                >
                                    <template #prepend-inner>
                                        <span>F.1:</span>
                                    </template>
                                </v-text-field>
                            </v-col>
                            <v-col cols="6">
                                <v-text-field
                                    variant="outlined"
                                    density="compact"
                                    class="mb-2"
                                    v-model="fieldMap['F.2']"
                                    readonly
                                >
                                    <template #prepend-inner>
                                        <span>F.2:</span>
                                    </template>
                                </v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="6">
                                <v-text-field
                                    variant="outlined"
                                    density="compact"
                                    class="mb-2"
                                    v-model="fieldMap['G']"
                                    readonly
                                >
                                    <template #prepend-inner>
                                        <span>G:</span>
                                    </template>
                                </v-text-field>
                            </v-col>
                            <v-col cols="6">
                                <v-text-field
                                    variant="outlined"
                                    density="compact"
                                    class="mb-2"
                                    v-model="fieldMap['(5)']"
                                    readonly
                                >
                                    <template #prepend-inner>
                                        <span>(5):</span>
                                    </template>
                                </v-text-field>
                            </v-col>
                        </v-row>

                        <!-- Back to Single Fields -->
                        <v-text-field
                            variant="outlined"
                            density="compact"
                            class="mb-2"
                            v-model="fieldMap['K']"
                            readonly
                        >
                            <template #prepend-inner>
                                <span>K:</span>
                            </template>
                        </v-text-field>

                        <!-- More Paired Fields -->
                        <v-row>
                            <v-col cols="6">
                                <v-text-field
                                    variant="outlined"
                                    density="compact"
                                    class="mb-2"
                                    v-model="fieldMap['P.1']"
                                    readonly
                                >
                                    <template #prepend-inner>
                                        <span>P.1:</span>
                                    </template>
                                </v-text-field>
                            </v-col>
                            <v-col cols="6">
                                <v-text-field
                                    variant="outlined"
                                    density="compact"
                                    class="mb-2"
                                    v-model="fieldMap['P.2']"
                                    readonly
                                >
                                    <template #prepend-inner>
                                        <span>P.2:</span>
                                    </template>
                                </v-text-field>
                            </v-col>
                        </v-row>
                        <v-text-field
                            variant="outlined"
                            density="compact"
                            class="mb-2"
                            v-model="fieldMap['P.3']"
                            readonly
                        >
                            <template #prepend-inner>
                                <span>P.3:</span>
                            </template>
                        </v-text-field>
                        <v-row>
                            <v-col cols="6">
                                <v-text-field
                                    variant="outlined"
                                    density="compact"
                                    class="mb-2"
                                    v-model="fieldMap['P.4']"
                                    readonly
                                >
                                    <template #prepend-inner>
                                        <span>P.4:</span>
                                    </template>
                                </v-text-field>
                            </v-col>
                            <v-col cols="6">
                                <v-text-field
                                    variant="outlined"
                                    density="compact"
                                    class="mb-2"
                                    v-model="fieldMap['S.1']"
                                    readonly
                                >
                                    <template #prepend-inner>
                                        <span>S.1:</span>
                                    </template>
                                </v-text-field>
                            </v-col>
                        </v-row>
                        <v-text-field
                            variant="outlined"
                            density="compact"
                            class="mb-2"
                            v-model="fieldMap['R']"
                            readonly
                        >
                            <template #prepend-inner>
                                <span>R:</span>
                            </template>
                        </v-text-field>
                        <v-row>
                            <v-col cols="6">
                                <v-text-field
                                    variant="outlined"
                                    density="compact"
                                    class="mb-2"
                                    v-model="fieldMap['(6)']"
                                    readonly
                                >
                                    <template #prepend-inner>
                                        <span>(6):</span>
                                    </template>
                                </v-text-field>
                            </v-col>
                            <v-col cols="6">
                                <v-text-field
                                    variant="outlined"
                                    density="compact"
                                    class="mb-2"
                                    v-model="fieldMap['(7)']"
                                    readonly
                                >
                                    <template #prepend-inner>
                                        <span>(7):</span>
                                    </template>
                                </v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="6">
                                <v-text-field
                                    variant="outlined"
                                    density="compact"
                                    class="mb-2"
                                    v-model="fieldMap['(8)']"
                                    readonly
                                >
                                    <template #prepend-inner>
                                        <span>(8):</span>
                                    </template>
                                </v-text-field>
                            </v-col>
                            <v-col cols="6">
                                <v-text-field
                                    variant="outlined"
                                    density="compact"
                                    class="mb-2"
                                    v-model="fieldMap['T']"
                                    readonly
                                >
                                    <template #prepend-inner>
                                        <span>T:</span>
                                    </template>
                                </v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="6">
                                <v-text-field
                                    variant="outlined"
                                    density="compact"
                                    class="mb-2"
                                    v-model="fieldMap['L']"
                                    readonly
                                >
                                    <template #prepend-inner>
                                        <span>L:</span>
                                    </template>
                                </v-text-field>
                            </v-col>
                            <v-col cols="6">
                                <v-text-field
                                    variant="outlined"
                                    density="compact"
                                    class="mb-2"
                                    v-model="fieldMap['(9)']"
                                    readonly
                                >
                                    <template #prepend-inner>
                                        <span>(9):</span>
                                    </template>
                                </v-text-field>
                            </v-col>
                        </v-row>
                        <v-text-field
                            variant="outlined"
                            density="compact"
                            class="mb-2"
                            v-model="fieldMap['(13)']"
                            readonly
                        >
                            <template #prepend-inner>
                                <span>(13):</span>
                            </template>
                        </v-text-field>
                    </v-col>

                    <!-- Second Big Column -->
                    <v-col cols="12" md="6">
                        <v-text-field
                            variant="outlined"
                            density="compact"
                            class="mb-2"
                            v-model="fieldMap['U.1']"
                            readonly
                        >
                            <template #prepend-inner>
                                <span>U.1:</span>
                            </template>
                        </v-text-field>
                        <v-text-field
                            variant="outlined"
                            density="compact"
                            class="mb-2"
                            v-model="fieldMap['U.2']"
                            readonly
                        >
                            <template #prepend-inner>
                                <span>U.2:</span>
                            </template>
                        </v-text-field>
                        <v-text-field
                            variant="outlined"
                            density="compact"
                            class="mb-2"
                            v-model="fieldMap['V.7']"
                            readonly
                        >
                            <template #prepend-inner>
                                <span>V.7:</span>
                            </template>
                        </v-text-field>
                        <v-text-field
                            variant="outlined"
                            density="compact"
                            class="mb-2"
                            v-model="fieldMap['V.9']"
                            readonly
                        >
                            <template #prepend-inner>
                                <span>V.9:</span>
                            </template>
                        </v-text-field>
                        <v-text-field
                            variant="outlined"
                            density="compact"
                            class="mb-2"
                            v-model="fieldMap['(11)']"
                            readonly
                        >
                            <template #prepend-inner>
                                <span>(11):</span>
                            </template>
                        </v-text-field>
                        <v-text-field
                            variant="outlined"
                            density="compact"
                            class="mb-2"
                            v-model="fieldMap['(12)']"
                            readonly
                        >
                            <template #prepend-inner>
                                <span>(12):</span>
                            </template>
                        </v-text-field>
                        <v-text-field
                            variant="outlined"
                            density="compact"
                            class="mb-2"
                            v-model="fieldMap['(14)']"
                            readonly
                        >
                            <template #prepend-inner>
                                <span>(14):</span>
                            </template>
                        </v-text-field>
                        <v-text-field
                            variant="outlined"
                            density="compact"
                            class="mb-2"
                            v-model="fieldMap['(15)']"
                            readonly
                        >
                            <template #prepend-inner>
                                <span>(15):</span>
                            </template>
                        </v-text-field>
                        <v-text-field
                            variant="outlined"
                            density="compact"
                            class="mb-2"
                            v-model="fieldMap['D.2']"
                            readonly
                        >
                            <template #prepend-inner>
                                <span>D.2:</span>
                            </template>
                        </v-text-field>
                        <v-text-field
                            variant="outlined"
                            density="compact"
                            class="mb-2"
                            v-model="fieldMap['(16)']"
                            readonly
                        >
                            <template #prepend-inner>
                                <span>(16):</span>
                            </template>
                        </v-text-field>
                    </v-col>
                </v-row>
            </v-container>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { getVehicleDetails } from '@/services/vehicleService';
import type { VehicleDetailsDto } from '@/dtos/vehicleDetailsDto';
import { formatDate } from '@/utils/formatDate';

const route = useRoute();
const vehicle = ref<VehicleDetailsDto>({} as VehicleDetailsDto);
const loading = ref(true);
const error = ref<string | null>(null);

const fieldMap = ref({
    "J": "",
    "D.1": "",
    "D.2": "",
    "D.3": "",
    "E": "",
    "(2)": "",
    "(3)": "",
    "B": "",
    "(4)": "",
    "F.1": "",
    "F.2": "",
    "G": "",
    "(5)": "",
    "K": "",
    "P.1": "",
    "P.2": "",
    "P.3": "",
    "P.4": "",
    "S.1": "",
    "R": "",
    "(6)": "",
    "(7)": "",
    "(8)": "",
    "T": "",
    "L": "",
    "(9)": "",
    "(13)": "",
    "U.1": "",
    "U.2": "",
    "V.7": "",
    "V.9": "",
    "(11)": "",
    "(12)": "",
    "(14)": "",
    "(15)": "",
    "(16)": ""
});

// Function to map vehicle summary data to form fields
function mapVehicleSummaryToFields() {
    if (!vehicle.value.summary) return;
    
    const summary = vehicle.value.summary;
    
    fieldMap.value["J"] = summary.vehicleCategory || '';
    fieldMap.value["D.1"] = summary.mark || '';
    fieldMap.value["D.2"] = summary.homologationType || '';
    fieldMap.value["D.3"] = summary.tradeName || '';
    fieldMap.value["E"] = summary.chassisNumber || '';
    fieldMap.value["(2)"] = summary.bodyShape || '';
    fieldMap.value["(3)"] = summary.vehicleUse || '';
    fieldMap.value["B"] = formatDate(summary.dateFirstRegistration) || '';
    fieldMap.value["(4)"] = formatDate(summary.firstRegistrationInCroatia) || '';
    fieldMap.value["F.1"] = summary.technicallyPermissibleMaximumLadenMass || '';
    fieldMap.value["F.2"] = summary.permissibleMaximumLadenMass || '';
    fieldMap.value["G"] = summary.unladenMass || '';
    fieldMap.value["(5)"] = summary.permissablePayLoad || '';
    fieldMap.value["K"] = summary.typeApprovalNumber || '';
    fieldMap.value["P.1"] = summary.engineCapacity || '';
    fieldMap.value["P.2"] = summary.enginePower || '';
    fieldMap.value["P.3"] = summary.fuelOrPowerSource || '';
    fieldMap.value["P.4"] = summary.ratedEngineSpeed || '';
    fieldMap.value["S.1"] = summary.numberOfSeats || '';
    fieldMap.value["R"] = summary.colourOfVehicle || '';
    fieldMap.value["(6)"] = summary.length || '';
    fieldMap.value["(7)"] = summary.width || '';
    fieldMap.value["(8)"] = summary.height || '';
    fieldMap.value["T"] = summary.maximumPower || '';
    fieldMap.value["L"] = summary.numberOfAxles || '';
    fieldMap.value["(9)"] = summary.numberOfDrivenAxles || '';
    fieldMap.value["(13)"] = summary.mb || '';
    fieldMap.value["U.1"] = summary.stationaryNoiseLevel || '';
    fieldMap.value["U.2"] = summary.engineSpeedForStationaryNoiseTest || '';
    fieldMap.value["V.7"] = summary.co2Emissions || '';
    fieldMap.value["V.9"] = summary.ecCategory || '';
    fieldMap.value["(11)"] = summary.tireSize || '';
    fieldMap.value["(12)"] = summary.unqiueModelCode || '';
    fieldMap.value["(14)"] = summary.vehicleModel || '';
    fieldMap.value["(15)"] = summary.additionalTireSizes || '';
    fieldMap.value["(16)"] = summary.vehicleType || '';
}

async function fetchVehicleDetails() {
    const uuid = route.params.uuid as string;
    
    try {
        loading.value = true;
        vehicle.value = await getVehicleDetails(uuid);
        console.log('Vehicle details:', vehicle.value);
        
        mapVehicleSummaryToFields();
    } catch (err) {
        error.value = 'Failed to load vehicle details. Please try again later.';
        console.error('Error fetching vehicle details:', err);
    } finally {
        loading.value = false;
    }
}

onMounted(() => {
    fetchVehicleDetails();
});
</script>

<style scoped>
.v-text-field {
    max-height: 40px;
    white-space: nowrap;
}

.loading {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 300px;
    gap: 16px;
}

.error {
    padding: 16px;
    background-color: #ffebee;
    color: #c62828;
    border-radius: 4px;
    margin: 16px 0;
}
</style>
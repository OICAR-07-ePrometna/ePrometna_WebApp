<template>
    <div>
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
                    >
                        <template #prepend-inner>
                            <span>(16):</span>
                        </template>
                    </v-text-field>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

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
</script>

<style scoped>
.v-text-field {
    max-height: 40px;
    white-space: nowrap;
}
</style>

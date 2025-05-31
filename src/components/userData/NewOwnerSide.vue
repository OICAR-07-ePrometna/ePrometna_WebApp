<template>
    <div>
        <SearchBar 
            ref="searchBarRef"
            :label="SearchOption.personOib.label" 
            :tooltip="SearchOption.personOib.tooltip"
            :placeholder="SearchOption.personOib.placeholder" 
            :on-click="searchPersonByOib" 
        />
        <div v-if="userData">
            <v-container>
                <v-row>
                    <!-- Person Information -->
                    <v-col cols="12">
                        <v-card class="mb-4" flat>
                            <v-card-title>Podaci o novom vlasniku</v-card-title>
                            <v-card-text>
                                <v-text-field
                                    variant="underlined"
                                    density="compact"
                                    class="mb-2"
                                    :model-value="personInfo.firstName"
                                    readonly
                                >
                                    <template #prepend-inner>
                                        <span>Ime:</span>
                                    </template>
                                </v-text-field>
                                
                                <v-text-field
                                    variant="underlined"
                                    density="compact"
                                    class="mb-2"
                                    :model-value="personInfo.lastName"
                                    readonly
                                >
                                    <template #prepend-inner>
                                        <span>Prezime:</span>
                                    </template>
                                </v-text-field>

                                <v-text-field
                                    variant="underlined"
                                    density="compact"
                                    :model-value="personInfo.oib"
                                    readonly
                                >
                                    <template #prepend-inner>
                                        <span>OIB:</span>
                                    </template>
                                </v-text-field>
                            </v-card-text>
                        </v-card>

                        <!-- Driver's License Information -->
                        <v-progress-circular
                            v-if="isLoadingLicense"
                            indeterminate
                            color="primary"
                            class="d-flex justify-center my-4"
                        ></v-progress-circular>
                        
                        <DriverLicence 
                            v-else-if="licenseData"
                            :license-data="licenseData"
                        />
                        
                        <v-alert
                            v-else-if="userData?.uuid"
                            type="info"
                            class="my-4"
                        >
                            Nema dostupnih podataka o vozačkoj dozvoli
                        </v-alert>
                    </v-col>
                </v-row>
            </v-container>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import SearchBar from '@/components/Search.vue';
import DriverLicence from '@/components/userData/DriverLicence.vue';
import { SearchOption } from '@/constants/searchOptions';
import { getDriverLicense } from '@/services/licenseService';
import { getUserByOIB } from '@/services/userService';
import { useSnackbar } from '@/components/SnackbarProvider.vue';
import type { DriverLicenseDto } from '@/dtos/driverLicenseDto';
import type { UserDto } from '@/dtos/userDto';

const searchBarRef = ref<InstanceType<typeof SearchBar> | null>(null);
const snackbar = useSnackbar();
const licenseData = ref<DriverLicenseDto | null>(null);
const userData = ref<UserDto | undefined>(undefined);
const isLoadingLicense = ref(false);

const personInfo = computed(() => {
    return {
        firstName: userData.value?.firstName || '',
        lastName: userData.value?.lastName || '',
        oib: userData.value?.oib || '',
        uuid: userData.value?.uuid || ''
    };
});

async function searchPersonByOib(oib: string) {
    try {
        const person = await getUserByOIB(oib);
        console.log('NewOwnerSide - Person data:', person);
        if (!person) {
            throw new Error('Osoba nije pronađena');
        }
        userData.value = person;
        
        if (userData.value?.uuid) {
            console.log('NewOwnerSide - Person UUID:', userData.value.uuid);
            isLoadingLicense.value = true;
            try {
                const license = await getDriverLicense(userData.value.uuid);
                console.log('NewOwnerSide - Raw license data received:', license);
                console.log('NewOwnerSide - License data structure:', {
                    licenseNumber: license.licenseNumber,
                    category: license.category,
                    issueDate: license.issueDate,
                    expiringDate: license.expiringDate
                });
                licenseData.value = license;
                console.log('NewOwnerSide - licenseData ref after update:', licenseData.value);
            } catch (error: any) {
                console.error("NewOwnerSide - Error fetching driver's license:", error);
                console.error("NewOwnerSide - Error details:", {
                    message: error.message,
                    response: error.response?.data,
                    status: error.response?.status
                });
                const errorMessage = error.response?.data?.message || 'Nije moguće dohvatiti podatke o vozačkoj dozvoli';
                snackbar.Error(errorMessage);
                licenseData.value = null;
            } finally {
                isLoadingLicense.value = false;
            }
        } else {
            console.warn('NewOwnerSide - No UUID found in person data');
            console.log('NewOwnerSide - Person data:', userData.value);
            licenseData.value = null;
        }
        
        snackbar.Success(`Pronađena osoba s OIB-om: ${oib}`);
    } catch (error: any) {
        console.error("NewOwnerSide - Error searching person by OIB:", error);
        console.error("NewOwnerSide - Error details:", {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status
        });
        const errorMessage = error.response?.data?.message || 'Nije moguće pronaći osobu s navedenim OIB-om';
        snackbar.Error(errorMessage);
        userData.value = undefined;
        licenseData.value = null;
    }
}

const clear = () => {
    userData.value = undefined;
    licenseData.value = null;
    if (searchBarRef.value) {
        searchBarRef.value.searchQuery = '';
    }
};

defineExpose({
    clear,
    personData: userData
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
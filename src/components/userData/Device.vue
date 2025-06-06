<template>
    <v-container>
        <v-card class="mx-auto pa-6" max-width="800">
            <v-card-title class="text-h5 mb-4">Device Information</v-card-title>

            <div v-if="loading" class="d-flex justify-center">
                <v-progress-circular indeterminate color="primary"></v-progress-circular>
            </div>

            <div v-else-if="error" class="text-center">
                <v-alert type="error" variant="tonal" class="mb-4">
                    {{ error }}
                </v-alert>
            </div>

            <div v-else>
                <v-row align="center">
                    <v-col cols="auto">
                        <v-icon :icon="device ? 'mdi-cellphone-check' : 'mdi-cellphone-remove'"
                            :color="device ? 'success' : 'error'" :size="128"></v-icon>
                    </v-col>
                    <v-col>
                        <div v-if="device">
                            <v-text-field v-model="device.RegisteredDevice" density="compact" label="Device Name"
                                variant="underlined" prepend-inner-icon="mdi-cellphone" readonly
                                class="mb-4"></v-text-field>

                            <v-text-field v-model="formattedDate" density="compact" label="Registration Date"
                                variant="underlined" prepend-inner-icon="mdi-calendar" readonly
                                class="mb-4"></v-text-field>

                            <v-btn color="error" variant="tonal" prepend-icon="mdi-delete" @click="confirmDelete"
                                class="mt-4">
                                Unregister Device
                            </v-btn>
                        </div>
                        <div v-else class="text-center">
                            <p class="text-body-1">No device registered for this user</p>
                        </div>
                    </v-col>
                </v-row>
            </div>
        </v-card>
    </v-container>
    <ConfirmDialog ref="confirmDialog" />
</template>

<script lang="ts" setup>
import { ref, onMounted, computed, shallowRef } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useSnackbar } from '@/components/SnackbarProvider.vue';
import type { Mobile } from '@/models/mobile';
import axiosInstance from '@/services/axios';
import axios from 'axios';
import ConfirmDialog from '@/components/confirmDialog.vue';

const device = ref<Mobile | null>(null);
const loading = ref(true);
const error = ref<string | null>(null);
const authStore = useAuthStore();
const snackbar = useSnackbar();
const confirmDialog = shallowRef<InstanceType<typeof ConfirmDialog>>();

const formattedDate = computed(() => {
    if (!device.value?.CreatedAt) return '';
    return new Date(device.value.CreatedAt).toLocaleString();
});

const confirmDelete = async () => {
    const confirmed = await confirmDialog.value?.Open({
        Title: "Unregister Device",
        Message: "Are you sure you want to unregister this device? This action cannot be undone.",
        Options: { noCancel: false }
    });

    if (confirmed) {
        await handleConfirmDelete();
    }
};

const handleConfirmDelete = async () => {
    try {
        loading.value = true;
        error.value = null;

        await axiosInstance.delete('/user/my-device');

        device.value = null;
        snackbar.Success('Device unregistered successfully');
    } catch (err) {
        if (axios.isAxiosError(err)) {
            if (err.response?.status === 401) {
                error.value = 'Authentication failed';
                snackbar.Error('Session expired. Please log in again.');
                authStore.Logout();
                return;
            }
        }
        error.value = err instanceof Error ? err.message : 'An error occurred';
        snackbar.Error('Error unregistering device');
    } finally {
        loading.value = false;
    }
};

const fetchDeviceInfo = async () => {
    try {
        loading.value = true;
        error.value = null;

        // Check if we have a valid token
        if (!authStore.IsAuthenticated) {
            error.value = 'Not authenticated';
            snackbar.Error('Please log in to view device information');
            return;
        }

        const response = await axiosInstance.get('/user/my-device');

        if (response.data.message) {
            device.value = null;
        } else {
            device.value = response.data;
        }
    } catch (err) {
        if (axios.isAxiosError(err)) {
            if (err.response?.status === 401) {
                error.value = 'Authentication failed';
                snackbar.Error('Session expired. Please log in again.');
                authStore.Logout();
                return;
            }
            if (err.response?.status === 404) {
                device.value = null;
                return;
            }
        }
        error.value = err instanceof Error ? err.message : 'An error occurred';
        snackbar.Error('Error fetching device information');
    } finally {
        loading.value = false;
    }
};

onMounted(() => {
    fetchDeviceInfo();
});
</script>

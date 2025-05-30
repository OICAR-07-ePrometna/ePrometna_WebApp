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
            <v-icon
              :icon="device ? 'mdi-cellphone-check' : 'mdi-cellphone-remove'"
              :color="device ? 'success' : 'error'"
              :size="128"
            ></v-icon>
          </v-col>
          <v-col>
            <div v-if="device">
              <v-text-field
                v-model="device.RegisteredDevice"
                density="compact"
                label="Device Name"
                variant="underlined"
                prepend-inner-icon="mdi-cellphone"
                readonly
                class="mb-4"
              ></v-text-field>

              <v-text-field
                v-model="formattedDate"
                density="compact"
                label="Registration Date"
                variant="underlined"
                prepend-inner-icon="mdi-calendar"
                readonly
                class="mb-4"
              ></v-text-field>
            </div>
            <div v-else class="text-center">
              <p class="text-body-1">No device registered for this user</p>
            </div>
          </v-col>
        </v-row>
      </div>
    </v-card>
  </v-container>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useSnackbar } from '@/components/SnackbarProvider.vue';
import type { Mobile } from '@/models/mobile';
import axiosInstance from '@/services/axios';
import axios from 'axios';

const device = ref<Mobile | null>(null);
const loading = ref(true);
const error = ref<string | null>(null);
const authStore = useAuthStore();
const snackbar = useSnackbar();

const formattedDate = computed(() => {
  if (!device.value?.CreatedAt) return '';
  return new Date(device.value.CreatedAt).toLocaleString();
});

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

    console.log('Device info response:', response.data);
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

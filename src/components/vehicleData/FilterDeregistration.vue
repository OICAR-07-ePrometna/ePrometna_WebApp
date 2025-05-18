<template>
  <div>
    <h2>Podaci o vozilu i vozaču</h2>
    <v-container>
      <v-row>
        <!-- Vehicle Information -->
        <v-col cols="12" md="6">
          <v-card class="mb-4" flat>
            <v-card-title>Podaci o vozilu</v-card-title>
            <v-card-text>
              <v-text-field
                variant="underlined"
                density="compact"
                class="mb-2"
                :model-value="vehicleData.model"
                readonly
              >
                <template #prepend-inner>
                  <span>Model:</span>
                </template>
              </v-text-field>
              
              <v-text-field
                variant="underlined"
                density="compact"
                class="mb-2"
                :model-value="vehicleData.mark"
                readonly
              >
                <template #prepend-inner>
                  <span>Model:</span>
                </template>
              </v-text-field>
              
              <v-text-field
                variant="underlined"
                density="compact"
                class="mb-2"
                :model-value="vehicleData.registration || 'Vozilo odjavljeno'"
                :class="{ 'deregistered': !vehicleData.registration }"
                readonly
              >
                <template #prepend-inner>
                  <span>Registracijska oznaka:</span>
                </template>
              </v-text-field>
              
              <v-text-field
                variant="underlined"
                density="compact"
                :model-value="vehicleData.chassisNumber"
                readonly
              >
                <template #prepend-inner>
                  <span>VIN:</span>
                </template>
              </v-text-field>
            </v-card-text>
          </v-card>
        </v-col>

        <!-- Driver Information -->
        <v-col cols="12" md="6">
          <v-card class="mb-4" flat>
            <v-card-title>Podaci o vlasniku</v-card-title>
            <v-card-text>
              <v-text-field
                variant="underlined"
                density="compact"
                class="mb-2"
                :model-value="driverData.firstName"
                readonly
              >
                <template #prepend-inner>
                  <span>Ime:</span>
                </template>
              </v-text-field>
              
              <v-text-field
                variant="underlined"
                density="compact"
                :model-value="driverData.lastName"
                readonly
              >
                <template #prepend-inner>
                  <span>Prezime:</span>
                </template>
              </v-text-field>
            </v-card-text>
          </v-card>
          <v-row class="mt-4">
            <v-col cols="6">
              <v-btn
                color="primary"
                variant="tonal"
                block
                :disabled="deregistrationLoading"
                @click="handleDeregisterVehicle"
              >
                Odjavi vozilo
              </v-btn>
            </v-col>
            <v-col cols="6">
              <v-btn
                color="error"
                variant="tonal"
                block
                :disabled="deleteLoading"
                @click="handleDeleteVehicle"
              >
                Obriši vozilo
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { deleteVehicle, deregisterVehicle } from '@/services/vehicleService';
import { useSnackbar } from '@/components/SnackbarProvider.vue';

interface VehicleData {
  model: string;
  mark: string;
  registration: string;
  chassisNumber: string;
  uuid: string;
}

interface DriverData {
  firstName: string;
  lastName: string;
}

const props = defineProps<{
  vehicleData: VehicleData;
  driverData: DriverData;
}>();

const emit = defineEmits<{
  (e: 'vehicleDeleted'): void;
  (e: 'vehicleDeregistered'): void;
}>();

const snackbar = useSnackbar();
const deregistrationLoading = ref(false);
const deleteLoading = ref(false);

async function handleDeregisterVehicle() {
  try {
    deregistrationLoading.value = true;
    await deregisterVehicle(props.vehicleData.uuid);
    snackbar.Success(`Vozilo je uspješno odjavljeno`);
    emit('vehicleDeregistered');
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || 'Došlo je do greške prilikom odjave vozila';
    snackbar.Error(errorMessage);
    console.error("Error deregistering vehicle:", error);
  } finally {
    deregistrationLoading.value = false;
  }
}

async function handleDeleteVehicle() {
  try {
    deleteLoading.value = true;
    await deleteVehicle(props.vehicleData.uuid);
    snackbar.Success(`Vozilo je uspješno obrisano`);
    emit('vehicleDeleted');
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || 'Došlo je do greške prilikom brisanja vozila';
    snackbar.Error(errorMessage);
    console.error("Error deleting vehicle:", error);
  } finally {
    deleteLoading.value = false;
  }
}
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

.deregistered {
  color: red;
  font-weight: 500;
}
</style>

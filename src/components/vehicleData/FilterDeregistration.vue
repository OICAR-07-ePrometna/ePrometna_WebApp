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
                  <span>Marka:</span>
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
                :model-value="vehicleData.registration"
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
              >
                Odjavi vozilo
              </v-btn>
            </v-col>
            <v-col cols="6">
              <v-btn
                color="error"
                variant="tonal"
                block
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
interface VehicleData {
  model: string;
  mark: string;
  registration: string;
  chassisNumber: string;
}

interface DriverData {
  firstName: string;
  lastName: string;
}

defineProps<{
  vehicleData: VehicleData;
  driverData: DriverData;
}>();
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

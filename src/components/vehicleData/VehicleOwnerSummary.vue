<template>
  <div>
    <h2>Podaci o vlasniku vozila</h2>
    <v-container>
      <v-row>
        <!-- C.1.1., C.1.2., C.1.3, C.4 -->
        <v-col cols="12" md="4">
          <v-text-field
            variant="underlined"
            density="compact"
            class="mb-2"
            :value="summary.firstName"
            readonly
          >
            <template #prepend-inner>
              <span>C.1.1:</span>
            </template>
          </v-text-field>
          
          <v-text-field
            variant="underlined"
            density="compact"
            class="mb-2"
            :value="summary.lastName"
            readonly
          >
            <template #prepend-inner>
              <span>C.1.2:</span>
            </template>
          </v-text-field>
          
          <v-text-field
            variant="underlined"
            density="compact"
            class="mb-2"
            :value="summary.residence"
            readonly
          >
            <template #prepend-inner>
              <span>C.1.3:</span>
            </template>
          </v-text-field>
          
          <v-text-field
            variant="underlined"
            density="compact"
            :value="summary.licenceHolderType"
            readonly
          >
            <template #prepend-inner>
              <span>C.4:</span>
            </template>
          </v-text-field>
        </v-col>
        
        <!-- A, I, (1) -->
        <v-col cols="12" md="4">
          <v-text-field
            variant="underlined"
            density="compact"
            v-model="summary.registrationPlate"
          >
            <template #prepend-inner>
              <span>A:</span>
            </template>
          </v-text-field>
          
          <v-text-field
            variant="underlined"
            density="compact"
            class="mb-2"
            :value="summary.dateOfRegistration"
            readonly
          >
            <template #prepend-inner>
              <span>I:</span>
            </template>
          </v-text-field>
          
          <v-text-field
            variant="underlined"
            density="compact"
            :value="summary.oib"
            readonly
          >
            <template #prepend-inner>
              <span>(1):</span>
            </template>
          </v-text-field>
        </v-col>
        
        <!-- Dozvolu izdao, Dana -->
        <v-col cols="12" md="4">
          <v-text-field
            variant="underlined"
            density="compact"
            :value="summary.issuedBy"
            readonly
          >
            <template #prepend-inner>
              <span>Dozvolu izdao:</span>
            </template>
          </v-text-field>
          
          <v-text-field
            variant="underlined"
            density="compact"
            :value="summary.issuedDate"
            readonly
          >
            <template #prepend-inner>
              <span>Dana:</span>
            </template>
          </v-text-field>
        </v-col>
      </v-row>
    </v-container>
  </div>
  <v-divider thickness="2" class="my-2"></v-divider>
</template>

<script setup lang="ts">
import type { VehicleOwnerSummary } from '@/models/vehicleDataModels';

defineProps({
  summary: {
    type: Object as () => VehicleOwnerSummary,
    required: true,
  },
});

</script>

<style scoped>
.v-text-field {
    max-height: 30px;
    white-space: nowrap;
}
</style>
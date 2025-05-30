<template>
    <div>
      <h2>Podaci o važenju prometne dozvole</h2>
      <div v-if="registrationLogs.length === 0" class="text-center pa-4">
      <p>Nema podataka o važenju prometne dozvole</p>
      </div>
      <v-virtual-scroll
        :items="registrationLogs"
        height="400"
        item-height="120"
        v-else
      >
        <template v-slot="{ item }">
          <v-container class="bordered-container">
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  variant="underlined"
                  density="compact"
                  :value="new Date(item.technicalDate).toLocaleDateString('hr')"
                  readonly
                >
                <template #prepend-inner>
              <span>Datum validacije:</span>
            </template></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  variant="underlined"
                  density="compact"
                  :value="item.traveledDistance"
                  readonly
                >
                <template #prepend-inner>
              <span>Kilometraža:</span>
            </template></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  variant="underlined"
                  density="compact"
                  :value="item.registration"
                  readonly
                >
                <template #prepend-inner>
              <span>Registracijska oznaka:</span>
            </template></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  variant="underlined"
                  density="compact"
                  :value="item.passTechnical ? 'Prošao' : 'Nije prošao'"
                  :color="item.passTechnical ? 'success' : 'error'"
                  readonly
                >
                <template #prepend-inner>
              <span>Tehnički pregled:</span>
            </template></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  variant="underlined"
                  density="compact"
                  :value="item.note || ''"
                  readonly
                >
                <template #prepend-inner>
              <span>Bilješka:</span>
            </template></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <v-divider></v-divider>
        </template>
      </v-virtual-scroll>
    </div>
  </template>
  
  <script setup lang="ts">
  import type { RegistrationLogs } from '@/models/vehicleDataModels';

  defineProps({
    registrationLogs: {
      type: Array as () => RegistrationLogs[],
      required: true,
    },
  });
  </script>


<style scoped>
.v-text-field {
    max-height: 30px;
    white-space: nowrap;
}
.bordered-container {
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
  padding: 20px;
  background: aliceblue;
}
</style>
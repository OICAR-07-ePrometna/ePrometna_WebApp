<template>
    <div>
      <h2>Podaci o važenju prometne dozvole</h2>
      <v-virtual-scroll
        :items="registrationLogs"
        height="400"
        item-height="100"
      >
        <template v-slot="{ item }">
          <v-container class="bordered-container">
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  variant="underlined"
                  density="compact"
                  :value="formatDate(typeof item.dateOfValidation === 'string' ? item.dateOfValidation : item.dateOfValidation.toISOString())"
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
                  :value="formatDate(typeof item.expirationDate === 'string' ? item.expirationDate : item.expirationDate.toISOString())"
                  readonly
                >
                <template #prepend-inner>
              <span>Datum isteka:</span>
            </template></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  variant="underlined"
                  density="compact"
                  :value="item.mileage"
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
                  :value="item.note"
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

  const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
};

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
<template>
  <v-card class="mx-auto" max-width="600">
    <v-card-title class="text-h5">
      Vozačka dozvola
    </v-card-title>

    <v-card-text>
      <v-list>
        <v-list-item>
          <template v-slot:prepend>
            <v-icon icon="mdi-card-account-details" color="primary"></v-icon>
          </template>
          <v-list-item-title>Broj vozačke dozvole</v-list-item-title>
          <v-list-item-subtitle>{{ licenseData.licenseNumber }}</v-list-item-subtitle>
        </v-list-item>

        <v-divider></v-divider>

        <v-list-item>
          <template v-slot:prepend>
            <v-icon icon="mdi-tag" color="primary"></v-icon>
          </template>
          <v-list-item-title>Kategorija</v-list-item-title>
          <v-list-item-subtitle>{{ licenseData.category }}</v-list-item-subtitle>
        </v-list-item>

        <v-divider></v-divider>

        <v-list-item>
          <template v-slot:prepend>
            <v-icon icon="mdi-calendar-check" color="primary"></v-icon>
          </template>
          <v-list-item-title>Datum izdavanja</v-list-item-title>
          <v-list-item-subtitle>{{ licenseData.issueDate }}</v-list-item-subtitle>
        </v-list-item>

        <v-divider></v-divider>

        <v-list-item>
          <template v-slot:prepend>
            <v-icon icon="mdi-calendar-clock" color="primary"></v-icon>
          </template>
          <v-list-item-title>Datum isteka</v-list-item-title>
          <v-list-item-subtitle>{{ licenseData.expiringDate }}</v-list-item-subtitle>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { watch } from 'vue';

interface DriverLicense {
  category: string;
  expiringDate: string;
  issueDate: string;
  licenseNumber: string;
}

const props = defineProps<{
  licenseData: DriverLicense;
}>();

// Add watcher to log when licenseData changes
watch(() => props.licenseData, (newData) => {
  console.log('DriverLicence - Received new license data:', newData);
  console.log('DriverLicence - License data structure:', {
    licenseNumber: newData.licenseNumber,
    category: newData.category,
    issueDate: newData.issueDate,
    expiringDate: newData.expiringDate
  });
}, { immediate: true });
</script>

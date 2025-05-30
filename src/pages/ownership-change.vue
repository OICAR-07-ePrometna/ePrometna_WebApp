<template>
  <v-container fluid>
    <v-row>
      <v-col cols="6">
        <!-- Current Owner Side -->
        <OwnerSide ref="currentOwnerRef" />
      </v-col>

      <v-col cols="6">
        <!-- New Owner Side -->
        <NewOwnerSide ref="newOwnerRef" />
      </v-col>
    </v-row>

    <!-- Action Buttons -->
    <v-row class="mt-4">
      <v-col cols="12" class="text-center">
        <v-btn color="primary" size="large" :disabled="!canSubmit" @click="handleSubmit">
          Potvrdi promjenu vlasništva
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import OwnerSide from '@/components/userData/OwnerSide.vue';
import NewOwnerSide from '@/components/userData/NewOwnerSide.vue';
import { useSnackbar } from '@/components/SnackbarProvider.vue';
import { changeOwner } from '@/services/vehicleService';

const currentOwnerRef = ref<InstanceType<typeof OwnerSide> | null>(null);
const newOwnerRef = ref<InstanceType<typeof NewOwnerSide> | null>(null);
const snackbar = useSnackbar();

const canSubmit = computed(() => {
  return currentOwnerRef.value?.vehicleData && newOwnerRef.value?.personData;
});

async function handleSubmit() {
  if (!canSubmit.value) {
    snackbar.Error('Molimo unesite podatke o trenutnom vlasniku i novom vlasniku');
    return;
  }

  try {
    await changeOwner({
      vehicleUuid: currentOwnerRef.value?.vehicleData?.uuid || '',
      newOwnerUuid: newOwnerRef.value?.personData?.uuid || ''
    });

    snackbar.Success('Promjena vlasništva uspješno izvršena');

    // Clear both forms
    currentOwnerRef.value?.clear();
    newOwnerRef.value?.clear();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || 'Došlo je do greške prilikom promjene vlasništva';
    snackbar.Error(errorMessage);
    console.error("Error changing ownership:", error);
  }
}
</script>

<style scoped>
.v-col {
  border-right: 1px solid rgba(0, 0, 0, 0.12);
}

.v-col:last-child {
  border-right: none;
}
</style>

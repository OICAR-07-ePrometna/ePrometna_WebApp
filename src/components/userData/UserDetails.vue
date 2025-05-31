<template>
  <v-container>
    <v-card class="mx-auto pa-6" max-width="800">
      <v-card-title class="text-h5 mb-4">User Details</v-card-title>

      <div v-if="user">
        <v-text-field v-model="user.firstName" density="compact" label="First Name" variant="underlined"
          prepend-inner-icon="mdi-account-outline" readonly class="mb-4"></v-text-field>

        <v-text-field v-model="user.lastName" density="compact" label="Last Name" variant="underlined"
          prepend-inner-icon="mdi-account-outline" readonly class="mb-4"></v-text-field>

        <v-text-field v-model="user.oib" density="compact" label="OIB" variant="underlined"
          prepend-inner-icon="mdi-id-card" readonly class="mb-4"></v-text-field>

        <v-text-field :model-value="user.residence" density="compact" label="Residence" variant="underlined"
          prepend-inner-icon="mdi-home-outline" readonly class="mb-4"></v-text-field>

        <v-text-field v-model="user.birthDate" density="compact" label="Birth Date" variant="underlined"
          prepend-inner-icon="mdi-calendar" readonly class="mb-4"></v-text-field>

        <v-text-field v-model="user.email" density="compact" label="Email" variant="underlined"
          prepend-inner-icon="mdi-email-outline" readonly class="mb-4"></v-text-field>

        <v-text-field v-model="user.role" density="compact" label="Role" variant="underlined"
          prepend-inner-icon="mdi-shield-account-outline" readonly class="mb-4"></v-text-field>
      </div>
      <div v-else>
        You don't have detials
      </div>
    </v-card>
  </v-container>
</template>

<script lang="ts" setup>
import type { User } from '@/models/user';
import { useAuthStore } from '@/stores/auth';
import { onMounted } from 'vue';
import { useSnackbar } from '@/components/SnackbarProvider.vue';

const user = ref<User>()
const authStore = useAuthStore();
const snackbar = useSnackbar()

onMounted(async () => {
  const rez = authStore.User
  user.value = rez
});
</script>

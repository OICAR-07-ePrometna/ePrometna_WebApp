<template>
    <v-container>
      <v-card class="mx-auto pa-6" max-width="800">
        <template v-if="userStore.currentUser">
          <v-card-title class="text-h5 mb-4">User Details</v-card-title>
          
          <v-list>
            <v-list-item>
              <v-list-item-title>First Name</v-list-item-title>
              <v-list-item-subtitle>{{ userStore.currentUser.firstName }}</v-list-item-subtitle>
            </v-list-item>

            <v-list-item>
              <v-list-item-title>Last Name</v-list-item-title>
              <v-list-item-subtitle>{{ userStore.currentUser.lastName }}</v-list-item-subtitle>
            </v-list-item>
  
            <v-list-item>
              <v-list-item-title>Email</v-list-item-title>
              <v-list-item-subtitle>{{ userStore.currentUser.email }}</v-list-item-subtitle>
            </v-list-item>
  
            <v-list-item>
              <v-list-item-title>OIB</v-list-item-title>
              <v-list-item-subtitle>{{ userStore.currentUser.oib }}</v-list-item-subtitle>
            </v-list-item>
  
            <v-list-item>
              <v-list-item-title>Residence</v-list-item-title>
              <v-list-item-subtitle>{{ userStore.currentUser.residence }}</v-list-item-subtitle>
            </v-list-item>
  
            <v-list-item>
              <v-list-item-title>Birth Date</v-list-item-title>
              <v-list-item-subtitle>{{ userStore.currentUser.birthDate }}</v-list-item-subtitle>
            </v-list-item>
  
            <v-list-item>
              <v-list-item-title>Role</v-list-item-title>
              <v-list-item-subtitle>{{ userStore.currentUser.role }}</v-list-item-subtitle>
            </v-list-item>
          </v-list>
        </template>
  
        <v-alert v-else-if="userStore.error" type="error" class="mt-4">
          {{ userStore.error }}
        </v-alert>

      </v-card>
    </v-container>
  </template>
  
  <script lang="ts" setup>
  import { onMounted } from 'vue';
  import { useUserStore } from '@/stores/user';
  
  const userStore = useUserStore();
  
  onMounted(async () => {
    if (!userStore.currentUser) {
      await userStore.fetchLoggedInUser();
    }
  });
  </script>
  
  <style scoped>
  .v-list-item {
    margin-bottom: 8px;
  }
  
  .v-list-item-title {
    font-weight: 500;
    color: rgba(0, 0, 0, 0.6);
  }
  
  .v-list-item-subtitle {
    font-size: 1.1em;
    color: rgba(0, 0, 0, 0.87);
  }
  </style>
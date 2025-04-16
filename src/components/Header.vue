<template>
  <v-container>
    <v-app-bar :elevation="3" color="primary">
      <v-btn icon @click="drawer.toggle">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
      <v-app-bar-title @click="router.push({ name: 'index' })" class="header">ePrometna</v-app-bar-title>
      <v-app-bar-title @click="router.push({ name: 'details'})" class="user-email">{{ userEmail }}</v-app-bar-title>
    </v-app-bar>
  </v-container>
</template>

<script lang="ts" setup>
import { useAuthStore } from '@/stores/auth';
import { useDrawer } from '@/stores/drawer';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const userEmail = authStore.User?.email ?? "No email :("

const drawer = useDrawer();
const router = useRouter();
</script>

<style lang="css" scoped>
.header {
  color: white;
  font-weight: 900;
  cursor: pointer;
}
.user-email {
  color: white;
  font-weight: 900;
  cursor: pointer;
  position: absolute;
  top: 1rem;
  right: 1rem;
}
</style>
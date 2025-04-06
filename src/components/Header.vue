<template>
  <v-container>
    <v-app-bar :elevation="3" color="primary">
      <v-btn icon @click="drawer.toggle">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
      <v-app-bar-title class="header">ePrometna</v-app-bar-title>
    </v-app-bar>
  </v-container>
</template>

<script lang="ts" setup>
import { useDrawer } from '@/stores/drawer';

const drawer = useDrawer();
</script>

<style lang="css" scoped>
.header {
  color: white;
  font-weight: 900;
}
</style>
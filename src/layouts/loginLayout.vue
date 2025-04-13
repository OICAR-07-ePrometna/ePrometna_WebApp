<template>
  <SnackbarProvider>
    <v-main>
      <router-view />
    </v-main>
    <AppFooter />
  </SnackbarProvider>
</template>

<script lang="ts" setup>
import AppFooter from '@/components/AppFooter.vue'
</script>

<style lang="css" scoped></style>

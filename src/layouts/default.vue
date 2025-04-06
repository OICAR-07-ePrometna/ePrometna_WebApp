<template>
  <Header />
  <Navigation>
    <v-main>
      <router-view />
    </v-main>
  </Navigation>
  <AppFooter />
</template>

<script lang="ts" setup>
import Navigation from '@/components/Navigation.vue';
import Header from '@/components/Header.vue';
import AppFooter from '@/components/AppFooter.vue';
</script>

<style lang="css" scoped></style>
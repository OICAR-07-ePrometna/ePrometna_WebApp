<template>
  <Header />
  <Navigation :items="items" />
  <v-main>
  </v-main>
  <AppFooter />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import Header from '@/components/Header.vue';
import Navigation from '@/components/Navigation.vue';

const items = ref<string[]>([]);
items.value = ['Menus', 'menu1', 'menu2', 'menu3'];
</script>

<style scoped>
.v-navigation-drawer__content{
  width: 200px;
}
</style>

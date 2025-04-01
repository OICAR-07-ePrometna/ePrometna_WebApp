<template>
  <Header @toggle-drawer="drawer = !drawer" />
  <v-container>
    <v-navigation-drawer v-model="drawer" width="200" mobile-breakpoint="lg" app>
      <v-list-item class="title"> {{ items[0] }} </v-list-item>
      <v-divider></v-divider>
      <v-list-item v-for="(item, index) in items.slice(1)" :key="index" link :class="{ logout: item === 'Odjava' }">
        {{ item }}
      </v-list-item>
      <v-list-item class="title">Profil</v-list-item>
      <v-divider></v-divider>
      <v-list-item link item>Detalji</v-list-item>
      <v-list-item link item class="logout">Odjava</v-list-item>
    </v-navigation-drawer>
  </v-container>
  <Footer />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import Header from '@/components/Header.vue';
import Footer from '@/components/AppFooter.vue';

const drawer = ref(false);
const items = ref<string[]>(['Menus', 'menu1', 'menu2', 'menu3']);
</script>

<style lang="css" scoped>
.title {
  font-weight: 900;
}
.logout {
  color: lightcoral;
}
.toggle-drawer-btn {
  position: fixed;
  top: 30px;
  left: 16px;
  z-index: 1000;
}
</style>
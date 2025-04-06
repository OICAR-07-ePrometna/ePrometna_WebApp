<template>
  <Header />
  <Navigation>
    <v-main style="--v-layout-right: 10px; --v-layout-top: 10px; --v-layout-bottom: 50px;" >
      <router-view class="content-padding" />
    </v-main>
  </Navigation>
  <AppFooter />
</template>

<script lang="ts" setup>
import Navigation from '@/components/Navigation.vue'
import Header from '@/components/Header.vue'
import AppFooter from '@/components/AppFooter.vue'
</script>

<style lang="css" scoped>
.content-padding{
  padding: 0 2vw 0;
}
</style>
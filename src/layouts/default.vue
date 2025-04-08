<template>
  <Header />
  <Navigation>
    <v-main style="--v-layout-right: 0px; --v-layout-top: 0px; --v-layout-bottom: 50px;" >
      <div class="content-padding">
      <router-view  />
    </div>

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
  padding: 10px 2vw 0;
  overflow-y: scroll;
}
</style>
<template>
  <v-app>
    <component :is="layout" v-if="layout">
      <router-view />
    </component>
  </v-app>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import loginLayout from './layouts/loginLayout.vue'
import defaultLayout from './layouts/default.vue'

const route = useRoute()

// Dynamically determine the layout based on the route's meta.layout property
const layout = computed(() =>
  route.meta.layout === 'loginLayout' ? loginLayout : defaultLayout
)
</script>

<style lang="css" scoped></style>

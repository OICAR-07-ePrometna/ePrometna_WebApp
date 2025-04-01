<template>
  <v-container>
    <v-app-bar :elevation="3" color="primary">
      <v-btn 
        icon 
        @click="$emit('toggle-drawer')" 
        class="toggle-drawer-btn hide-on-desktop"
      >
        <v-icon>mdi-menu</v-icon>
      </v-btn>
      <v-app-bar-title class="header">ePrometna</v-app-bar-title>
    </v-app-bar>
  </v-container>
</template>

<style lang="css" scoped>
.header {
    color: white;
    font-weight: 900;
}
.hide-on-desktop {
    display: none;
}
@media (max-width: 1280px) {
    .hide-on-desktop {
        display: inline-flex;
    }
}
</style>
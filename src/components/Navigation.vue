<template>
  <v-app>
    <v-container>
      <v-navigation-drawer>
        <v-list-item class="title"> {{ items[0] }} </v-list-item>
        <v-divider></v-divider>
        <v-list-item
          v-for="(item, index) in items.slice(1)"
          :key="index"
          link
          :class="{ logout: item === 'Odjava' }"
        >
          {{ item }}
        </v-list-item>
        <v-list-item class="title">Profil</v-list-item>
        <v-divider></v-divider>
        <v-list-item item >Detalji</v-list-item>
        <v-list-item item class="logout">Odjava</v-list-item>
      </v-navigation-drawer>
    </v-container>
  </v-app>
</template>

<script lang="ts" setup>
defineProps({
  items: {
    type: Array as () => string[],
    required: true,
  },
});
</script>

<style lang="css" scoped>
.title {
  font-weight: 900;
}
.logout {
  color: lightcoral;
}
</style>
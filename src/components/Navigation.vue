<template>
  <v-container>
    <v-navigation-drawer :elevation="3" v-model="drawer.open" width="200" mobile-breakpoint="lg" app class="drawerStyle">
      <template v-for="item in filteredItems" :key="item.Name">
        <v-list-item class="title">
          {{ item.Name }}
        </v-list-item>
        <v-divider />
        <v-list-item v-for="link in item.Links" @click="router.push({ path: link.Route })" link>
          {{ link.Name }}
        </v-list-item>
      </template>
      <v-list-item class="title">Profil</v-list-item>
      <v-divider></v-divider>
      <v-list-item link item @click="router.push({ name: 'details' })">Detalji</v-list-item>
      <v-list-item link item class="logout">Odjava</v-list-item>
    </v-navigation-drawer>
  </v-container>
  <slot></slot>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useDrawer } from '@/stores/drawer'
import { UserRole } from '@/enums/enums';
import { navigationLinks, type NavigationGroup } from '@/layouts/links';

const currentUserRole = UserRole.Osoba;

const drawer = useDrawer();
const router = useRouter();

const filteredItems = computed<NavigationGroup[]>(() => {
  navigationLinks.forEach(item => {
    item.Links = item.Links.filter(link => link.AllowRoles.includes(currentUserRole))
  })

  return navigationLinks.filter(item => item.Links.length != 0)
})


</script>

<style lang="css" scoped>
.title {
  font-weight: 900;
}

.logout {
  color: lightcoral;
}

.drawerStyle{
  background: rgb(248, 249, 249);
}
</style>
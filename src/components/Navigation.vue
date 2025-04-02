<template>
  <Header @toggle-drawer="drawer = !drawer" />
  <v-container>
    <v-navigation-drawer v-model="drawer" width="200" mobile-breakpoint="lg" app>
      <template v-for="(item, index) in filteredItems" :key="index">
        <v-list-item v-if="item.IsTitle" class="title">
          {{ item.Name }}
        </v-list-item>
        <v-divider v-if="item.IsTitle"></v-divider>
        <v-list-item
          v-else
          @click="navigateTo(item.Route)"
          link
        >
          {{ item.Name }}
        </v-list-item>
      </template>
      <v-list-item class="title">Profil</v-list-item>
      <v-divider></v-divider>
      <v-list-item link item>Detalji</v-list-item>
      <v-list-item link item class="logout">Odjava</v-list-item>
    </v-navigation-drawer>
  </v-container>
  <Footer />
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import Header from '@/components/Header.vue';
import Footer from '@/components/AppFooter.vue';

interface NavigationLink {
  Name: string;
  IsTitle: boolean;
  AllowRoles: string[];
  Route: string;
}

const currentUserRole = 'driver';
const drawer = ref(false);
const router = useRouter();

const items = ref<NavigationLink[]>([
  {
    Name: "Vozilo",
    IsTitle: true,
    AllowRoles: ['hak'],
    Route: ''
  },
  {
    Name: "Službenici",
    IsTitle: true,
    AllowRoles: ['mupAdmin'],
    Route: ''
  },
  {
    Name: "Promet",
    IsTitle: true,
    AllowRoles: ['driver', 'firma'],
    Route: ''
  },
  {
    Name: "Akcije",
    IsTitle: true,
    AllowRoles: ['superAdmin'],
    Route: ''
  },
  {
    Name: "Promjena vlasništva",
    IsTitle: false,
    AllowRoles: ['hak'],
    Route: 'ownership-change'
  },
  {
    Name: "Novo vozilo",
    IsTitle: false,
    AllowRoles: ['hak'],
    Route: 'new-vehicle'
  },
  {
    Name: "Tehnički pregled",
    IsTitle: false,
    AllowRoles: ['hak'],
    Route: 'technical-check'
  },
  {
    Name: "Odjava vozila",
    IsTitle: false,
    AllowRoles: ['hak'],
    Route: 'vehicle-deregistration'
  },
  {
    Name: "Pregled službenika",
    IsTitle: false,
    AllowRoles: ['mupAdmin'],
    Route: 'officer-overview'
  },
  {
    Name: "Novi službenik",
    IsTitle: false,
    AllowRoles: ['mupAdmin'],
    Route: 'new-officer'
  },
  {
    Name: "Prometna dozvola",
    IsTitle: false,
    AllowRoles: ['driver'],
    Route: 'traffic-license'
  },
  {
    Name: "Vozačka dozvola",
    IsTitle: false,
    AllowRoles: ['driver'],
    Route: 'driver-license'
  },
  {
    Name: "Uređaji",
    IsTitle: false,
    AllowRoles: ['driver'],
    Route: 'devices'
  },
  {
    Name: "Vozila",
    IsTitle: false,
    AllowRoles: ['driver', 'firma'],
    Route: 'vehicles'
  }
]);

const filteredItems = computed(() =>
  items.value.filter(item => item.AllowRoles.includes(currentUserRole))
);

const navigateTo = (route: string) => {
  if (route) {
    router.push({ path: `/${route}` });
  }
};
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
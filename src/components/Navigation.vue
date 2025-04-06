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


const drawer = useDrawer();

interface NavigationGroup {
  Name: string;
  Links: NavigationLink[]
}

interface NavigationLink {
  Name: string;
  AllowRoles: UserRole[];
  Route: string;
}

const items: NavigationGroup[] = ([
  {
    Name: "Vozilo",
    Links: [

      {
        Name: "Promjena vlasništva",
        AllowRoles: [UserRole.HAK],
        Route: '/ownership-change'
      },
      {
        Name: "Novo vozilo",
        AllowRoles: [UserRole.HAK],
        Route: '/new-vehicle'
      },
      {
        Name: "Tehnički pregled",
        AllowRoles: [UserRole.HAK],
        Route: '/technical-check'
      },
      {
        Name: "Odjava vozila",
        AllowRoles: [UserRole.HAK],
        Route: '/vehicle-deregistration'
      },]
  },
  {
    Name: "Službenici",
    Links: [
      {
        Name: "Pregled službenika",
        AllowRoles: [UserRole.Admin],
        Route: '/officer-overview'
      },
      {
        Name: "Novi službenik",
        AllowRoles: [UserRole.Admin],
        Route: '/new-officer'
      },
    ]
  },
  {
    Name: "Promet",
    Links: [
      {
        Name: "Prometna dozvola",
        AllowRoles: [UserRole.Osoba],
        Route: '/traffic-license'
      },
      {
        Name: "Vozačka dozvola",
        AllowRoles: [UserRole.Osoba],
        Route: '/driver-license' 
      },
      {
        Name: "Uređaji",
        AllowRoles: [UserRole.Osoba],
        Route: '/devices'
      },
      {
        Name: "Vozila",
        AllowRoles: [UserRole.Osoba, UserRole.Firma],
        Route: '/vehicles'
      }
    ]
  },
  {
    Name: "Akcije",
    Links: [
    {
        Name: "Novi korisnik",
        AllowRoles: [UserRole.SuperAdmin],
        Route: '/new-user'
      }
    ]
  },


]);

const currentUserRole = UserRole.Osoba;
const router = useRouter();
const filteredItems = computed(() => {
  items.forEach(item => {
    item.Links = item.Links.filter(link => link.AllowRoles.includes(currentUserRole))
  })

  return items.filter(item => item.Links.length != 0)
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
import { UserRole } from "@/enums/userRole";

export const routes = [
  {
    path: "/",
    name: "index",
    component: () => import('@/pages/index.vue'),
    meta: {
      layout: 'default',
      allowedRoles: []
    },
  },
  {
    path: "/login",
    name: "login",
    component: () => import('@/pages/login.vue'),
    meta: {
      layout: 'loginLayout',
      allowedRoles: []
    },
  },
  {
    path: "/login-hak",
    name: "login-hak",
    component: () => import('@/pages/login-hak.vue'),
    meta: {
      layout: 'loginLayout',
      allowedRoles: []
    },
  },
  {
    path: "/login-mup",
    name: "login-mup",
    component: () => import('@/pages/login-mup.vue'),
    meta: {
      layout: 'loginLayout',
      allowedRoles: []
    },
  },
  // Routes previously generated from "Vozilo" group
  {
    path: '/ownership-change',
    name: 'ownership-change',
    component: () => import('@/pages/ownership-change.vue'),
    meta: {
      allowedRoles: [UserRole.HAK],
      layout: 'default',
      breadcrumbName: "Promjena vlasništva"
    },
  },
  {
    path: '/new-vehicle',
    name: 'new-vehicle',
    component: () => import(/* @vite-ignore */ '@/pages/new-vehicle.vue'),
    meta: {
      allowedRoles: [UserRole.HAK],
      layout: 'default',
      breadcrumbName: "Novo vozilo"
    },
  },
  {
    path: '/technical-check',
    name: 'technical-check',
    component: () => import(/* @vite-ignore */ '@/pages/techical-check.vue'),
    meta: {
      allowedRoles: [UserRole.HAK],
      layout: 'default',
      breadcrumbName: "Tehnički pregled"
    },
  },
  {
    path: '/vehicle-deregistration',
    name: 'vehicle-deregistration',
    component: () => import(/* @vite-ignore */ '@/pages/vehicle-deregistration.vue'),
    meta: {
      allowedRoles: [UserRole.HAK],
      layout: 'default',
      breadcrumbName: "Odjava vozila"
    },
  },
  // Routes previously generated from "Službenici" group
  {
    path: '/officer-overview',
    name: 'officer-overview',
    component: () => import(/* @vite-ignore */ '@/pages/officer-overview.vue'),
    meta: {
      allowedRoles: [UserRole.Admin],
      layout: 'default',
      breadcrumbName: "Pregled službenika"
    },
  },
  {
    path: '/new-officer',
    name: 'new-officer',
    component: () => import(/* @vite-ignore */ '@/pages/new-officer.vue'),
    meta: {
      allowedRoles: [UserRole.Admin],
      layout: 'default',
      breadcrumbName: "Novi službenik"
    },
  },
  // Routes previously generated from "Promet" group
  {
    path: '/traffic-license',
    name: 'traffic-license',
    component: () => import(/* @vite-ignore */ '@/pages/traffic-license.vue'),
    meta: {
      allowedRoles: [UserRole.Osoba],
      layout: 'default',
      breadcrumbName: "Prometna dozvola"
    },
  },
  {
    path: '/driver-license',
    name: 'driver-license',
    component: () => import(/* @vite-ignore */ '@/pages/driver-license.vue'),
    meta: {
      allowedRoles: [UserRole.Osoba],
      layout: 'default',
      breadcrumbName: "Vozačka dozvola"
    },
  },
  {
    path: '/devices',
    name: 'devices',
    component: () => import(/* @vite-ignore */ '@/pages/devices.vue'),
    meta: {
      allowedRoles: [UserRole.Osoba],
      layout: 'default',
      breadcrumbName: "Uređaji"
    },
  },
  {
    path: '/vehicles',
    name: 'vehicles',
    component: () => import(/* @vite-ignore */ '@/pages/vehicles.vue'),
    meta: {
      allowedRoles: [UserRole.Osoba, UserRole.Firma],
      layout: 'default',
      breadcrumbName: "Vozila"
    },
  },
  // Routes previously generated from "Akcije" group
  {
    path: '/new-user',
    name: 'new-user',
    component: () => import(/* @vite-ignore */ '@/pages/new-user.vue'),
    meta: {
      allowedRoles: [UserRole.SuperAdmin],
      layout: 'default',
      breadcrumbName: "Novi korisnik"
    },
  },
  {
    path: '/details',
    name: 'details',
    component: () => import('@/pages/details.vue'),
    meta: {
      allowedRoles: [],
      layout: 'default',
      breadcrumbName: "Tvoji podaci"
    },
  }

]
/**
 * router/index.ts
 *
 * Routes setup with regex-based layout assignment.
 */

// Composables
import { useAuthStore } from '@/stores/auth'
import { createRouter, createWebHistory } from 'vue-router'
import {routes} from '@/router/routes'
import type { UserRole } from '@/enums/userRole'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (!localStorage.getItem('vuetify:dynamic-reload')) {
      console.log('Reloading page to fix dynamic import error')
      localStorage.setItem('vuetify:dynamic-reload', 'true')
      location.assign(to.fullPath)
    } else {
      console.error('Dynamic import error, reloading page did not fix it', err)
    }
  } else {
    console.error(err)
  }
})


router.beforeEach((to, from) => {
  const auth = useAuthStore();
  const isAuthenticated = auth.IsAuthenticated; 
  const userRole = auth.UserRole;

  if (!isAuthenticated) {
    if (to.name === 'login') {
      return true;
    } else {
      console.log("Unauthorized: Not authenticated. Redirecting to login.");
      return { name: 'login' };
    }
  }

  if (to.name === 'login') {
      console.log("Authenticated user trying to access login. Redirecting to login.");
      return { path: '/login' };
  }
  const allowedRoles = to.meta?.allowedRoles as Array<UserRole> | undefined;

  if (allowedRoles) { 
    if (allowedRoles.length === 0) {
      return true;
    }

    if (!userRole || !allowedRoles.includes(userRole)) {
      //TODO: implement back
      console.log(`Unauthorized: User role "${userRole}" not in allowed roles [${allowedRoles.join(', ')}]. Redirecting back to ${from.path}.`);
      return { path: from.path };
    }
  }
  return true;
});


router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload')
})

export default router

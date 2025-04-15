/**
 * router/index.ts
 *
 * Routes setup with regex-based layout assignment.
 */

// Composables
import { useAuthStore } from '@/stores/auth'
import { createRouter, createWebHistory } from 'vue-router'
import {routes} from '@/router/routes'

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

router.beforeEach((route) =>{
  const auth = useAuthStore()
 
  if(!auth.IsAuthenticated){
    //TODO: reroute
    console.log("unuotirzed")
    return
  }
  
  // @ts-ignore
  if(route.meta.allowedRoles?.length === 0){
    //TODO: reroute

    console.log("unuotirzed")

    return
  }
  // @ts-ignore
  if(route.meta.allowedRoles?.every(role => role != auth.UserRole)){
    //TODO: reroute

    console.log("unuotirzed")
    return
  }

}) 

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload')
})

export default router

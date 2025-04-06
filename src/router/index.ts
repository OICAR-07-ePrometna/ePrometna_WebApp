/**
 * router/index.ts
 *
 * Routes setup with regex-based layout assignment.
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router'

const pages = import.meta.glob('../pages/*.vue')

const routes = Object.keys(pages).map((path) => {
  const name = path.match(/\.\/pages\/(.*)\.vue$/)?.[1]
  const component = pages[path]

  return {
    path: `/${name === 'index' ? '' : name}`,
    name,
    component,
    meta: {
      layout: ['login', 'login-hak', 'login-mup'].includes(name || '')
        ? 'loginLayout'
        : 'default',
    },
  }
})

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

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload')
})

export default router

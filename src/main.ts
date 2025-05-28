/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */
import { createApp } from 'vue'
import App from './App.vue'
import { registerPlugins } from '@/plugins'
import { fetchRuntimeConfig } from '@/services/configServices'; // Adjust path

async function initializeApp() {
  console.log('[MainApp] Initializing application...');
  try {
    await fetchRuntimeConfig();
    console.log('[MainApp] Runtime configuration loaded.');
  } catch (error) {
    console.error('[MainApp] Failed to initialize runtime configuration:', error);
  }

  const app = createApp(App);
  registerPlugins(app);
  app.mount('#app');
}

initializeApp();

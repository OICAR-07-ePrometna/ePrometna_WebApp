/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */
import { createApp } from 'vue'
import App from './App.vue'
import { registerPlugins } from '@/plugins'

const app = createApp(App);
registerPlugins(app);
app.mount('#app');

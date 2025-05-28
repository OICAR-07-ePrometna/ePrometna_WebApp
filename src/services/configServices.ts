import axios from "axios";

export interface AppConfig {
  VITE_API_URL: string;
}

const defaultConfig: AppConfig = {
  VITE_API_URL: 'http://localhost:8090/api',
};

let runtimeConfig: AppConfig = { ...defaultConfig };
let configPromise: Promise<AppConfig> | null = null;

export function fetchRuntimeConfig(): Promise<AppConfig> {
  if (configPromise) {
    return configPromise;
  }

  // config.json is served at the root by Nginx
  const configUrl = '/config.json';

  console.log(`[ConfigService] Fetching runtime configuration from: ${configUrl}`);
  configPromise = axios.get<AppConfig>(configUrl, { headers: { 'Cache-Control': 'no-cache' } }) // Add no-cache header for the request too
    .then(response => {
      if (response.data && response.data.VITE_API_URL) {
        console.log('[ConfigService] Runtime config loaded:', response.data);
        runtimeConfig = { ...response.data };
      } else {
        console.warn('[ConfigService] Fetched config.json is invalid or missing VITE_API_URL. Using defaults.');
        runtimeConfig = { ...defaultConfig };
      }
      return runtimeConfig;
    })
    .catch(error => {
      console.error(`[ConfigService] Failed to load ${configUrl}. Using default/build-time config. Error:`, error);
      runtimeConfig = { ...defaultConfig }; // Fallback to default config
      return runtimeConfig;
    });
  return configPromise;
}

export function getAppConfig(): AppConfig {
  return runtimeConfig;
}

import axios from 'axios';
import { useAuthStore } from '@/stores/auth';

const HOST_URL = "http://localhost:8091/api";
const REFRESH_TOKEN_URL = '/auth/refresh';
const TEN_MINUTES_IN_MS = 10 * 60 * 1000;


const axiosInstance = axios.create({
  baseURL: HOST_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// --- Request Interceptor ---
// Adds the access token to outgoing requests if available
axiosInstance.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore();
    const accessToken = authStore.AccessToken;
    if (accessToken) {
      config.headers = config.headers || {};
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// --- Response Error Interceptor ---
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const authStore = useAuthStore();
    if (error.response?.status === 401 && error.config.url !== REFRESH_TOKEN_URL) {
      console.error('Received 401 error. Proactive refresh might have failed or token expired. Logging out.');
      authStore.Logout();
    }
    return Promise.reject(error);
  }
);


// --- Token Refresh Function ---
const refreshToken = async () => {
  const authStore = useAuthStore();
  const currentRefreshToken = authStore.RefreshToken;

  if (!currentRefreshToken) {
    console.error('No refresh token available for scheduled refresh.');
    authStore.Logout();
    return;
  }

  try {
    console.log('Attempting scheduled token refresh...');
    const refreshResponse = await axios.post(HOST_URL + REFRESH_TOKEN_URL, {
      refreshToken: currentRefreshToken,
    });

    const { accessToken: newAccessToken, refreshToken: newRefreshToken } = refreshResponse.data;
    authStore.SetTokens(newAccessToken, newRefreshToken || currentRefreshToken);
    axiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + newAccessToken;
    console.log('Token refreshed successfully via schedule.');
  } catch (error) {
    console.error('Unable to refresh token via schedule:', error);
    authStore.Logout();
  }
};

// --- Setup Periodic Token Refresh ---
let refreshIntervalId: number | undefined;

export const startPeriodicRefresh = () => {
  if (refreshIntervalId) {
    clearInterval(refreshIntervalId);
  }
  // Immediately refresh token on startup if authenticated, then set interval
  const authStore = useAuthStore();
  if (authStore.IsAuthenticated) {
    refreshToken();
  }
  refreshIntervalId = setInterval(refreshToken, TEN_MINUTES_IN_MS);
  console.log(`Token refresh scheduled every ${TEN_MINUTES_IN_MS / 60000} minutes.`);
};

export const stopPeriodicRefresh = () => {
  if (refreshIntervalId) {
    clearInterval(refreshIntervalId);
    refreshIntervalId = undefined;
    console.log('Token refresh schedule stopped.');
  }
};

export default axiosInstance;

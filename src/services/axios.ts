import axios from 'axios';
import { useAuthStore } from '@/stores/auth';

const API_BASE_URL = 'http://localhost:8090/api';
const REFRESH_TOKEN_URL = '/auth/refresh';
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// --- Request Interceptor ---
// Adds the access token to outgoing requests if available
axiosInstance.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore();
    const accessToken = authStore.AccessToken
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
// Handles 401 errors, attempts refresh, and retries requests

// Flag to track if a token refresh is currently in progress
let isRefreshing = false;
// Array to hold requests that failed while refreshing token
let failedQueue: { resolve: (value: unknown) => void; reject: (reason?: any) => void; }[] = [];

// Helper function to process the queue
const processQueue = (error: unknown, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error); 
    } else {
      prom.resolve(token); 
    }
  });
  failedQueue = [];
};

axiosInstance.interceptors.response.use(
  (response) => {
    // If response is successful, just return it
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const authStore = useAuthStore(); // Get store instance

    // Check if it's a 401 error and not a retry request already
    // Also check if it's not the refresh token request itself that failed
    if (error.response?.status === 401 && !originalRequest._retry && originalRequest.url !== REFRESH_TOKEN_URL) {

      // If a refresh is already in progress, queue the original request
      if (isRefreshing) {
        return new Promise(function(resolve, reject) {
          failedQueue.push({ resolve, reject });
        }).then(token => {
          // When refresh is done, retry the original request with the new token
          originalRequest.headers['Authorization'] = 'Bearer ' + token;
          return axiosInstance(originalRequest); // Retry
        }).catch(err => {
          // If the queued request promise is rejected (refresh failed), propagate the error
          return Promise.reject(err);
        });
      }

      // Mark that we are refreshing
      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = authStore.RefreshToken;

      if (!refreshToken) {
        console.error('No refresh token available.');
        authStore.Logout();
        isRefreshing = false;
        processQueue(new Error('No refresh token available.'), null);
        return Promise.reject(error);
      }

      try {
        console.log('Attempting to refresh token...');
        // Make the refresh token request
        // IMPORTANT: Use base axios or a different instance if REFRESH_TOKEN_URL is relative
        // to avoid intercepting this request below if it also fails with 401
        const refreshResponse = await axios.post(API_BASE_URL + REFRESH_TOKEN_URL, {
           refreshToken: refreshToken,
        });

        const { accessToken: newAccessToken, refreshToken: newRefreshToken } = refreshResponse.data;
        authStore.SetTokens(newAccessToken, newRefreshToken || refreshToken);

        console.log('Token refreshed successfully.');

        axiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + newAccessToken;
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

        processQueue(null, newAccessToken);

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error('Unable to refresh token:', refreshError);
        authStore.Logout();

        processQueue(refreshError, null);
        return Promise.reject(refreshError);

      } finally {
         isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);


export default axiosInstance;


/**
 * How to use:
 *
 * import apiClient from './path/to/this/axiosConfig'; // Adjust path
 *
 * async function fetchSomeData() {
 * try {
 * const response = await apiClient.get('/some/protected/endpoint');
 * console.log(response.data);
 * } catch (error) {
 * console.error('Failed to fetch data:', error);
 * // Handle error in the component/service if needed
 * // (e.g., show error message, redirect to login if refresh failed)
 * }
 * }
 *
 * fetchSomeData();
 */


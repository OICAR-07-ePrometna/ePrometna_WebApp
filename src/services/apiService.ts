import axios from 'axios';
import type { LoginDto } from '@/dtos/loginDto';
import type { TokenResponse } from '@/models/tokenResponse';
import type { RefreshDto } from '@/dtos/refreshDto';
import { useAuthStore } from '@/stores/auth';

const API_URL = 'http://localhost:8090/api';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

apiClient.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore();
    if (authStore.accessToken) {
      config.headers['Authorization'] = `Bearer ${authStore.accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const authStore = useAuthStore();

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      authStore.refreshToken &&
      !originalRequest.url?.includes('/auth/refresh')
    ) {
      originalRequest._retry = true;

      try {
        await authStore.refreshTokens();

        originalRequest.headers['Authorization'] = `Bearer ${authStore.accessToken}`;

        return apiClient(originalRequest);
      } catch (refreshError) {
        authStore.logout();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

class AuthService {
  async login(credentials: LoginDto): Promise<TokenResponse> {
    const response = await apiClient.post<TokenResponse>('/auth/login', credentials);
    return response.data;
  }

  async refreshToken(refreshDto: RefreshDto): Promise<TokenResponse> {
    const response = await apiClient.post<TokenResponse>('/auth/refresh', refreshDto);
    return response.data;
  }
}

export default new AuthService();
export { apiClient };

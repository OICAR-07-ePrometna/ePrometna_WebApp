import axios from 'axios';
import { defineStore } from 'pinia';
import AuthService from '@/services/authService';
import type { TokenResponse} from '@/models/tokenResponse';
import type { AuthState} from '@/models/authState';

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    accessToken: localStorage.getItem('accessToken') || null,
    refreshToken: localStorage.getItem('refreshToken') || null,
    user: null,
    loading: false,
    error: null
  }),

  getters: {
    isAuthenticated: (state: AuthState): boolean => !!state.accessToken
  },

  actions: {
    async login(email: string, password: string): Promise<TokenResponse> {
      this.loading = true;
      this.error = null;
    
      try {
        const response = await AuthService.login({ email, password });
        this.setTokens(response.accessToken, response.refreshToken);
        return response;
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          this.error = error.response?.data;
        } else {
          this.error = 'Invalid credentials';
        }
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async refreshTokens(): Promise<TokenResponse> {
      if (!this.refreshToken) {
        this.logout();
        throw new Error(this.error || 'Missing refresh token');
      }
    
      try {
        const response = await AuthService.refreshToken({ refreshToken: this.refreshToken });
        this.setTokens(response.accessToken, response.refreshToken);    
        return response;
      } catch (error) {
        this.logout();
        throw error;
      }
    },

    setTokens(accessToken: string, refreshToken: string): void {
      this.accessToken = accessToken;
      this.refreshToken = refreshToken;

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
    },

    logout(): void {
      this.accessToken = null;
      this.refreshToken = null;
      this.user = null;

      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    },

    clearError(): void {
      this.error = null;
    }
  }
});

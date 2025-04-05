import axios from 'axios';
import { defineStore } from 'pinia';
import { jwtDecode } from 'jwt-decode';
import AuthService from '@/services/auth.service';
import type { TokenResponse } from '@/dtos/dtos';
import type { AuthState, User, TokenClaims } from '@/models/models';
import type { UserRole } from '@/enums/enums';

export const useAuthStorage = defineStore('auth', {
  state: (): AuthState => ({
    accessToken: localStorage.getItem('accessToken') || null,
    refreshToken: localStorage.getItem('refreshToken') || null,
    user: null,
    loading: false,
    error: null
  }),

  getters: {
    isAuthenticated: (state: AuthState): boolean => !!state.accessToken,

    userRole: (state: AuthState): UserRole | null => {
      if (!state.accessToken) return null;
      try {
        const decoded = jwtDecode<TokenClaims>(state.accessToken);
        return decoded.role;
      } catch {
        return null;
      }
    },

    userInfo: (state: AuthState): TokenClaims | null => {
      if (!state.accessToken) return null;
      try {
        return jwtDecode<TokenClaims>(state.accessToken);
      } catch {
        return null;
      }
    },

    tokenExpiration: (state: AuthState): number | null => {
      if (!state.accessToken) return null;
      try {
        const decoded = jwtDecode<TokenClaims>(state.accessToken);
        return decoded.exp * 1000;
      } catch {
        return null;
      }
    },

    isTokenExpired: (state: AuthState): boolean => {
      const expiration = useAuthStorage().tokenExpiration;
      if (!expiration) return true;
      return Date.now() >= expiration;
    }
  },

  actions: {
    //TODO: Implement better logic later
    async login(email: string, password: string): Promise<TokenResponse> {
      this.loading = true;
      this.error = null;

      try {
        const response = await AuthService.login({ email, password });

        this.setTokens(response.accessToken, response.refreshToken);
        this.user = jwtDecode<TokenClaims>(response.accessToken) as unknown as User;

        return response;
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          this.error = error.response?.data;
        } else {
          this.error = 'An unexpected error occurred';
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
        this.user = jwtDecode<TokenClaims>(response.accessToken) as unknown as User;
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
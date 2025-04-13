import { defineStore } from 'pinia';
import UserService from '@/services/userService';
import type { UserState } from '@/models/userState';
import { useAuthStore } from '@/stores/auth';

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    currentUser: null,
    error: null
  }),

  getters: {
    isLoggedIn: (state) => !!state.currentUser,
  },

  actions: {
    async fetchLoggedInUser() {
      this.error = null;
      try {
        const authStore = useAuthStore();
        
        if (!authStore.accessToken) {
          throw new Error('Access token is missing');
        }
        const user = await UserService.getLoggedInUser(authStore.accessToken);
        this.currentUser = user;
        return user;
      } catch {
        this.error = 'Failed to fetch user data';
        return null;
      }
    },

    async refreshUserData() {
      const authStore = useAuthStore();
      
      if (authStore.isAuthenticated) {
        return this.fetchLoggedInUser();
      }
      
      return null;
    }
  }
});
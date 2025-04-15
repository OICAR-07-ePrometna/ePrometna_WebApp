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
    userRole: (state) => state.currentUser?.role
  },

  actions: {
    async fetchLoggedInUser() {
      this.error = null;
      try {
        if (this.currentUser == null) {
          const user = await UserService.getLoggedInUser();
          this.currentUser = user;
        }
        return this.currentUser;
      } catch {
        this.error = 'Failed to fetch user data';
        return null;
      }
    },

    async refreshUserData() {
      try {
        const user = await UserService.getLoggedInUser();
        this.currentUser = user;
        return this.currentUser;
      } catch {
        this.error = 'Failed to fetch user data';
        return null;
      }

      return null;
    }
  }
});
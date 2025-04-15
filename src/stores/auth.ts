import { defineStore } from 'pinia';
import { login } from '@/services/authService';
import { getLoggedInUser } from '@/services/userService'
import type { User } from '@/models/user';
export const useAuthStore = defineStore('auth', () => {
  const User = computed({
    get: () => {
      const data = localStorage.getItem('user')
      if (data == null)
        return undefined

      return JSON.parse(data) as User
    },
    set: (val: User) => localStorage.setItem('user', JSON.stringify(val))
  })

  const UserRole = computed(() => User.value?.role)

  const AccessToken = computed({
    get: () => localStorage.getItem('accessToken'),
    set: (val: string) => localStorage.setItem('accessToken', val)
  })

  const RefreshToken = computed({
    get: () => localStorage.getItem('refreshToken'),
    set: (val: string) => localStorage.setItem('refreshToken', val)
  })

  const IsAuthenticated = computed(() => AccessToken != null)

  function Logout(): void {
    localStorage.removeItem('user')
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }

  async function Login(email: string, password: string) {
    const response = await login({ email, password });
    SetTokens(response.accessToken, response.refreshToken);
    return response;
  }

  async function GetLoggedInUser() {
    const user = await getLoggedInUser();
    User.value = user!;
  }

  function SetTokens(accessToken: string, refreshToken: string): void {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  }


  return {
    User,
    UserRole,
    IsAuthenticated,
    AccessToken,
    RefreshToken,
    Logout,
    Login,
    GetLoggedInUser,
    SetTokens,
  }
})
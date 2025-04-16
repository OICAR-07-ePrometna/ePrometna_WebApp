import { defineStore } from 'pinia';
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

  const IsAuthenticated = computed(() => localStorage.getItem('accessToken') != null)

  function Logout(): void {
    localStorage.removeItem('user')
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');

    //NOTE: use this becouse router is undefined
    document.location.replace('/login')
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
    SetTokens,
  }
})

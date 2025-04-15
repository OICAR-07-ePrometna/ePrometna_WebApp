import type { User } from '@/models/user';

export interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  userData: User | null;
  loading: boolean;
  error: string | null;
}
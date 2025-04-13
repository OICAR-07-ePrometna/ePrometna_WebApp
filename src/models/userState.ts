import type { User } from '@/models/user';

export interface UserState {
  currentUser: User | null;
  error: string | null;
}
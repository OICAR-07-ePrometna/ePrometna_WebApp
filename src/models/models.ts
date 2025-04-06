import type { UserRole } from '@/enums/enums';

export interface User {
  uuid: string;
  firstName: string;
  lastName: string;
  oib: string;
  residence: string;
  birthDate: string;
  email: string;
  role: UserRole;
}

export interface TokenClaims {
  uuid: string;
  email: string;
  role: UserRole;
  exp: number;
  iat: number;
}

export interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: User | null;
  loading: boolean;
  error: string | null;
}

export interface ApiError {
  message: string;
  statusCode: number;
  timestamp: string;
}

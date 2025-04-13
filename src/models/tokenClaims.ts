import type { UserRole } from '@/enums/userRole';

export interface TokenClaims {
  uuid: string;
  email: string;
  role: UserRole;
  exp: number;
  iat: number;
}
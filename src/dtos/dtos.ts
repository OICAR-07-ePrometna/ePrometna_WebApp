import type { User } from '@/models/models';

export interface LoginDto {
  email: string;
  password: string;
}

export interface TokenResponse {
  accessToken: string;
  refreshToken: string;
}

export interface RefreshDto {
  refreshToken: string;
}

export interface NewUserDto {
  FirstName: string;
  LastName: string;
  OIB: string;
  Residence: string;
  BirthDate: string; //YYYY-MM-DD
  Email: string;
  Password: string;
  Role: string;
}

export function createNewUserDto(
  user: User, 
  password: string
): NewUserDto {
  return {
    FirstName: user.firstName,
    LastName: user.lastName,
    OIB: user.oib,
    Residence: user.residence,
    BirthDate: user.birthDate,
    Email: user.email,
    Password: password,
    Role: user.role
  };
}

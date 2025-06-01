import axios, { AxiosError } from 'axios';
import type { LoginDto } from '@/dtos/loginDto';
import type { TokenResponse } from '@/models/tokenResponse';
import type { ApiError } from '@/models/apiError';
import axiosInstance from './axios';

export async function login(credentials: LoginDto): Promise<TokenResponse> {
  try {
    const response = await axiosInstance.post<TokenResponse>('auth/login', credentials);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ApiError>;
      throw new Error(axiosError.response?.data?.message);
    }
    throw new Error('An unexpected error occurred during login');
  }
}

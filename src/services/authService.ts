import axios, { AxiosError } from 'axios';
import type { LoginDto } from '@/dtos/loginDto';
import type { TokenResponse } from '@/models/tokenResponse';
import type { ApiError } from '@/models/apiError';

const API_BASE_URL = 'http://localhost:8090/api';
const safeInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

 export async function login(credentials: LoginDto): Promise<TokenResponse> {
    try {
      const response = await safeInstance.post<TokenResponse>('/auth/login', credentials);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ApiError>;
        throw new Error(axiosError.response?.data?.message);
      }
      throw new Error('An unexpected error occurred during login');
    }
  }
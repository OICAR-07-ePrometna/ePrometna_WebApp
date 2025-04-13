import axios, { AxiosError } from 'axios';
import type { LoginDto } from '@/dtos/loginDto';
import type { TokenResponse } from '@/models/tokenResponse';
import type { RefreshDto } from '@/dtos/refreshDto';
import type { ApiError } from '@/models/apiError';

const API_URL = 'http://localhost:8090/api';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

class AuthService {
  async login(credentials: LoginDto): Promise<TokenResponse> {
    try {
      const response = await apiClient.post<TokenResponse>('/auth/login', credentials);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ApiError>;
        throw new Error(axiosError.response?.data?.message);
      }
      throw new Error('An unexpected error occurred during login');
    }
  }

  async refreshToken(refreshDto: RefreshDto): Promise<TokenResponse> {
    try {
      const response = await apiClient.post<TokenResponse>('/auth/refresh', refreshDto);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ApiError>;
        throw new Error(axiosError.response?.data?.message);
      }
      throw new Error('An unexpected error occurred during token refresh');
    }
  }
}

export default new AuthService();
export { apiClient };

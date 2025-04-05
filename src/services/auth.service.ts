import axios from 'axios';
import type { LoginDto, TokenResponse, RefreshDto } from '@/dtos/dtos';

const API_URL = 'http://localhost:8090/api';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

class AuthService {
  async login(credentials: LoginDto): Promise<TokenResponse> {
    const response = await apiClient.post<TokenResponse>('/auth/login', credentials);
    return response.data;
  }

  async refreshToken(refreshDto: RefreshDto): Promise<TokenResponse> {
    const response = await apiClient.post<TokenResponse>('/auth/refresh', refreshDto);
    return response.data;
  }
}

export default new AuthService();
export { apiClient };
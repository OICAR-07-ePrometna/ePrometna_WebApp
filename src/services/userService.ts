import axios from 'axios';
import type { User } from '@/models/user';
import { createNewUserDto} from '@/dtos/newUserDto';
import { UserRole } from '@/enums/userRole';
import { formatDate } from '@/utils/formatDate';
import { useAuthStore } from '@/stores/auth';

const API_URL = 'http://localhost:8090/api';

export default {
  async createUser(user: User, password: string): Promise<User | null> {
    const userDto = createNewUserDto(user, password);
    userDto.BirthDate = formatDate(userDto.BirthDate);

    try {
      const response = await axios.post(`${API_URL}/user/`, userDto);

      if (response.data) {
        return {
          uuid: response.data.Uuid,
          firstName: response.data.FirstName,
          lastName: response.data.LastName,
          oib: response.data.OIB,
          residence: response.data.Residence,
          birthDate: response.data.BirthDate,
          email: response.data.Email,
          role: response.data.Role as UserRole
        };
      }

      return null;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  },

  async getLoggedInUser(): Promise<User | null> {
    const authStore = useAuthStore();
        
    if (!authStore.accessToken) {
      throw new Error('Access token is missing');
    }

    try {
      const response = await axios.get(`${API_URL}/user/my-data`, {
        headers: {
          'Authorization': `Bearer ${authStore.accessToken}`
        }
      });

      if (response.data) {
        return {
          uuid: response.data.Uuid,
          firstName: response.data.FirstName,
          lastName: response.data.LastName,
          oib: response.data.OIB,
          residence: response.data.Residence,
          birthDate: response.data.BirthDate,
          email: response.data.Email,
          role: response.data.Role as UserRole
        };
      }

      return null;
    } catch (error) {
      console.error('Error fetching current user:', error);
      throw error;
    }
  }
};
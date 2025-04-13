import axios from 'axios';
import type { User } from '@/models/models';
import { createNewUserDto, type TokenResponse } from '@/dtos/dtos';
import { UserRole } from '@/enums/enums';
import { formatDate } from '@/utils/date.util';

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

  async getLoggedInUser(token: string): Promise<User | null> {
    if (!token) {
      throw new Error('Token is required');
    }

    try {
      const response = await axios.get(`${API_URL}/user/my-data`, {
        headers: {
          'Authorization': `Bearer ${token}`
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
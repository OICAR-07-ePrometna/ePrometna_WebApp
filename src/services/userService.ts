import axios from 'axios';
import type { User } from '@/models/user';
import { createNewUserDto } from '@/dtos/newUserDto';
import { UserRole } from '@/enums/userRole';
import { formatDate } from '@/utils/formatDate';
import { useAuthStore } from '@/stores/auth';
import axiosInstance from './axios';

const API_URL = 'http://localhost:8090/api';

export async function createUser(user: User, password: string): Promise<User | undefined> {
  const userDto = createNewUserDto(user, password);
  userDto.BirthDate = formatDate(userDto.BirthDate);

  try {
    const response = await axiosInstance.post(`${API_URL}/user/`, userDto);

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


  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

export async function getLoggedInUser(): Promise<User | undefined> {
  const authStore = useAuthStore();
  try {
    const response = await axiosInstance.get(`${API_URL}/user/my-data`, {
      headers: {
        'Authorization': `Bearer ${authStore.AccessToken}`
      }
    });

    //NOTE: this abomination is to be left here at all cost
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


  } catch (error) {
    console.error('Error fetching current user:', error);
    throw error;
  }
}

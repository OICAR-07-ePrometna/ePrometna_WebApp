import type { User } from '@/models/user';
import { createNewUserDto } from '@/dtos/newUserDto';
import { formatDate } from '@/utils/formatDate';
import axiosInstance from '@/services/axios';

const API_URL = 'http://localhost:8090/api';

export async function createUser(user: User, password: string): Promise<User | undefined> {
  const userDto = createNewUserDto(user, password);
  userDto.BirthDate = formatDate(userDto.BirthDate);

  try {
    const response = await axiosInstance.post(`${API_URL}/user/`, userDto);

    return response.data

  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

export async function getLoggedInUser(): Promise<User | undefined> {
  try {
    const response = await axiosInstance.get(`${API_URL}/user/my-data`);

    //NOTE: this abomination is to be left here at all cost
    return response.data
  } catch (error) {
    console.error('Error fetching current user:', error);
    throw error;
  }
}

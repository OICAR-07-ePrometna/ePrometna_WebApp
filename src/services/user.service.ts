import axios from 'axios';
import type { User } from '@/models/models';
import type { NewUserDto } from '@/dtos/dtos';
import { UserRole } from '@/enums/enums';
import { formatDateForApi, parseApiDate } from '@/utils/date.util';

const API_URL = 'http://localhost:8090/api';

export default {

  async createUser(user: User, password: string): Promise<User | null> {
    const userDto: NewUserDto = {
      FirstName: user.firstName,
      LastName: user.lastName,
      OIB: user.oib,
      Residence: user.residence,
      BirthDate: formatDateForApi(user.birthDate),
      Email: user.email,
      Password: password,
      Role: user.role
    };
    
    // Make the API request
    const response = await axios.post(`${API_URL}/user/`, userDto);
    
    // Return the response data as a User
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
  },
  
  /**
   * Get a user by UUID
   * @param uuid - User UUID
   * @returns User model
   */
  async getUser(uuid: string): Promise<User | null> {
    const response = await axios.get(`${API_URL}/user/${uuid}`);
    
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
  },
  
  /**
   * Helper function to format date for API
   * @param date - Date object
   * @returns Formatted date string (YYYY-MM-DD)
   */
  formatDateForApi(date: Date | null): string {
    if (!date) return '';
    
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return `${year}-${month}-${day}`;
  },
  
  /**
   * Helper function to parse API date format
   * @param dateString - Date string in YYYY-MM-DD format
   * @returns Date object
   */
  parseDateFromApi(dateString: string | null): Date | null {
    if (!dateString) return null;
    
    // Can simply use new Date() since the format is YYYY-MM-DD
    return new Date(dateString);
  }
};
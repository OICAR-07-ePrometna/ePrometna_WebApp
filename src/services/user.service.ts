import axios from 'axios';
import type { User } from '@/models/models';
import type { NewUserDto } from '@/dtos/dtos';
import { UserRole } from '@/enums/enums';
import { formatDate } from '@/utils/date.util';

const API_URL = 'http://localhost:8090/api';

export default {

  async createUser(user: User, password: string): Promise<User | null> {
    const userDto: NewUserDto = {
      FirstName: user.firstName,
      LastName: user.lastName,
      OIB: user.oib,
      Residence: user.residence,
      BirthDate: formatDate(user.birthDate),
      Email: user.email,
      Password: password,
      Role: user.role
    };

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
  }
};
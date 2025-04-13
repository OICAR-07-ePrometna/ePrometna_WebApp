import type { User } from '@/models/user';
import { formatDate } from '@/utils/formatDate';

export interface NewUserDto {
    FirstName: string;
    LastName: string;
    OIB: string;
    Residence: string;
    BirthDate: string; //YYYY-MM-DD
    Email: string;
    Password: string;
    Role: string;
}

export function createNewUserDto(
    user: User,
    password: string
): NewUserDto {
    return {
        FirstName: user.firstName,
        LastName: user.lastName,
        OIB: user.oib,
        Residence: user.residence,
        BirthDate: formatDate(user.birthDate),
        Email: user.email,
        Password: password,
        Role: user.role
    };
}
import type { User } from '@/models/user';
import { formatDate } from '@/utils/formatDate';

export interface NewUserDto {
    firstName: string;
    lastName: string;
    oib: string;
    residence: string;
    birthDate: string; //YYYY-MM-DD
    email: string;
    password: string;
    role: string;
}

export function createNewUserDto(
    user: User,
    password: string
): NewUserDto {
    return {
        firstName: user.firstName,
        lastName: user.lastName,
        oib: user.oib,
        residence: user.residence,
        birthDate: formatDate(user.birthDate),
        email: user.email,
        password: password,
        role: user.role
    };
}
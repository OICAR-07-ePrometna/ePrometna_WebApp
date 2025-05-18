export interface User {
  uuid: string;
  firstName: string;
  lastName: string;
  oib: string;
  residence: string;
  birthDate: string;
  email: string;
  role: string;
  police_token?: string | null;
}
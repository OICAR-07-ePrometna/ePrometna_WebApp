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

export interface Mobile {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string | null;
  Uuid: string;
  UserId: number;
  CreatorId: number;
  RegisteredDevice: string;
  ActivationToken: string;
}
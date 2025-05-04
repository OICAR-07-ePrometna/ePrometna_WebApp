import type { VehicleDto } from "@/dtos/vehicleDto";

export interface UserVehiclesDto extends VehicleDto {
  lastRegistrationDate?: string;
  category?: string;
  validUntil?: string;
  ownerDetails?: {
    firstName?: string;
    lastName?: string;
    FirstName?: string;
    LastName?: string;
  };
}
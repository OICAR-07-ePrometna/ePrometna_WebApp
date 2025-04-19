import type { UserDto } from "@/dtos/userDto";

export interface VehicleDetailsDto {
    uuid: string;
    vehicleType: string;
    vehicleModel: string;
    productionYear: number;
    registration: string;
    owner: UserDto;
    drivers: UserDto[];
    pastOwners: UserDto[];
}
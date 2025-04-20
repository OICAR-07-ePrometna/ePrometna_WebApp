import type { UserDto } from "@/dtos/userDto";
import type { VehicleSummaryDto } from '@/dtos/vehicleSummaryDto';

export interface VehicleDetailsDto {
    uuid: string;
    registration: string;
    owner: UserDto;
    drivers: UserDto[];
    pastOwners: UserDto[];
    summary: VehicleSummaryDto;
}
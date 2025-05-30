import type { UserDto } from "@/dtos/userDto";
import type { VehicleSummary } from "@/models/vehicleDataModels";
import type { RegistrationLogs } from "@/models/vehicleDataModels";

export interface VehicleDetailsDto {
    uuid: string;
    registration: string;
    owner: UserDto;
    drivers: UserDto[];
    pastOwners: UserDto[];
    summary: VehicleSummary;
    pastRegistration: RegistrationLogs[];
}
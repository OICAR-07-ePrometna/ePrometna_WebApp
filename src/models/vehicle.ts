import type { User } from '@/models/user';
import type { VehicleDrivers } from '@/models/vehicleDrivers';
import type { OwnerHistory } from '@/models/ownerHistory';
import type { TempData } from '@/models/tempData';
import type { RegistrationInfo } from '@/models/registrationInfo';

export interface Vehicle {
    uuid: string;
    vehicleType: string;
    vehicleModel: string;
    productionYear: string;
    chasisNumber: string;
    userId: string;
    owner: User;
    drivers: VehicleDrivers[];
    ownerHistory: OwnerHistory[];
    tempData: TempData;
    registrationInfo: RegistrationInfo;
}
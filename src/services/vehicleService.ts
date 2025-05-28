import type { VehicleDto } from '@/dtos/vehicleDto';
import type { vehicleDetails, VehicleSummary } from '@/models/vehicleDataModels';
import type { VehicleDetailsDto } from '@/dtos/vehicleDetailsDto';
import axiosInstance from '@/services/axios';

const SERVICE = "vehicle"

export async function getMyVehicles(): Promise<VehicleDto[]> {
  try {
    const response = await axiosInstance.get(`${SERVICE}/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user vehicles:', error);
    throw error;
  }
}

export async function getVehicleDetails(uuid: string): Promise<VehicleDetailsDto> {
  try {
    const response = await axiosInstance.get(`${SERVICE}/${uuid}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching vehicle details for ${uuid}:`, error);
    throw error;
  }
}

export async function getVehicleByVin(vin: string): Promise<VehicleDetailsDto> {
  try {
    const response = await axiosInstance.get(`${SERVICE}/vin/${vin}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching vehicle details for VIN ${vin}:`, error);
    throw error;
  }
}

export async function getVehicle(guid: string): Promise<vehicleDetails | undefined> {
  try {
    const rez = await axiosInstance.get(`/${SERVICE}/${guid}`)
    return rez.data
  }
  catch (error) {
    throw error
  }
}

export interface CreateVehicleDto { ownerUuid: string; registration: string; summary: VehicleSummary }
export async function createVehicle(dto: CreateVehicleDto): Promise<VehicleDetailsDto> {
  try {
    const response = await axiosInstance.post(`${SERVICE}/`, dto);
    return response.data;
  } catch (error) {
    console.error(`Error creating vehicle`, error);
    throw error;
  }
}

export async function deleteVehicle(uuid: string): Promise<void> {
  try {
    await axiosInstance.delete(`${SERVICE}/${uuid}`);
  } catch (error) {
    console.error(`Error deleting vehicle`, error);
    throw error;
  }
}

export async function deregisterVehicle(uuid: string): Promise<VehicleDetailsDto> {
  try {
    const response = await axiosInstance.put(`${SERVICE}/deregister/${uuid}`);
    return response.data;
  } catch (error) {
    console.error(`Error deregistering vehicle`, error);
    throw error;
  }
}

export interface ChangeOwnerDto {
  vehicleUuid: string;
  newOwnerUuid: string;
}

export async function changeOwner(dto: ChangeOwnerDto): Promise<void> {
  try {
    await axiosInstance.put(`${SERVICE}/change-owner`, dto);
  } catch (error) {
    console.error('Error changing vehicle owner:', error);
    throw error;
  }
}

export interface RegistrationDto {
  note: string;
  passTechnical: boolean;
  registration: string;
  traveledDistance: number;
}

export async function registerVehicle(uuid: string, registrationData: RegistrationDto): Promise<void> {
  try {
    await axiosInstance.put(`${SERVICE}/registration/${uuid}`, registrationData);
  } catch (error) {
    console.error('Error registering vehicle:', error);
    throw error;
  }
}

export async function updateVehicle(uuid: string, vehicleData: VehicleDetailsDto): Promise<VehicleDetailsDto> {
  try {
    const response = await axiosInstance.put(`${SERVICE}/${uuid}`, vehicleData);
    return response.data;
  } catch (error) {
    console.error('Error updating vehicle:', error);
    throw error;
  }
}

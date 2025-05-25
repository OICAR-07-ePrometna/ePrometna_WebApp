import type { VehicleDto } from '@/dtos/vehicleDto';
import type { vehicleDetails, VehicleSummary } from '@/models/vehicleDataModels';
import type { VehicleDetailsDto } from '@/dtos/vehicleDetailsDto';
import axiosInstance from '@/services/axios';

const API_URL = 'http://localhost:8090/api';
const SERVICE = "vehicle"

export async function getMyVehicles(): Promise<VehicleDto[]> {
  try {
    const response = await axiosInstance.get(`${API_URL}/vehicle/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user vehicles:', error);
    throw error;
  }
}

export async function getVehicleDetails(uuid: string): Promise<VehicleDetailsDto> {
  try {
    const response = await axiosInstance.get(`${API_URL}/vehicle/${uuid}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching vehicle details for ${uuid}:`, error);
    throw error;
  }
}

export async function getVehicleByVin(vin: string): Promise<VehicleDetailsDto> {
  try {
    const response = await axiosInstance.get(`${API_URL}/vehicle/vin/${vin}`);
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
    const response = await axiosInstance.post(`${API_URL}/vehicle/`, dto);
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
    const response = await axiosInstance.put(`${API_URL}/vehicle/deregister/${uuid}`);
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
    await axiosInstance.put(`${API_URL}/vehicle/change-owner`, dto);
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
        await axiosInstance.put(`${API_URL}/vehicle/registration/${uuid}`, registrationData);
    } catch (error) {
        console.error('Error registering vehicle:', error);
        throw error;
    }
}

export async function updateVehicle(uuid: string, vehicleData: VehicleDetailsDto): Promise<VehicleDetailsDto> {
    try {
        const response = await axiosInstance.put(`${API_URL}/vehicle/${uuid}`, vehicleData);
        return response.data;
    } catch (error) {
        console.error('Error updating vehicle:', error);
        throw error;
    }
}
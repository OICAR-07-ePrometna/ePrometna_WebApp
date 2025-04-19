import type { VehicleDto } from '@/dtos/vehicleDto';
import type { VehicleDetailsDto } from '@/dtos/vehicleDetailsDto';
import axiosInstance from '@/services/axios';

const API_URL = 'http://localhost:8090/api';

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

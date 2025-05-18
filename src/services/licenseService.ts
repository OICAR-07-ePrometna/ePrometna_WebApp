import axiosInstance from '@/services/axios';
import type { DriverLicenseDto } from '@/dtos/driverLicenseDto';

const API_URL = 'http://localhost:8090/api';

export async function getDriverLicense(uuid: string): Promise<DriverLicenseDto> {
    try {
        const response = await axiosInstance.get(`${API_URL}/license/${uuid}`);
        return response.data;
    } catch (error: any) {
        console.error('Error fetching driver license:', error);
        throw error;
    }
}

export async function getAllDriverLicenses(): Promise<DriverLicenseDto[]> {
    try {
        const response = await axiosInstance.get(`${API_URL}/license`);
        return response.data;
    } catch (error: any) {
        console.error('Error fetching all driver licenses:', error);
        throw error;
    }
} 
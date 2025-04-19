import type { vehicleDetials } from "@/models/vehicleDataModels";
import axiosInstance from "./axios";

const SERVICE = "vehicle"

export async function getVehicle(guid: string): Promise<vehicleDetials | undefined> {
  try {
    const rez = await axiosInstance.get(`/${SERVICE}/${guid}`)
    return rez.data
  }
  catch (error) {
    alert(error)
    return undefined
  }
}

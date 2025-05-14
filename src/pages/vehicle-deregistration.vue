<template>
    <div>
        <SearchBar 
            :label="SearchOption.vehicleVin.label" 
            :tooltip="SearchOption.vehicleVin.tooltip"
            :placeholder="SearchOption.vehicleVin.placeholder" 
            :on-click="searchVehicleByVin" 
        />
        <div v-if="vehicleData">
            <VehicleSummaryPage v-bind:data="vehicleData.summary" variant="display" />
            <VehicleOwnerSummaryPage :summary="ownerData" />
            <RegistrationLogsPage :registrationLogs="registrationLogs" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import SearchBar from '@/components/Search.vue';
import VehicleOwnerSummaryPage from '@/components/vehicleData/VehicleOwnerSummary.vue';
import VehicleSummaryPage from '@/components/vehicleData/VehicleSummary.vue';
import RegistrationLogsPage from '@/components/vehicleData/RegistrationLogs.vue';
import type { VehicleOwnerSummary, RegistrationLogs } from '@/models/vehicleDataModels';
import type { VehicleDetailsDto } from '@/dtos/vehicleDetailsDto';
import { SearchOption } from '@/constants/searchOptions';
import { getVehicleByVin } from '@/services/vehicleService';
import { useSnackbar } from '@/components/SnackbarProvider.vue';

const vehicleData = ref<VehicleDetailsDto | undefined>(undefined);
const ownerData = ref<VehicleOwnerSummary>({
    firstName: "",
    lastName: "",
    residence: "",
    licenceHolderType: "",
    registrationPlate: "",
    dateOfRegistration: "",
    oib: "",
    issuedBy: "",
    issuedDate: "",
});

const registrationLogs = ref<RegistrationLogs[]>([]);
const snackbar = useSnackbar();

async function searchVehicleByVin(vin: string) {
    try {
        const vehicle = await getVehicleByVin(vin);
        vehicleData.value = vehicle;
        
        // Update owner data
        if (vehicle.owner) {
            ownerData.value = {
                firstName: vehicle.owner.FirstName || "",
                lastName: vehicle.owner.LastName || "",
                residence: vehicle.owner.Residence || "",
                licenceHolderType: vehicle.owner.Role || "",
                registrationPlate: vehicle.registration || "",
                dateOfRegistration: new Date().toISOString().split('T')[0], // Default to current date if not available
                oib: vehicle.owner.OIB || "",
                issuedBy: "PTS", // Default value if not available
                issuedDate: new Date().toISOString().split('T')[0], // Default to current date if not available
            };
        }

        // Update registration logs
        registrationLogs.value = [{
            dateOfValidation: new Date(),
            expirationDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)), // Default to 1 year from now
            mileage: "0",
            note: ""
        }];

        snackbar.Success("Successfully found vehicle");
    } catch (error) {
        snackbar.Error("Error finding vehicle");
        console.error("Error searching vehicle by VIN:", error);
    }
}
</script>
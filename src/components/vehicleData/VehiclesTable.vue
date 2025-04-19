<template>
  <div class="vehicles-container">
    <h1>Vozila</h1>

    <div v-if="loading" class="loading">
      Loading vehicles...
    </div>

    <div v-else-if="error" class="error">
      {{ error }}
    </div>

    <div v-else-if="vehicles.length === 0" class="no-vehicles">
      Trenutno niste vlasnik ili povlašteni korisnik nijednog vozila.
    </div>

    <div v-else class="table-container">
      <table class="vehicles-table">
        <thead>
          <tr>
            <th>Registracija</th>
            <th>Marka</th>
            <th>Model</th>
            <th>Zadnja registracija</th>
            <th>Kategorija</th>
            <th>Vlasnik</th>
            <th>Dozvoljeno do</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="vehicle in vehicles" :key="vehicle.uuid" @click="viewVehicleDetails(vehicle.uuid)">
            <td aria-readonly="true">{{ vehicle.registration }}</td>
            <td>{{ vehicle.vehicleModel }}</td>
            <td>{{ vehicle.vehicleType }}</td>
            <td>{{ formatDate(vehicle.lastRegistrationDate ?? null) }}</td>
            <td>{{ vehicle.category }}</td>
            <td>{{ getOwnerName(vehicle) }}</td>
            <td>{{ formatDate(vehicle.validUntil ?? null) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getMyVehicles, getVehicleDetails } from '@/services/vehicleService';
import type { UserVehiclesDto } from '@/dtos/userVehiclesDto';
import { formatDate } from '@/utils/formatDate';

const vehicles = ref<UserVehiclesDto[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);
const router = useRouter();

function getOwnerName(vehicle: UserVehiclesDto): string {
  if (!vehicle.ownerDetails) {
    return '-';
  }

  if (vehicle.ownerDetails.firstName === null || vehicle.ownerDetails.lastName === null) {
    return '-';
  }

  const firstName = vehicle.ownerDetails.firstName || '';
  const lastName = vehicle.ownerDetails.lastName || '';

  return firstName && lastName ? `${firstName} ${lastName}` : '-';
}

async function fetchVehicles() {
  try {
    loading.value = true;
    const fetchedVehicles = await getMyVehicles();

    const userVehicles: UserVehiclesDto[] = [];

    for (const vehicle of fetchedVehicles) {
      try {
        const vehicleDetails = await getVehicleDetails(vehicle.uuid);
        userVehicles.push({
          ...vehicle,
          //Placeholderi
          lastRegistrationDate: '01-01-2025',
          category: 'B',
          validUntil: '01-01-2026',
          ownerDetails: vehicleDetails.owner
        });
      } catch (err) {
        console.error(`Error fetching details for vehicle ${vehicle.uuid}:`, err);
      }
    }

    vehicles.value = userVehicles;
  } catch (err) {
    error.value = 'Failed to load vehicles. Please try again later.';
    console.error('Error fetching vehicles:', err);
  } finally {
    loading.value = false;
  }
}

function viewVehicleDetails(uuid: string) {
  router.push(`/vehicles/${uuid}`);
}

onMounted(() => {
  fetchVehicles();
});
</script>
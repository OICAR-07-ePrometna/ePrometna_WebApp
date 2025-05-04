<template>
  <v-card title="Vozila" flat>
    <template v-slot:text>
      <v-text-field 
        v-model="search" 
        label="Pretraži po registraciji" 
        prepend-inner-icon="mdi-magnify" 
        variant="outlined" 
        hide-details
        single-line
      ></v-text-field>
    </template>

    <div v-if="loading" class="d-flex justify-center align-center pa-4">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>

    <div v-else-if="error" class="error pa-4">
      {{ error }}
    </div>

    <div v-else-if="vehicles.length === 0" class="text-center pa-4">
      Trenutno niste vlasnik ili povlašteni korisnik nijednog vozila.
    </div>

    <v-data-table
      v-else
      :headers="headers"
      :items="filteredVehicles"
      hover
    >
      <template v-slot:item="{ item }">
        <tr @click="viewVehicleDetails(item.uuid)" style="cursor: pointer">
          <td>{{ item.registration }}</td>
          <td>{{ item.model }}</td>
          <td>{{ item.vehicleType }}</td>
          <td>{{ formatDate(item.lastRegistrationDate ?? null) }}</td>
          <td>{{ item.category }}</td>
          <td>{{ getOwnerName(item) }}</td>
          <td>{{ formatDate(item.validUntil ?? null) }}</td>
        </tr>
      </template>
    </v-data-table>
  </v-card>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { getMyVehicles, getVehicleDetails } from '@/services/vehicleService';
import type { UserVehiclesDto } from '@/dtos/userVehiclesDto';
import { formatDate } from '@/utils/formatDate';

const vehicles = ref<UserVehiclesDto[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);
const search = ref('');
const router = useRouter();

const filteredVehicles = computed(() => {
  if (!search.value) return vehicles.value;
  
  const searchTerm = search.value.toLowerCase();
  return vehicles.value.filter(vehicle => 
    vehicle.registration.toLowerCase().includes(searchTerm)
  );
});

const headers = [
  { key: 'registration', title: 'Registracija' },
  { key: 'model', title: 'Marka' },
  { key: 'vehicleType', title: 'Model' },
  { key: 'lastRegistrationDate', title: 'Zadnja registracija' },
  { key: 'category', title: 'Kategorija' },
  { key: 'ownerDetails', title: 'Vlasnik' },
  { key: 'validUntil', title: 'Dozvoljeno do' }
];

function getOwnerName(vehicle: UserVehiclesDto): string {
  if (!vehicle.ownerDetails || !vehicle.ownerDetails.firstName || !vehicle.ownerDetails.lastName) {
    return '-';
  }

  const firstName = vehicle.ownerDetails.firstName || '';
  const lastName = vehicle.ownerDetails.lastName || '';

  if (firstName && lastName) {
    return `${firstName} ${lastName}`;
  }
  else {
    return '-';
  }
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
    console.log('Fetched vehicles:', userVehicles);
    vehicles.value = userVehicles;
  } catch (err) {
    error.value = 'Failed to load vehicles. Please try again later.';
    console.error('Error fetching vehicles:', err);
  } finally {
    loading.value = false;
  }
}

function viewVehicleDetails(uuid: string) {
  if (uuid) {
    router.push(`/vehicles/${uuid}`);
  } else {
    console.error('No UUID provided for vehicle details');
  }
}

onMounted(() => {
  fetchVehicles();
});
</script>
<template>
  <div>
    <div v-if="loading" class="loading">
      <v-progress-circular indeterminate></v-progress-circular>
      <span>Loading vehicle data...</span>
    </div>

    <div v-else-if="error" class="error">
      {{ error }}
    </div>

    <div v-else>
      <h2>Podaci o vozilu</h2>
      <v-container>
        <v-row>
          <!-- First Big Column -->
          <v-col cols="12" md="6">
            <!-- Single Fields -->
            <v-tooltip location="top">
              <template v-slot:activator="{ props }">
                <v-text-field v-bind="props" :variant="type.vehicleCategory ? 'filled' : 'outlined'" density="compact" class="mb-2"
                  v-model="summary.vehicleCategory" :readonly="type?.vehicleCategory">
                  <template #prepend-inner>
                    <span>J:</span>
                  </template>
                </v-text-field>
              </template>
              <span>Kategorija vozila</span>
            </v-tooltip>
            <v-tooltip location="top">
              <template v-slot:activator="{ props }">
                <v-text-field v-bind="props" :variant="type.mark ? 'filled' : 'outlined'" density="compact" class="mb-2"
                  v-model="summary.mark" :readonly="type?.mark">
                  <template #prepend-inner>
                    <span>D.1:</span>
                  </template>
                </v-text-field>
              </template>
              <span>Marka</span>
            </v-tooltip>
            <v-tooltip location="top">
              <template v-slot:activator="{ props }">
                <v-text-field v-bind="props" :variant="type.homologationType ? 'filled' : 'outlined'" density="compact" class="mb-2"
                  v-model="summary.homologationType" :readonly="type?.homologationType">
                  <template #prepend-inner>
                    <span>D.2:</span>
                  </template>
                </v-text-field>
              </template>
              <span>Homologacijski tip</span>
            </v-tooltip>
            <v-tooltip location="top">
              <template v-slot:activator="{ props }">
                <v-text-field v-bind="props" :variant="type.tradeName ? 'filled' : 'outlined'" density="compact" class="mb-2"
                  v-model="summary.tradeName" :readonly="type?.tradeName">
                  <template #prepend-inner>
                    <span>D.3:</span>
                  </template>
                </v-text-field>
              </template>
              <span>Trgovački naziv</span>
            </v-tooltip>
            <v-tooltip location="top">
              <template v-slot:activator="{ props }">
                <v-text-field v-bind="props" :variant="type.chassisNumber ? 'filled' : 'outlined'" density="compact" class="mb-2"
                  v-model="summary.chassisNumber" :readonly="type?.chassisNumber">
                  <template #prepend-inner>
                    <span>E:</span>
                  </template>
                </v-text-field>
              </template>
              <span>Broj šasije</span>
            </v-tooltip>
            <v-tooltip location="top">
              <template v-slot:activator="{ props }">
                <v-text-field v-bind="props" :variant="type.bodyShape ? 'filled' : 'outlined'" density="compact" class="mb-2"
                  v-model="summary.bodyShape" :readonly="type?.bodyShape">
                  <template #prepend-inner>
                    <span>(2):</span>
                  </template>
                </v-text-field>
              </template>
              <span>Oblik karoserije</span>
            </v-tooltip>
            <v-tooltip location="top">
              <template v-slot:activator="{ props }">
                <v-text-field v-bind="props" :variant="type.vehicleUse ? 'filled' : 'outlined'" density="compact" class="mb-2"
                  v-model="summary.vehicleUse" :readonly="type?.vehicleUse">
                  <template #prepend-inner>
                    <span>(3):</span>
                  </template>
                </v-text-field>
              </template>
              <span>Namjena vozila</span>
            </v-tooltip>

            <!-- Paired Fields -->
            <v-row>
              <v-col cols="6">
                <v-tooltip location="top">
                  <template v-slot:activator="{ props }">
                    <v-text-field v-bind="props" :variant="type.dateFirstRegistration ? 'filled' : 'outlined'" density="compact"
                      class="mb-2" v-model="summary.dateFirstRegistration" :readonly="type?.dateFirstRegistration">
                      <template #prepend-inner>
                        <span>B:</span>
                      </template>
                    </v-text-field>
                  </template>
                  <span>Datum prve registracije</span>
                </v-tooltip>
              </v-col>
              <v-col cols="6">
                <v-tooltip location="top">
                  <template v-slot:activator="{ props }">
                    <v-text-field v-bind="props" :variant="type.firstRegistrationInCroatia ? 'filled' : 'outlined'" density="compact"
                      class="mb-2" v-model="summary.firstRegistrationInCroatia"
                      :readonly="type?.firstRegistrationInCroatia">
                      <template #prepend-inner>
                        <span>(4):</span>
                      </template>
                    </v-text-field>
                  </template>
                  <span>Prva registracija u Hrvatskoj</span>
                </v-tooltip>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <v-tooltip location="top">
                  <template v-slot:activator="{ props }">
                    <v-text-field v-bind="props" :variant="type.technicallyPermissibleMaximumLadenMass ? 'filled' : 'outlined'"
                      density="compact" class="mb-2" v-model="summary.technicallyPermissibleMaximumLadenMass"
                      :readonly="type?.technicallyPermissibleMaximumLadenMass">
                      <template #prepend-inner>
                        <span>F.1:</span>
                      </template>
                    </v-text-field>
                  </template>
                  <span>Tehnički dopuštena najveća masa</span>
                </v-tooltip>
              </v-col>
              <v-col cols="6">
                <v-tooltip location="top">
                  <template v-slot:activator="{ props }">
                    <v-text-field v-bind="props" :variant="type.permissibleMaximumLadenMass ? 'filled' : 'outlined'" density="compact"
                      class="mb-2" v-model="summary.permissibleMaximumLadenMass"
                      :readonly="type?.permissibleMaximumLadenMass">
                      <template #prepend-inner>
                        <span>F.2:</span>
                      </template>
                    </v-text-field>
                  </template>
                  <span>Dopuštena najveća masa</span>
                </v-tooltip>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <v-tooltip location="top">
                  <template v-slot:activator="{ props }">
                    <v-text-field v-bind="props" :variant="type.unladenMass ? 'filled' : 'outlined'" density="compact" class="mb-2"
                      v-model="summary.unladenMass" :readonly="type?.unladenMass">
                      <template #prepend-inner>
                        <span>G:</span>
                      </template>
                    </v-text-field>
                  </template>
                  <span>Masa praznog vozila</span>
                </v-tooltip>
              </v-col>
              <v-col cols="6">
                <v-tooltip location="top">
                  <template v-slot:activator="{ props }">
                    <v-text-field v-bind="props" :variant="type.permissiblePayload ? 'filled' : 'outlined'" density="compact" class="mb-2"
                      v-model="summary.permissiblePayload" :readonly="type?.permissiblePayload">
                      <template #prepend-inner>
                        <span>(5):</span>
                      </template>
                    </v-text-field>
                  </template>
                  <span>Dopuštena nosivost</span>
                </v-tooltip>
              </v-col>
            </v-row>

            <!-- Back to Single Fields -->
            <v-tooltip location="top">
              <template v-slot:activator="{ props }">
                <v-text-field v-bind="props" :variant="type.typeApprovalNumber ? 'filled' : 'outlined'" density="compact" class="mb-2"
                  v-model="summary.typeApprovalNumber" :readonly="type?.typeApprovalNumber">
                  <template #prepend-inner>
                    <span>K:</span>
                  </template>
                </v-text-field>
              </template>
              <span>Broj homologacije</span>
            </v-tooltip>

            <!-- More Paired Fields -->
            <v-row>
              <v-col cols="6">
                <v-tooltip location="top">
                  <template v-slot:activator="{ props }">
                    <v-text-field v-bind="props" :variant="type.engineCapacity ? 'filled' : 'outlined'" density="compact" class="mb-2"
                      v-model="summary.engineCapacity" :readonly="type?.engineCapacity">
                      <template #prepend-inner>
                        <span>P.1:</span>
                      </template>
                    </v-text-field>
                  </template>
                  <span>Obujam motora</span>
                </v-tooltip>
              </v-col>
              <v-col cols="6">
                <v-tooltip location="top">
                  <template v-slot:activator="{ props }">
                    <v-text-field v-bind="props" :variant="type.enginePower ? 'filled' : 'outlined'" density="compact" class="mb-2"
                      v-model="summary.enginePower" :readonly="type?.enginePower">
                      <template #prepend-inner>
                        <span>P.2:</span>
                      </template>
                    </v-text-field>
                  </template>
                  <span>Snaga motora</span>
                </v-tooltip>
              </v-col>
            </v-row>
            <v-tooltip location="top">
              <template v-slot:activator="{ props }">
                <v-text-field v-bind="props" :variant="type.fuelOrPowerSource ? 'filled' : 'outlined'" density="compact" class="mb-2"
                  v-model="summary.fuelOrPowerSource" :readonly="type?.fuelOrPowerSource">
                  <template #prepend-inner>
                    <span>P.3:</span>
                  </template>
                </v-text-field>
              </template>
              <span>Gorivo ili izvor energije</span>
            </v-tooltip>
            <v-row>
              <v-col cols="6">
                <v-tooltip location="top">
                  <template v-slot:activator="{ props }">
                    <v-text-field v-bind="props" :variant="type.ratedEngineSpeed ? 'filled' : 'outlined'" density="compact" class="mb-2"
                      v-model="summary.ratedEngineSpeed" :readonly="type?.ratedEngineSpeed">
                      <template #prepend-inner>
                        <span>P.4:</span>
                      </template>
                    </v-text-field>
                  </template>
                  <span>Nazivni broj okretaja motora</span>
                </v-tooltip>
              </v-col>
              <v-col cols="6">
                <v-tooltip location="top">
                  <template v-slot:activator="{ props }">
                    <v-text-field v-bind="props" :variant="type.numberOfSeats ? 'filled' : 'outlined'" density="compact" class="mb-2"
                      v-model="summary.numberOfSeats" :readonly="type?.numberOfSeats">
                      <template #prepend-inner>
                        <span>S.1:</span>
                      </template>
                    </v-text-field>
                  </template>
                  <span>Broj sjedala</span>
                </v-tooltip>
              </v-col>
            </v-row>
            <v-tooltip location="top">
              <template v-slot:activator="{ props }">
                <v-text-field v-bind="props" :variant="type.colourOfVehicle ? 'filled' : 'outlined'" density="compact" class="mb-2"
                  v-model="summary.colourOfVehicle" :readonly="type?.colourOfVehicle">
                  <template #prepend-inner>
                    <span>R:</span>
                  </template>
                </v-text-field>
              </template>
              <span>Boja vozila</span>
            </v-tooltip>
            <v-row>
              <v-col cols="6">
                <v-tooltip location="top">
                  <template v-slot:activator="{ props }">
                    <v-text-field v-bind="props" :variant="type.length ? 'filled' : 'outlined'" density="compact" class="mb-2"
                      v-model="summary.length" :readonly="type?.length">
                      <template #prepend-inner>
                        <span>(6):</span>
                      </template>
                    </v-text-field>
                  </template>
                  <span>Dužina</span>
                </v-tooltip>
              </v-col>
              <v-col cols="6">
                <v-tooltip location="top">
                  <template v-slot:activator="{ props }">
                    <v-text-field v-bind="props" :variant="type.width ? 'filled' : 'outlined'" density="compact" class="mb-2"
                      v-model="summary.width" :readonly="type?.width">
                      <template #prepend-inner>
                        <span>(7):</span>
                      </template>
                    </v-text-field>
                  </template>
                  <span>Širina</span>
                </v-tooltip>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <v-tooltip location="top">
                  <template v-slot:activator="{ props }">
                    <v-text-field v-bind="props" :variant="type.height ? 'filled' : 'outlined'" density="compact" class="mb-2"
                      v-model="summary.height" :readonly="type?.height">
                      <template #prepend-inner>
                        <span>(8):</span>
                      </template>
                    </v-text-field>
                  </template>
                  <span>Visina</span>
                </v-tooltip>
              </v-col>
              <v-col cols="6">
                <v-tooltip location="top">
                  <template v-slot:activator="{ props }">
                    <v-text-field v-bind="props" :variant="type.maximumNetPower ? 'filled' : 'outlined'" density="compact" class="mb-2"
                      v-model="summary.maximumNetPower" :readonly="type?.maximumNetPower">
                      <template #prepend-inner>
                        <span>T:</span>
                      </template>
                    </v-text-field>
                  </template>
                  <span>Najveća neto snaga</span>
                </v-tooltip>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <v-tooltip location="top">
                  <template v-slot:activator="{ props }">
                    <v-text-field v-bind="props" :variant="type.numberOfAxles ? 'filled' : 'outlined'" density="compact" class="mb-2"
                      v-model="summary.numberOfAxles" :readonly="type?.numberOfAxles">
                      <template #prepend-inner>
                        <span>L:</span>
                      </template>
                    </v-text-field>
                  </template>
                  <span>Broj osovina</span>
                </v-tooltip>
              </v-col>
              <v-col cols="6">
                <v-tooltip location="top">
                  <template v-slot:activator="{ props }">
                    <v-text-field v-bind="props" :variant="type.numberOfDrivenAxles ? 'filled' : 'outlined'" density="compact" class="mb-2"
                      v-model="summary.numberOfDrivenAxles" :readonly="type?.numberOfDrivenAxles">
                      <template #prepend-inner>
                        <span>(9):</span>
                      </template>
                    </v-text-field>
                  </template>
                  <span>Broj pogonskih osovina</span>
                </v-tooltip>
              </v-col>
            </v-row>
            <v-tooltip location="top">
              <template v-slot:activator="{ props }">
                <v-text-field v-bind="props" :variant="type.mb ? 'filled' : 'outlined'" density="compact" class="mb-2" v-model="summary.mb"
                  :readonly="type?.mb">
                  <template #prepend-inner>
                    <span>(13):</span>
                  </template>
                </v-text-field>
              </template>
              <span>MB (proizvođač)</span>
            </v-tooltip>
          </v-col>

          <!-- Second Big Column -->
          <v-col cols="12" md="6">
            <v-tooltip location="top">
              <template v-slot:activator="{ props }">
                <v-text-field v-bind="props" :variant="type.stationaryNoiseLevel ? 'filled' : 'outlined'" density="compact" class="mb-2"
                  v-model="summary.stationaryNoiseLevel" :readonly="type?.stationaryNoiseLevel">
                  <template #prepend-inner>
                    <span>U.1:</span>
                  </template>
                </v-text-field>
              </template>
              <span>Razina buke u stacionarnom stanju</span>
            </v-tooltip>
            <v-tooltip location="top">
              <template v-slot:activator="{ props }">
                <v-text-field v-bind="props" :variant="type.engineSpeedForStationaryNoiseTest ? 'filled' : 'outlined'" density="compact"
                  class="mb-2" v-model="summary.engineSpeedForStationaryNoiseTest"
                  :readonly="type?.engineSpeedForStationaryNoiseTest">
                  <template #prepend-inner>
                    <span>U.2:</span>
                  </template>
                </v-text-field>
              </template>
              <span>Broj okretaja motora pri ispitivanju buke u stacionarnom stanju</span>
            </v-tooltip>
            <v-tooltip location="top">
              <template v-slot:activator="{ props }">
                <v-text-field v-bind="props" :variant="type.co2Emissions ? 'filled' : 'outlined'" density="compact" class="mb-2"
                  v-model="summary.co2Emissions" :readonly="type?.co2Emissions">
                  <template #prepend-inner>
                    <span>V.7:</span>
                  </template>
                </v-text-field>
              </template>
              <span>Emisija CO2</span>
            </v-tooltip>
            <v-tooltip location="top">
              <template v-slot:activator="{ props }">
                <v-text-field v-bind="props" :variant="type.ecCategory ? 'filled' : 'outlined'" density="compact" class="mb-2"
                  v-model="summary.ecCategory" :readonly="type?.ecCategory">
                  <template #prepend-inner>
                    <span>V.9:</span>
                  </template>
                </v-text-field>
              </template>
              <span>EC kategorija</span>
            </v-tooltip>
            <v-tooltip location="top">
              <template v-slot:activator="{ props }">
                <v-text-field v-bind="props" :variant="type.tireSize ? 'filled' : 'outlined'" density="compact" class="mb-2"
                  v-model="summary.tireSize" :readonly="type?.tireSize">
                  <template #prepend-inner>
                    <span>(11):</span>
                  </template>
                </v-text-field>
              </template>
              <span>Dimenzije guma</span>
            </v-tooltip>
            <v-tooltip location="top">
              <template v-slot:activator="{ props }">
                <v-text-field v-bind="props" :variant="type.uniqueModelCode ? 'filled' : 'outlined'" density="compact" class="mb-2"
                  v-model="summary.uniqueModelCode" :readonly="type?.uniqueModelCode">
                  <template #prepend-inner>
                    <span>(12):</span>
                  </template>
                </v-text-field>
              </template>
              <span>Jedinstvena oznaka modela</span>
            </v-tooltip>
            <v-tooltip location="top">
              <template v-slot:activator="{ props }">
                <v-text-field v-bind="props" :variant="type.model ? 'filled' : 'outlined'" density="compact" class="mb-2"
                  v-model="summary.model" :readonly="type?.model">
                  <template #prepend-inner>
                    <span>(14):</span>
                  </template>
                </v-text-field>
              </template>
              <span>Model</span>
            </v-tooltip>
            <v-tooltip location="top">
              <template v-slot:activator="{ props }">
                <v-text-field v-bind="props" :variant="type.additionalTireSizes ? 'filled' : 'outlined'" density="compact" class="mb-2"
                  v-model="summary.additionalTireSizes" :readonly="type?.additionalTireSizes">
                  <template #prepend-inner>
                    <span>(15):</span>
                  </template>
                </v-text-field>
              </template>
              <span>Dodatne dimenzije guma</span>
            </v-tooltip>
            <v-tooltip location="top">
              <template v-slot:activator="{ props }">
                <v-text-field v-bind="props" :variant="type.vehicleType ? 'filled' : 'outlined'" density="compact" class="mb-2"
                  v-model="summary.vehicleType" :readonly="type?.vehicleType">
                  <template #prepend-inner>
                    <span>(16):</span>
                  </template>
                </v-text-field>
              </template>
              <span>Tip vozila</span>
            </v-tooltip>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { getVehicleDetails } from '@/services/vehicleService';
import type { VehicleDetailsDto } from '@/dtos/vehicleDetailsDto';
import type { VehicleSummary } from '@/models/vehicleDataModels';
import { display, edit, create } from '@/models/summeryType';
import { formatDate } from '@/utils/formatDate';

const props = defineProps({
  data: {
    type: Object as () => VehicleSummary,
    required: false,
  },
  variant: {
    type: String as () => "display" | "edit" | "create",
    default: "display",
  },
  uuid: {
    type: String,
    required: false,
  }
});

const emit = defineEmits<{
  'update:data': [value: VehicleSummary]
}>();
const route = useRoute();
const vehicleUuid = computed(() => props.uuid || (route.params.uuid as string));
const loading = ref(true);
const error = ref<string | null>(null);
const vehicle = ref<VehicleDetailsDto>({} as VehicleDetailsDto);

const type = computed(() => {
  switch (props.variant) {
    case "display":
      return display
    case "edit":
      return edit
    case "create":
      return create
    default:
      return display
  }
})

const summary = ref<VehicleSummary>(props.data || {} as VehicleSummary);

watch(summary, () => {
  emit("update:data", summary.value);
}, { deep: true });

function mapVehicleSummaryToFields(vehicleData: VehicleDetailsDto) {
  if (!vehicleData.summary) return;

  const vehicleSummary = vehicleData.summary;

  summary.value = {
    ...vehicleSummary,
    dateFirstRegistration: formatDate(vehicleSummary.dateFirstRegistration),
    firstRegistrationInCroatia: formatDate(vehicleSummary.firstRegistrationInCroatia),
  };
}

async function fetchVehicleDetails() {
  if (!vehicleUuid.value) {
    loading.value = false;
    return;
  }

  try {
    loading.value = true;
    vehicle.value = await getVehicleDetails(vehicleUuid.value);
    console.log('Vehicle details:', vehicle.value);

    mapVehicleSummaryToFields(vehicle.value);
  } catch (err) {
    error.value = 'Failed to load vehicle details. Please try again later.';
    console.error('Error fetching vehicle details:', err);
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  if (props.data) {
    summary.value = props.data;
    loading.value = false;
  } else {
    fetchVehicleDetails();
  }
});

</script>

<style scoped>
.v-text-field {
  max-height: 40px;
  white-space: nowrap;
}

.v-text-field :deep(.v-field__prepend-inner) {
  align-items: center;
  padding-right: 8px;
}

.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 300px;
  gap: 16px;
}

.error {
  padding: 16px;
  background-color: #ffebee;
  color: #c62828;
  border-radius: 4px;
  margin: 16px 0;
}
</style>
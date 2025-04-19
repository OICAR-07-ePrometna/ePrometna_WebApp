<template>
  <div>
    <h2>Podaci o vozilu</h2>
    <v-container>
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field variant="outlined" density="compact" class="mb-2" v-model="summary.vehicleCategory"
            :readonly="type?.vehicleCategory">
            <template #prepend-inner>
              <span>J:</span>
            </template>
          </v-text-field>
          <v-text-field variant="outlined" density="compact" class="mb-2" v-model="summary.mark" :readonly="type?.mark">
            <template #prepend-inner>
              <span>D.1:</span>
            </template>
          </v-text-field>
          <v-text-field variant="outlined" density="compact" class="mb-2" v-model="summary.homologationType"
            :readonly="type?.homologationType">
            <template #prepend-inner>
              <span>D.2:</span>
            </template>
          </v-text-field>
          <v-text-field variant="outlined" density="compact" class="mb-2" v-model="summary.tradeName"
            :readonly="type?.tradeName">
            <template #prepend-inner>
              <span>D.3:</span>
            </template>
          </v-text-field>
          <v-text-field variant="outlined" density="compact" class="mb-2" v-model="summary.chassisNumber"
            :readonly="type?.chassisNumber">
            <template #prepend-inner>
              <span>E:</span>
            </template>
          </v-text-field>
          <v-text-field variant="outlined" density="compact" class="mb-2" v-model="summary.bodyShape"
            :readonly="type?.bodyShape">
            <template #prepend-inner>
              <span>(2):</span>
            </template>
          </v-text-field>
          <v-text-field variant="outlined" density="compact" class="mb-2" v-model="summary.vehicleUse"
            :readonly="type?.vehicleUse">
            <template #prepend-inner>
              <span>(3):</span>
            </template>
          </v-text-field>

          <v-row>
            <v-col cols="6">
              <v-text-field variant="outlined" density="compact" class="mb-2" v-model="summary.dateFirstRegistration"
                :readonly="type?.dateFirstRegistration">
                <template #prepend-inner>
                  <span>B:</span>
                </template>
              </v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field variant="outlined" density="compact" class="mb-2"
                v-model="summary.firstRegistrationInCroatia" :readonly="type?.firstRegistrationInCroatia">
                <template #prepend-inner>
                  <span>(4):</span>
                </template>
              </v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <v-text-field variant="outlined" density="compact" class="mb-2"
                v-model="summary.technicallyPermissibleMaximumLadenMass"
                :readonly="type?.technicallyPermissibleMaximumLadenMass">
                <template #prepend-inner>
                  <span>F.1:</span>
                </template>
              </v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field variant="outlined" density="compact" class="mb-2"
                v-model="summary.permissibleMaximumLadenMass" :readonly="type?.permissibleMaximumLadenMass">
                <template #prepend-inner>
                  <span>F.2:</span>
                </template>
              </v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <v-text-field variant="outlined" density="compact" class="mb-2" v-model="summary.unladenMass"
                :readonly="type?.unladenMass">
                <template #prepend-inner>
                  <span>G:</span>
                </template>
              </v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field variant="outlined" density="compact" class="mb-2" v-model="summary.permissiblePayload"
                :readonly="type?.permissiblePayload">
                <template #prepend-inner>
                  <span>(5):</span>
                </template>
              </v-text-field>
            </v-col>
          </v-row>

          <v-text-field variant="outlined" density="compact" class="mb-2" v-model="summary.typeApprovalNumber"
            :readonly="type?.typeApprovalNumber">
            <template #prepend-inner>
              <span>K:</span>
            </template>
          </v-text-field>

          <v-row>
            <v-col cols="6">
              <v-text-field variant="outlined" density="compact" class="mb-2" v-model="summary.engineCapacity"
                :readonly="type?.engineCapacity">
                <template #prepend-inner>
                  <span>P.1:</span>
                </template>
              </v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field variant="outlined" density="compact" class="mb-2" v-model="summary.enginePower"
                :readonly="type?.enginePower">
                <template #prepend-inner>
                  <span>P.2:</span>
                </template>
              </v-text-field>
            </v-col>
          </v-row>
          <v-text-field variant="outlined" density="compact" class="mb-2" v-model="summary.fuelOrPowerSource"
            :readonly="type?.fuelOrPowerSource">
            <template #prepend-inner>
              <span>P.3:</span>
            </template>
          </v-text-field>
          <v-row>
            <v-col cols="6">
              <v-text-field variant="outlined" density="compact" class="mb-2" v-model="summary.ratedEngineSpeed"
                :readonly="type?.ratedEngineSpeed">
                <template #prepend-inner>
                  <span>P.4:</span>
                </template>
              </v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field variant="outlined" density="compact" class="mb-2" v-model="summary.numberOfSeats"
                :readonly="type?.numberOfSeats">
                <template #prepend-inner>
                  <span>S.1:</span>
                </template>
              </v-text-field>
            </v-col>
          </v-row>
          <v-text-field variant="outlined" density="compact" class="mb-2" v-model="summary.colourOfVehicle"
            :readonly="type?.colourOfVehicle">
            <template #prepend-inner>
              <span>R:</span>
            </template>
          </v-text-field>
          <v-row>
            <v-col cols="6">
              <v-text-field variant="outlined" density="compact" class="mb-2" v-model="summary.length"
                :readonly="type?.length">
                <template #prepend-inner>
                  <span>(6):</span>
                </template>
              </v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field variant="outlined" density="compact" class="mb-2" v-model="summary.width"
                :readonly="type?.width">
                <template #prepend-inner>
                  <span>(7):</span>
                </template>
              </v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <v-text-field variant="outlined" density="compact" class="mb-2" v-model="summary.height"
                :readonly="type?.height">
                <template #prepend-inner>
                  <span>(8):</span>
                </template>
              </v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field variant="outlined" density="compact" class="mb-2" v-model="summary.maximumNetPower"
                :readonly="type?.maximumNetPower">
                <template #prepend-inner>
                  <span>T:</span>
                </template>
              </v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <v-text-field variant="outlined" density="compact" class="mb-2" v-model="summary.numberOfAxles"
                :readonly="type?.numberOfAxles">
                <template #prepend-inner>
                  <span>L:</span>
                </template>
              </v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field variant="outlined" density="compact" class="mb-2" v-model="summary.numberOfDrivenAxles"
                :readonly="type?.numberOfDrivenAxles">
                <template #prepend-inner>
                  <span>(9):</span>
                </template>
              </v-text-field>
            </v-col>
          </v-row>
          <v-text-field variant="outlined" density="compact" class="mb-2" v-model="summary.mb" :readonly="type?.mb">
            <template #prepend-inner>
              <span>(13):</span>
            </template>
          </v-text-field>
        </v-col>

        <v-col cols="12" md="6">
          <v-text-field variant="outlined" density="compact" class="mb-2" v-model="summary.stationaryNoiseLevel"
            :readonly="type?.stationaryNoiseLevel">
            <template #prepend-inner>
              <span>U.1:</span>
            </template>
          </v-text-field>
          <v-text-field variant="outlined" density="compact" class="mb-2"
            v-model="summary.engineSpeedForStationaryNoiseTest" :readonly="type?.engineSpeedForStationaryNoiseTest">
            <template #prepend-inner>
              <span>U.2:</span>
            </template>
          </v-text-field>
          <v-text-field variant="outlined" density="compact" class="mb-2" v-model="summary.co2Emissions"
            :readonly="type?.co2Emissions">
            <template #prepend-inner>
              <span>V.7:</span>
            </template>
          </v-text-field>
          <v-text-field variant="outlined" density="compact" class="mb-2" v-model="summary.ecCategory"
            :readonly="type?.ecCategory">
            <template #prepend-inner>
              <span>V.9:</span>
            </template>
          </v-text-field>
          <v-text-field variant="outlined" density="compact" class="mb-2" v-model="summary.tireSize"
            :readonly="type?.tireSize">
            <template #prepend-inner>
              <span>(11):</span>
            </template>
          </v-text-field>
          <v-text-field variant="outlined" density="compact" class="mb-2" v-model="summary.uniqueModelCode"
            :readonly="type?.uniqueModelCode">
            <template #prepend-inner>
              <span>(12):</span>
            </template>
          </v-text-field>
          <v-text-field variant="outlined" density="compact" class="mb-2" v-model="summary.model"
            :readonly="type?.model">
            <template #prepend-inner>
              <span>(14):</span>
            </template>
          </v-text-field>
          <v-text-field variant="outlined" density="compact" class="mb-2" v-model="summary.additionalTireSizes"
            :readonly="type?.additionalTireSizes">
            <template #prepend-inner>
              <span>(15):</span>
            </template>
          </v-text-field>
          <v-text-field variant="outlined" density="compact" class="mb-2" v-model="summary.vehicleType"
            :readonly="type?.vehicleType">
            <template #prepend-inner>
              <span>(16):</span>
            </template>
          </v-text-field>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { display, edit, create } from '@/models/summeryType';
import type { VehicleSummary } from '@/models/vehicleDataModels';
const props = defineProps({
  data: {
    type: Object as () => VehicleSummary,
    required: true,
  },
  variant: {
    type: String as () => "display" | "edit" | "create",
    default: "display",
  },
})

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

const summary = ref(props.data)
const emit = defineEmits(["update:data"])

watch([summary], () => {
  emit("update:data", summary.value)
}, { deep: true }) // Added deep watch for nested object changes if necessary

</script>

<style scoped>
.v-text-field {
  max-height: 40px;
  /* Consider if density="compact" already handles this */
  white-space: nowrap;
  /* Ensure text doesn't wrap */
}

/* Optional: Style for better alignment */
.v-text-field :deep(.v-field__prepend-inner) {
  align-items: center;
  padding-right: 8px;
}
</style>

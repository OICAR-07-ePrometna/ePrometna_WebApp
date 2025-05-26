<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <h3>Detalji registracije</h3>
            </v-col>
            <v-col cols="12" md="6">
                <v-text-field
                    v-model="registrationData.registration"
                    label="Registracijska oznaka"
                    :rules="[
                        v => !!v || 'Registracijska oznaka je obavezna',
                        v => /^(ZG|ST|RI|OS|ZD|SB|PU|VK|VŽ|ŠI|DU|KA|ČK|BJ|GS|KŽ|KT|OG|PO|SK|VT|VU|BM|DA|DE|DJ|IM|KC|KR|MA|NA|NG)-\d{3,4}-[A-PR-V-ZČĆĐŠŽ]{1,2}$/.test(v) || 'Neispravan format registracijske oznake'
                    ]"
                    required
                ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
                <v-text-field
                    v-model.number="registrationData.traveledDistance"
                    label="Prijeđena kilometraža"
                    type="number"
                    :rules="[
                        v => !!v || 'Kilometraža je obavezna',
                        v => v >= 0 || 'Kilometraža mora biti pozitivan broj'
                    ]"
                    required
                ></v-text-field>
            </v-col>
            <v-col cols="12">
                <v-textarea
                    v-model="registrationData.note"
                    label="Napomena"
                    rows="3"
                ></v-textarea>
            </v-col>
            <v-col cols="12">
                <v-checkbox
                    v-model="registrationData.passTechnical"
                    label="Vozilo je prošlo tehnički pregled"
                    color="primary"
                ></v-checkbox>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';

interface RegistrationData {
    note: string;
    passTechnical: boolean;
    registration: string;
    traveledDistance: number;
}

const props = defineProps<{
    initialData?: Partial<RegistrationData>;
}>();

const emit = defineEmits<{
    'update:data': [value: RegistrationData];
}>();

const registrationData = ref<RegistrationData>({
    note: props.initialData?.note || '',
    passTechnical: props.initialData?.passTechnical ?? false,
    registration: props.initialData?.registration || '',
    traveledDistance: props.initialData?.traveledDistance || 0
});

watch(registrationData, (newValue) => {
    emit('update:data', newValue);
}, { deep: true });
</script> 
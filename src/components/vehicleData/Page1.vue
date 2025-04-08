<template>
    <div>
      <v-container>
        <v-row>
          <!-- C.1.1., C.1.2., C.1.3, C.4 -->
          <v-col cols="12" md="4">
            <v-text-field
              variant="underlined"
              density="compact"
              class="mb-2"
              :value="fieldMap['C.1.1']"
              readonly
            >
              <template #prepend-inner>
                <span>C.1.1:</span>
              </template>
            </v-text-field>
            
            <v-text-field
              variant="underlined"
              density="compact"
              class="mb-2"
              :value="fieldMap['C.1.2']"
              readonly
            >
              <template #prepend-inner>
                <span>C.1.2:</span>
              </template>
            </v-text-field>
            
            <v-text-field
              variant="underlined"
              density="compact"
              class="mb-2"
              :value="fieldMap['C.1.3']"
              readonly
            >
              <template #prepend-inner>
                <span>C.1.3:</span>
              </template>
            </v-text-field>
            
            <v-text-field
              variant="underlined"
              density="compact"
              :value="fieldMap['C.4']"
              readonly
            >
              <template #prepend-inner>
                <span>C.4:</span>
              </template>
            </v-text-field>
          </v-col>
          
          <!-- A, I, (1) -->
          <v-col cols="12" md="4">
            <v-text-field
              variant="outlined"
              density="compact"
              class="mb-2"
              v-model="fieldMap['A']"
            >
              <template #prepend-inner>
                <span>A:</span>
              </template>
            </v-text-field>
            
            <v-text-field
              variant="underlined"
              density="compact"
              class="mb-2"
              :value="fieldMap['I']"
              readonly
            >
              <template #prepend-inner>
                <span>I:</span>
              </template>
            </v-text-field>
            
            <v-text-field
              variant="underlined"
              density="compact"
              :value="fieldMap['(1)']"
              readonly
            >
              <template #prepend-inner>
                <span>(1):</span>
              </template>
            </v-text-field>
          </v-col>
          
          <!-- Dozvolu izdao, Dana -->
          <v-col cols="12" md="4">
            <v-text-field
              variant="outlined"
              density="compact"
              class="mb-2"
              v-model="fieldMap['Dozvolu izdao']"
            >
              <template #prepend-inner>
                <span>Dozvolu izdao:</span>
              </template>
            </v-text-field>
            
            <v-text-field
              variant="underlined"
              density="compact"
              :value="fieldMap['Dana']"
              readonly
            >
              <template #prepend-inner>
                <span>Dana:</span>
              </template>
            </v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <v-divider thickness="2" class="my-2"></v-divider>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const currentDate = ref(new Date().toLocaleDateString());
// TODO: implement regex '^(?:[A-Z]{2})(?:[\s-])(?:(?:\d{1,4}[A-Z]{0,2})|(?:[A-Z]{1,2}\d{1,4}))$'
const fieldMap = ref({
  "C.1.1": "IVO",
  "C.1.2": "IVIC",
  "C.1.3": "ADRESA 12, ZAGREB",
  "C.4": "A-VLASNIK",
  "A": "ZG-0000-AA",
  "I": currentDate.value,
  "(1)": "12345678901",
  "Dozvolu izdao": "PTS H840 ZG",
  "Dana": currentDate.value,
});
</script>

<style scoped>
.v-text-field {
    max-height: 30px;
    white-space: nowrap;
}
</style>
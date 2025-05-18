<template>
  <v-card title="Police Officers" flat>
    <template v-slot:text>
      <v-text-field 
        v-model="search" 
        label="Search" 
        prepend-inner-icon="mdi-magnify" 
        variant="outlined" 
        hide-details
        single-line
      ></v-text-field>
    </template>

    <div v-if="loading" class="d-flex justify-center align-center pa-4">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>

    <div v-else-if="officers.length === 0" class="text-center pa-4">
      No police officers found.
    </div>

    <v-data-table
      v-else
      :headers="headers"
      :items="officers"
      :search="search"
      hover
    >
      <template v-slot:item="{ item }">
        <tr @click="viewDetails(item)" style="cursor: pointer">
          <td>{{ item.firstName }} {{ item.lastName }}</td>
          <td>{{ item.oib }}</td>
          <td>{{ item.email }}</td>
          <td>{{ item.residence }}</td>
          <td style="width: 180px; min-width: 180px; max-width: 180px;">
            <div class="token-wrapper">
              <div class="token-content">
                <span v-if="item.policeToken && visibleTokens[item.uuid]" class="token-field">
                  {{ item.policeToken }}
                </span>
                <span v-else-if="item.policeToken" class="text-grey token-placeholder">
                  ••••••••
                </span>
                <span v-else class="text-grey">
                  No token
                </span>
              </div>
              <div class="token-actions d-flex">
                <v-btn
                  v-if="item.policeToken"
                  :icon="visibleTokens[item.uuid] ? 'mdi-eye-off' : 'mdi-eye'"
                  density="compact"
                  size="x-small"
                  variant="text"
                  @click.stop="toggleTokenVisibility(item.uuid)"
                  :title="visibleTokens[item.uuid] ? 'Hide Token' : 'Show Token'"
                ></v-btn>
                <v-btn
                  v-if="!item.policeToken"
                  icon="mdi-plus"
                  color="primary"
                  density="compact"
                  size="x-small"
                  :loading="generatingTokenFor === item.uuid"
                  @click.stop="generateToken(item)"
                  title="Generate Token"
                ></v-btn>
              </div>
            </div>
          </td>
        </tr>
      </template>
    </v-data-table>

    <!-- Officer Details Dialog -->
    <v-dialog
      v-model="detailsDialog.show"
      max-width="600px"
    >
      <v-card v-if="detailsDialog.officer">
        <v-card-title class="text-h5">
          {{ detailsDialog.officer.firstName }} {{ detailsDialog.officer.lastName }}
        </v-card-title>
        <v-card-text>
          <v-table density="comfortable">
            <tbody>
              <tr>
                <td class="font-weight-bold">OIB:</td>
                <td>{{ detailsDialog.officer.oib }}</td>
              </tr>
              <tr>
                <td class="font-weight-bold">Email:</td>
                <td>{{ detailsDialog.officer.email }}</td>
              </tr>
              <tr>
                <td class="font-weight-bold">Residence:</td>
                <td>{{ detailsDialog.officer.residence }}</td>
              </tr>
              <tr>
                <td class="font-weight-bold">Birth Date:</td>
                <td>{{ detailsDialog.officer.birthDate }}</td>
              </tr>
              <tr>
                <td class="font-weight-bold">Police Token:</td>
                <td>
                  <div class="d-flex align-center gap-2">
                    <div class="token-display">
                      <span v-if="detailsDialog.officer.policeToken && visibleTokens[detailsDialog.officer.uuid]" class="token-field">
                        {{ detailsDialog.officer.policeToken }}
                      </span>
                      <span v-else-if="detailsDialog.officer.policeToken" class="text-grey token-placeholder">
                        ••••••••
                      </span>
                      <span v-else class="text-grey">
                        No token
                      </span>
                    </div>
                    <v-btn
                      v-if="detailsDialog.officer.policeToken"
                      :icon="visibleTokens[detailsDialog.officer.uuid] ? 'mdi-eye-off' : 'mdi-eye'"
                      density="compact"
                      size="x-small"
                      variant="text"
                      @click="toggleTokenVisibility(detailsDialog.officer.uuid)"
                      :title="visibleTokens[detailsDialog.officer.uuid] ? 'Hide Token' : 'Show Token'"
                    ></v-btn>
                    <v-btn
                      v-if="!detailsDialog.officer.policeToken"
                      color="primary"
                      size="small"
                      variant="text"
                      :loading="generatingTokenFor === detailsDialog.officer.uuid"
                      @click="generateToken(detailsDialog.officer)"
                    >
                      Generate Token
                    </v-btn>
                  </div>
                </td>
              </tr>
            </tbody>
          </v-table>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            variant="text"
            @click="detailsDialog.show = false"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Snackbar for notifications -->
    <v-snackbar
      v-model="snackbar.show"
      :color="snackbar.color"
      :timeout="3000"
    >
      {{ snackbar.text }}
      <template v-slot:actions>
        <v-btn
          variant="text"
          @click="snackbar.show = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-card>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import type { User } from '@/models/user';
import { getAllPoliceOfficers, generatePoliceToken } from '@/services/userService';

const officers = ref<User[]>([]);
const loading = ref(true);
const search = ref('');
const visibleTokens = ref<Record<string, boolean>>({});
const generatingTokenFor = ref<string | null>(null);

const snackbar = ref({
  show: false,
  text: '',
  color: 'success'
});

const detailsDialog = ref({
  show: false,
  officer: null as User | null
});

const headers = [
  { key: 'name', title: 'Name' },
  { key: 'oib', title: 'OIB' },
  { key: 'email', title: 'Email' },
  { key: 'residence', title: 'Residence' },
  { key: 'policeToken', title: 'Token', width: '180px' }
];

//Fetchaj policajce
onMounted(async () => {
  await fetchOfficers();
});


async function fetchOfficers() {
  loading.value = true;
  try {
    const data = await getAllPoliceOfficers();
    officers.value = data || [];
  } catch (error) {
    console.error('Failed to fetch police officers:', error);
    showSnackbar('Failed to load police officers', 'error');
  } finally {
    loading.value = false;
  }
}

function toggleTokenVisibility(uuid: string) {
  if (!uuid) return;
  
  visibleTokens.value = {
    ...visibleTokens.value,
    [uuid]: !visibleTokens.value[uuid]
  };
}

function viewDetails(officer: User) {
  detailsDialog.value = {
    show: true,
    officer
  };
}

//Generiraj token
async function generateToken(officer: User) {
  if (!officer || !officer.uuid) return;
  
  generatingTokenFor.value = officer.uuid;
  
  try {
    const token = await generatePoliceToken(officer.uuid);
    
    if (detailsDialog.value.officer && detailsDialog.value.officer.uuid === officer.uuid) {
      detailsDialog.value.officer = {
        ...detailsDialog.value.officer,
        policeToken: token
      };
    }
    

    const index = officers.value.findIndex(o => o.uuid === officer.uuid);
    if (index !== -1) {
      officers.value[index] = {
        ...officers.value[index],
        policeToken: token
      };
    }
    
    visibleTokens.value = {
      ...visibleTokens.value,
      [officer.uuid]: true
    };
    
    showSnackbar(`New token generated for ${officer.firstName} ${officer.lastName}`, 'success');
  } catch (error) {
    console.error('Failed to generate token:', error);
    showSnackbar('Failed to generate new token', 'error');
  } finally {
    generatingTokenFor.value = null;
  }
}

function showSnackbar(text: string, color: 'success' | 'error' | 'info' = 'success') {
  snackbar.value = {
    show: true,
    text,
    color
  };
}
</script>

<style scoped>
.token-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  position: relative;
}

.token-content {
  flex-grow: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-right: 8px;
}

.token-display {
  flex-grow: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.token-actions {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  min-width: 24px;
}

.token-field, .token-placeholder {
  font-family: monospace;
  font-size: 0.9rem;
  letter-spacing: 0.5px;
  background-color: rgba(0, 0, 0, 0.05);
  padding: 2px 6px;
  border-radius: 4px;
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 130px;
}
</style>
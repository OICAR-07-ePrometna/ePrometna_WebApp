<template>
  <div>
    <v-text-field v-model="localUser.firstName" density="compact" label="First Name" variant="outlined"
      prepend-inner-icon="mdi-account-outline" :error-messages="errors.firstName ? [errors.firstName] : []"
      @focus="clearError('firstName')" @update:modelValue="updateUser('firstName', $event)" required
      class="mb-4 error-top"></v-text-field>

    <v-text-field v-model="localUser.lastName" density="compact" label="Last Name" variant="outlined"
      prepend-inner-icon="mdi-account-outline" :error-messages="errors.lastName ? [errors.lastName] : []"
      @focus="clearError('lastName')" @update:modelValue="updateUser('lastName', $event)" required
      class="mb-4 error-top"></v-text-field>

    <v-text-field v-model="localUser.oib" density="compact" label="OIB" variant="outlined"
      prepend-inner-icon="mdi-id-card" :error-messages="errors.oib ? [errors.oib] : []" @focus="clearError('oib')"
      @update:modelValue="updateUser('oib', $event)" hint="OIB must be exactly 11 digits" required
      class="mb-4 error-top"></v-text-field>

    <v-text-field v-model="localUser.residence" density="compact" label="Residence" variant="outlined"
      prepend-inner-icon="mdi-home-outline" :error-messages="errors.residence ? [errors.residence] : []"
      @focus="clearError('residence')" @update:modelValue="updateUser('residence', $event)" required
      class="mb-4 error-top"></v-text-field>

    <div class="mb-4">
      <v-menu v-model="dateMenu" :close-on-content-click="false" transition="scale-transition" min-width="auto">
        <template v-slot:activator="{ props }">
          <v-text-field v-model="birthDateFormatted" label="Birth Date" prepend-inner-icon="mdi-calendar" readonly
            v-bind="props" density="compact" variant="outlined"
            :error-messages="errors.birthDate ? [errors.birthDate] : []" @focus="clearError('birthDate')" required
            class="error-top">
          </v-text-field>
        </template>
        <v-date-picker v-model="birthDateInput" :max="firstValidDoB" @update:model-value="updateBirthDate">
        </v-date-picker>
      </v-menu>
    </div>

    <v-text-field v-model="localUser.email" density="compact" label="Email" type="email" variant="outlined"
      prepend-inner-icon="mdi-email-outline" :error-messages="errors.email ? [errors.email] : []"
      @focus="clearError('email')" @update:modelValue="updateUser('email', $event)" required
      class="mb-4 error-top"></v-text-field>

    <v-text-field v-model="localPassword" :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
      :type="visible ? 'text' : 'password'" density="compact" label="Password" prepend-inner-icon="mdi-lock-outline"
      variant="outlined" :error-messages="errors.password ? [errors.password] : []"
      @click:append-inner="visible = !visible" @focus="clearError('password')" @update:modelValue="updatePassword"
      required class="mb-4 error-top"></v-text-field>

    <div class="d-flex gap-2 mb-4">
      <v-text-field v-model="localUser.policeToken" density="compact" label="Police Token" variant="outlined"
        prepend-inner-icon="mdi-key" :error-messages="errors.policeToken ? [errors.policeToken] : []"
        @focus="clearError('policeToken')" @update:modelValue="updateUser('policeToken', $event)" class="error-top"
        readonly></v-text-field>
      <v-btn
        color="primary"
        :disabled="isGenerating"
        :loading="isGenerating"
        @click="generateToken"
        height="40"
        min-width="140">
        Generate
      </v-btn>
    </div>

    <v-select 
      v-model="localUser.role" 
      label="Role" 
      :items="[{ title: 'Policija', value: 'policija' }]"
      item-title="title" 
      item-value="value"
      variant="outlined" 
      density="compact" 
      prepend-inner-icon="mdi-shield-account-outline"
      :error-messages="errors.role ? [errors.role] : []"
      readonly
      disabled
      class="mb-5 error-top">
    </v-select>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, computed, onMounted } from 'vue';
import type { User } from '@/models/user';
import type { FormErrors } from '@/models/formErrors';
import { formatDate, isAtLeastEighteen } from '@/utils/formatDate';
import { USER_ROLES } from '@/constants/userRoles';

const props = defineProps<{
  user: User;
  password: string;
  errors: FormErrors;
}>();

const emit = defineEmits<{
  'update:user': [value: User];
  'update:password': [value: string];
  'update:errors': [field: keyof FormErrors, value: string];
}>();

const localUser = computed({
  get: () => props.user,
  set: (value) => emit('update:user', value)
});

const localPassword = computed({
  get: () => props.password,
  set: (value) => emit('update:password', value)
});

const visible = ref(false);
const dateMenu = ref(false);
const isGenerating = ref(false);

const firstValidDoB = computed(() => {
  const date = new Date();
  date.setFullYear(date.getFullYear() - 18);
  return formatDate(date);
});

const birthDateInput = ref(firstValidDoB.value);
const birthDateFormatted = ref(formatDate(new Date(firstValidDoB.value)));

const roles = USER_ROLES;

function updateUser(field: keyof User, value: any) {
  const newUser = { ...localUser.value, [field]: value };
  emit('update:user', newUser);
}

function updatePassword(value: string) {
  emit('update:password', value);
}

function clearError(field: keyof FormErrors) {
  emit('update:errors', field, '');
}

function updateBirthDate(newValue: string) {
  dateMenu.value = false;

  if (newValue) {
    const selectedDate = new Date(newValue);

    if (!isAtLeastEighteen(selectedDate)) {
      emit('update:errors', 'birthDate', 'User must be at least 18 years old');
      return;
    }

    const formattedDate = formatDate(selectedDate);
    updateUser('birthDate', formattedDate);
    birthDateFormatted.value = formatDate(selectedDate);
  } else {
    updateUser('birthDate', '');
    birthDateFormatted.value = '';
  }
}

//Token for police officers
function generateToken() {
  isGenerating.value = true;
  
  try {
    const digits = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let token = '';
    for (let i = 0; i < 8; i++) {
      token += digits[Math.floor(Math.random() * digits.length)];
    }
    
    updateUser('policeToken', token);
  } catch (error) {
    console.error('Error generating token:', error);
  } finally {
    isGenerating.value = false;
  }
}

watch(() => props.user.birthDate, (newValue) => {
  if (newValue && newValue !== birthDateInput.value) {
    birthDateInput.value = newValue;
    birthDateFormatted.value = formatDate(new Date(newValue));
  }
});

onMounted(() => {
  updateUser('role', 'policija');
});
</script>
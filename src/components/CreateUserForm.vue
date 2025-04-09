<template>
    <div>
      <v-text-field 
        v-model="localUser.firstName" 
        density="compact" 
        label="First Name" 
        variant="outlined"
        prepend-inner-icon="mdi-account-outline"
        :error-messages="errors.firstName ? [errors.firstName] : []"
        @focus="clearError('firstName')"
        @update:modelValue="updateUser('firstName', $event)"
        required
        class="mb-4 error-top"
      ></v-text-field>
  
      <v-text-field 
        v-model="localUser.lastName" 
        density="compact" 
        label="Last Name" 
        variant="outlined"
        prepend-inner-icon="mdi-account-outline"
        :error-messages="errors.lastName ? [errors.lastName] : []"
        @focus="clearError('lastName')"
        @update:modelValue="updateUser('lastName', $event)"
        required
        class="mb-4 error-top"
      ></v-text-field>
  
      <v-text-field 
        v-model="localUser.oib" 
        density="compact" 
        label="OIB" 
        variant="outlined"
        prepend-inner-icon="mdi-id-card"
        :error-messages="errors.oib ? [errors.oib] : []"
        @focus="clearError('oib')"
        @update:modelValue="updateUser('oib', $event)"
        hint="OIB must be exactly 11 digits"
        required
        class="mb-4 error-top"
      ></v-text-field>
  
      <v-text-field 
        v-model="localUser.residence" 
        density="compact" 
        label="Residence" 
        variant="outlined"
        prepend-inner-icon="mdi-home-outline"
        :error-messages="errors.residence ? [errors.residence] : []"
        @focus="clearError('residence')"
        @update:modelValue="updateUser('residence', $event)"
        required
        class="mb-4 error-top"
      ></v-text-field>
  
      <div class="mb-4">
        <v-menu
          v-model="dateMenu"
          :close-on-content-click="false"
          transition="scale-transition"
          min-width="auto"
        >
          <template v-slot:activator="{ props }">
            <v-text-field
              v-model="birthDateFormatted"
              label="Birth Date"
              prepend-inner-icon="mdi-calendar"
              readonly
              v-bind="props"
              density="compact"
              variant="outlined"
              :error-messages="errors.birthDate ? [errors.birthDate] : []"
              @focus="clearError('birthDate')"
              required
              class="error-top"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="birthDateInput"
            @update:model-value="updateBirthDate"
          ></v-date-picker>
        </v-menu>
      </div>
  
      <v-text-field 
        v-model="localUser.email" 
        density="compact" 
        label="Email" 
        type="email"
        variant="outlined"
        prepend-inner-icon="mdi-email-outline"
        :error-messages="errors.email ? [errors.email] : []"
        @focus="clearError('email')"
        @update:modelValue="updateUser('email', $event)"
        required
        class="mb-4 error-top"
      ></v-text-field>
  
      <v-text-field 
        v-model="localPassword"
        :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
        :type="visible ? 'text' : 'password'" 
        density="compact" 
        label="Password"
        prepend-inner-icon="mdi-lock-outline" 
        variant="outlined" 
        :error-messages="errors.password ? [errors.password] : []"
        @click:append-inner="visible = !visible" 
        @focus="clearError('password')"
        @update:modelValue="updatePassword"
        required
        class="mb-4 error-top"
      ></v-text-field>
  
      <v-select
        v-model="localUser.role"
        label="Role"
        :items="roles"
        item-title="title"
        item-value="value"
        variant="outlined"
        density="compact"
        prepend-inner-icon="mdi-shield-account-outline"
        :error-messages="errors.role ? [errors.role] : []"
        @focus="clearError('role')"
        @update:modelValue="updateUser('role', $event)"
        required
        class="mb-5 error-top"
      ></v-select>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref, watch, computed } from 'vue';
  import type { User } from '@/models/models';
  import type { FormErrors } from '@/models/models';
  import { UserRole } from '@/enums/enums';
  import { formatDateForApi } from '@/utils/date.util';
  
  // Props
  const props = defineProps<{
    user: User;
    password: string;
    errors: FormErrors;
  }>();
  
  // Emits
  const emit = defineEmits<{
    'update:user': [value: User];
    'update:password': [value: string];
    'update:errors': [field: keyof FormErrors, value: string];
  }>();
  
  // Create local copies of props for v-model
  const localUser = computed({
    get: () => props.user,
    set: (value) => emit('update:user', value)
  });
  
  const localPassword = computed({
    get: () => props.password,
    set: (value) => emit('update:password', value)
  });
  
  // Date picker state
  const visible = ref(false);
  const dateMenu = ref(false);
  const birthDateInput = ref(props.user.birthDate || formatDateForApi(new Date()));
  const birthDateFormatted = ref(formatDateForDisplay(props.user.birthDate || new Date()));
  
  // Role options for select
  const roles = [
    { title: 'HAK', value: UserRole.HAK },
    { title: 'Admin', value: UserRole.Admin },
    { title: 'Osoba', value: UserRole.Osoba },
    { title: 'Firma', value: UserRole.Firma },
    { title: 'Policija', value: UserRole.Policija },
    { title: 'Super Admin', value: UserRole.SuperAdmin }
  ];
  
  // Format date for display
  function formatDateForDisplay(date: Date | string | null): string {
    if (!date) return '';
    
    const d = new Date(date);
    
    if (isNaN(d.getTime())) {
      return '';
    }
    
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: '2-digit', 
      day: '2-digit' 
    };
    
    return d.toLocaleDateString(undefined, options);
  }
  
  // Update individual user field
  function updateUser(field: keyof User, value: any) {
    const newUser = { ...localUser.value, [field]: value };
    emit('update:user', newUser);
  }
  
  // Update password
  function updatePassword(value: string) {
    emit('update:password', value);
  }
  
  // Clear error for a field
  function clearError(field: keyof FormErrors) {
    emit('update:errors', field, '');
  }
  
  // Update birth date when date picker changes
  function updateBirthDate(newValue: string) {
    dateMenu.value = false;
    
    if (newValue) {
      const formattedDate = formatDateForApi(new Date(newValue));
      updateUser('birthDate', formattedDate);
      birthDateFormatted.value = formatDateForDisplay(new Date(newValue));
    } else {
      updateUser('birthDate', '');
      birthDateFormatted.value = '';
    }
  }
  
  // Watch for changes in the user's birth date
  watch(() => props.user.birthDate, (newValue) => {
    if (newValue && newValue !== birthDateInput.value) {
      birthDateInput.value = newValue;
      birthDateFormatted.value = formatDateForDisplay(new Date(newValue));
    }
  });
  </script>
  
  <style>
  /* Style to position error messages above fields instead of below */
  .error-top .v-messages {
    order: -1;  /* Move error messages before the input */
    margin-bottom: 4px;
    margin-top: 0;
  }
  
  .error-top {
    display: flex;
    flex-direction: column;
  }
  </style>
<template>
  <div>
    <v-card class="mx-auto pa-6 pb-8" elevation="8" max-width="600" rounded="lg">
      <div class="text-h5 mb-6">Create New Police Officer</div>

      <UserForm v-model:user="user" v-model:password="password" :errors="errors" @update:errors="updateErrors" />

      <div class="d-flex gap-4 mt-6">
        <v-btn color="primary" size="large" block :loading="isSubmitting" :disabled="isSubmitting" @click="submitForm">
          {{ isSubmitting ? 'Creating...' : 'Create Police Officer' }}
        </v-btn>

        <v-btn color="grey" variant="tonal" size="large" block :disabled="isSubmitting" @click="resetForm">
          Reset
        </v-btn>
      </div>

      <v-alert v-if="errorMessage" type="error" variant="tonal" class="mt-6" closable @click:close="errorMessage = ''">
        {{ errorMessage }}
      </v-alert>

      <v-alert v-if="successMessage" type="success" variant="tonal" class="mt-6" closable
        @click:close="successMessage = ''">
        {{ successMessage }}
      </v-alert>
    </v-card>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, watch } from 'vue';
import type { User } from '@/models/user';
import { UserRole } from '@/enums/userRole';
import UserForm from '@/components/CreatePoliceOfficerForm.vue';
import type { FormErrors } from '@/models/formErrors';
import { isEmailValid } from '@/utils/validateEmail';
import { createUser } from '@/services/userService';

const user = ref<User>({
  uuid: '',
  firstName: '',
  lastName: '',
  oib: '',
  residence: '',
  birthDate: '',
  email: '',
  role: UserRole.Policija,
  policeToken: ''
});

const password = ref('');

const isSubmitting = ref(false);
const errorMessage = ref('');
const successMessage = ref('');

const errors = reactive<FormErrors>({
  firstName: '',
  lastName: '',
  oib: '',
  residence: '',
  birthDate: '',
  email: '',
  password: '',
  role: '',
  policeToken: ''
});

const updateErrors = (field: keyof FormErrors, value: string) => {
  errors[field] = value;
};

const validateForm = (): boolean => {
  let isValid = true;
  
  Object.keys(errors).forEach(key => {
    errors[key as keyof FormErrors] = '';
  });

  if (!user.value.firstName?.trim()) {
    errors.firstName = 'First name is required';
    isValid = false;
  }

  if (!user.value.lastName?.trim()) {
    errors.lastName = 'Last name is required';
    isValid = false;
  }

  if (!user.value.oib?.trim()) {
    errors.oib = 'OIB is required';
    isValid = false;
  } else if (user.value.oib.length !== 11) {
    errors.oib = 'OIB must be exactly 11 digits';
    isValid = false;
  }

  if (!user.value.residence?.trim()) {
    errors.residence = 'Residence is required';
    isValid = false;
  }

  if (!user.value.birthDate) {
    errors.birthDate = 'Birth date is required';
    isValid = false;
  }

  if (!user.value.email?.trim()) {
    errors.email = 'Email is required';
    isValid = false;
  } else if (!isEmailValid(user.value.email)) {
    errors.email = 'Enter a valid email address';
    isValid = false;
  }

  if (!password.value) {
    errors.password = 'Password is required';
    isValid = false;
  } else if (password.value.length < 6) {
    errors.password = 'Password must be at least 6 characters';
    isValid = false;
  }

  return isValid;
};

const submitForm = async () => {
  errorMessage.value = '';
  successMessage.value = '';
  
  console.log("Submit button clicked");
  console.log("Current user data:", user.value);
  console.log("Current password:", password.value);

  if (!validateForm()) {
    console.log("Form validation failed");
    return;
  }

  try {
    isSubmitting.value = true;
    console.log("Submitting user data:", user.value);
    
    const createdUser = await createUser(user.value, password.value);
    
    console.log("Created user response:", createdUser);

    if (createdUser) {
      successMessage.value = `Police officer ${createdUser.firstName} ${createdUser.lastName} created successfully!`;
      
      if (createdUser.policeToken) {
        successMessage.value += ` You can now generate a token for this officer in the officers list.`;
      }
      
      resetForm();
    }
  } catch (error: any) {
    console.error('Error creating user:', error);
    errorMessage.value = error.response?.data?.message ||
      'Failed to create user. Please try again.';
  } finally {
    isSubmitting.value = false;
  }
};

const resetForm = () => {
  user.value = {
    uuid: '',
    firstName: '',
    lastName: '',
    oib: '',
    residence: '',
    birthDate: '',
    email: '',
    role: UserRole.Policija,
    policeToken: ''
  };
  password.value = '';

  Object.keys(errors).forEach(key => {
    errors[key as keyof FormErrors] = '';
  });
};
</script>
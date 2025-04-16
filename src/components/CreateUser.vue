<template>
  <div>
    <v-card class="mx-auto pa-6 pb-8" elevation="8" max-width="600" rounded="lg">
      <div class="text-h5 mb-6">Create New User</div>

      <UserForm v-model:user="user" v-model:password="password" :errors="errors" @update:errors="updateErrors" />

      <div class="d-flex gap-4 mt-6">
        <v-btn color="primary" size="large" block :loading="isSubmitting" :disabled="isSubmitting" @click="submitForm">
          {{ isSubmitting ? 'Creating...' : 'Create User' }}
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
import { ref, reactive } from 'vue';
import type { User } from '@/models/user';
import { UserRole } from '@/enums/userRole';
import UserForm from '@/components/CreateUserForm.vue';
import type { FormErrors } from '@/models/formErrors';
import { isOibValid } from '@/utils/validateOIB';
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
  role: UserRole.Osoba
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
  role: ''
});

const updateErrors = (field: keyof FormErrors, value: string) => {
  errors[field] = value;
};

//TODO: Try to implement better validation logic later
const validateForm = (): boolean => {
  let isValid = true;

  if (!user.value.firstName.trim()) {
    errors.firstName = 'First name is required';
    isValid = false;
  }

  if (!user.value.lastName.trim()) {
    errors.lastName = 'Last name is required';
    isValid = false;
  }

  if (!user.value.oib.trim()) {
    errors.oib = 'OIB is required';
    isValid = false;
  } else if (!isOibValid(user.value.oib)) {
    errors.oib = 'Invalid OIB';
    isValid = false;
  }

  if (!user.value.residence.trim()) {
    errors.residence = 'Residence is required';
    isValid = false;
  }

  if (!user.value.birthDate) {
    errors.birthDate = 'Birth date is required';
    isValid = false;
  }

  if (!user.value.email.trim()) {
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

  if (!user.value.role) {
    errors.role = 'Role is required';
    isValid = false;
  }

  return isValid;
};

const submitForm = async () => {
  errorMessage.value = '';
  successMessage.value = '';

  if (!validateForm()) {
    return;
  }

  try {
    isSubmitting.value = true;

    const createdUser = await createUser(user.value, password.value);

    if (createdUser) {
      successMessage.value = `User ${createdUser.email} created successfully!`;
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
    role: UserRole.Osoba
  };
  password.value = '';

  Object.keys(errors).forEach(key => {
    errors[key as keyof FormErrors] = '';
  });
};
</script>
<template>
  <div>
    <v-card class="mx-auto pa-12 pb-8" elevation="8" max-width="448" rounded="lg">
      <div class="text-subtitle-1 text-medium-emphasis">Account</div>

      <v-text-field v-model="email" density="compact" placeholder="Email address" type="email"
        prepend-inner-icon="mdi-email-outline" variant="outlined" :error-messages="emailError ? [emailError] : []"
        @focus="emailError = ''"></v-text-field>

      <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
        Password
      </div>

      <v-text-field v-model="password" :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
        :type="visible ? 'text' : 'password'" density="compact" placeholder="Enter your password"
        prepend-inner-icon="mdi-lock-outline" variant="outlined" :error-messages="passwordError ? [passwordError] : []"
        @click:append-inner="visible = !visible" @focus="passwordError = ''"></v-text-field>

      <v-btn class="mb-8" color="blue" size="large" variant="tonal" block :loading="isLoading" :disabled="isLoading"
        @click="handleLogin">
        {{ isLoading ? 'Logging in...' : 'Log In' }}
      </v-btn>

      <v-alert v-if="loginError" type="error" variant="tonal" class="mb-0" closable @click:close="loginError = ''">
        {{ loginError }}
      </v-alert>
    </v-card>
  </div>
</template>

<script setup>
  import { ref } from 'vue';

  // Reactive state
  const email = ref('');
  const password = ref('');
  const emailError = ref('');
  const passwordError = ref('');
  const loginError = ref('');
  const isLoading = ref(false);
  const visible = ref(false);

  // Methods
  const validateForm = () => {
    let isValid = true;

    if (!email.value.trim()) {
      emailError.value = 'E-mail is required';
      isValid = false;
    }

    if (!password.value) {
      passwordError.value = 'Password is required';
      isValid = false;
    } else if (password.value.length < 6) {
      passwordError.value = 'Password must be at least 6 characters';
      isValid = false;
    }

    return isValid;
  };

  const handleLogin = async () => {
    // Reset previous errors
    loginError.value = '';

    if (!validateForm()) {
      return;
    }

    try {
      isLoading.value = true;

      // Here you would typically call your authentication API
      // Example:
      // const response = await authService.login(account.value, password.value);

      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1000));

      // For demonstration: check if account/password match a test account
      if (email.value === 'test@example.com' && password.value === 'password123') {
        // Success! Redirect or set authenticated state
        console.log('Login successful');
        // In a real app, you might:
        // router.push('/dashboard');
        // or store auth tokens:
        // localStorage.setItem('token', response.token);
      } else {
        loginError.value = 'Invalid e-mail or password';
      }
    } catch (error) {
      loginError.value = error.message || 'Login failed. Please try again.';
    } finally {
      isLoading.value = false;
    }
  };
</script>
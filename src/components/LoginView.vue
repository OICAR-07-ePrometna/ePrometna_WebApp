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

      <v-btn class="mb-8" color="blue" size="large" variant="tonal" block :loading="loading" @click="handleLogin"
        :disabled="!tosAccepted">
        Log In
      </v-btn>

      <v-btn class="mt-4" color="grey" variant="text" size="small" block @click="tos.ShowTos()">
        Show Privacy notice
      </v-btn>
    </v-card>
  </div>
  <Privacy ref="tos" v-model:accepted="tosAccepted" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { useSnackbar } from './SnackbarProvider.vue';
import { startPeriodicRefresh } from '@/services/axios';
import { getLoggedInUser } from '@/services/userService';
import { login } from '@/services/authService';
import Privacy from './Privacy.vue';

const router = useRouter();
const authStore = useAuthStore();
const snackbar = useSnackbar()

const email = ref('');
const password = ref('');
const emailError = ref('');
const passwordError = ref('');
const visible = ref(false);
const tosAccepted = ref(false);
const tos = ref(Privacy)

const loading = ref(false)

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

async function handleLogin() {
  if (!validateForm()) {
    return;
  }
  loading.value = true
  try {
    const rez = await login({ email: email.value, password: password.value });
    authStore.SetTokens(rez.accessToken, rez.refreshToken)

    const userRez = await getLoggedInUser()
    authStore.User = userRez
  } catch (error) {
    console.error('Login failed:', error);
    snackbar.Error(`Failed to login`)
    return
  }
  finally {
    loading.value = false
  }
  startPeriodicRefresh()
  router.push('/');
}

</script>

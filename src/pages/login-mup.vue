<template>
  <div class="login-header">
    <h1>ePrometna</h1>
    <img src="@/assets/mup_logo.png" alt="mup_logo" class="logo" />
  </div>
  <LoginView />
</template>

<script setup lang="ts">
import LoginView from '@/components/LoginView.vue';
import '../styles/login.css';
</script>

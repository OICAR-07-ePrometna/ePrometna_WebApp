<template>  
    <div class="header">
        <h1>ePrometna</h1>
        <img src="@/assets/hak_logo.png" alt="hak_logo" class="logo" />
    </div>
    <LoginView />
</template>

<script setup lang="ts">
    import LoginView from '@/components/LoginView.vue';
    import '../styles/login.css';
</script>
<template>
    <v-container>
        <v-card class="mx-auto pa-6" max-width="800">
            <template v-if="userStore.currentUser">
                <v-card-title class="text-h5 mb-4">User Details</v-card-title>

                <div>
                    <v-text-field v-model="userStore.currentUser.firstName" density="compact" label="First Name"
                        variant="underlined" prepend-inner-icon="mdi-account-outline" readonly
                        class="mb-4"></v-text-field>

                    <v-text-field v-model="userStore.currentUser.lastName" density="compact" label="Last Name"
                        variant="underlined" prepend-inner-icon="mdi-account-outline" readonly
                        class="mb-4"></v-text-field>

                    <v-text-field v-model="userStore.currentUser.oib" density="compact" label="OIB" variant="underlined"
                        prepend-inner-icon="mdi-id-card" readonly class="mb-4"></v-text-field>

                    <v-text-field v-model="userStore.currentUser.residence" density="compact" label="Residence"
                        variant="underlined" prepend-inner-icon="mdi-home-outline" readonly class="mb-4"></v-text-field>

                    <v-text-field v-model="userStore.currentUser.birthDate" density="compact" label="Birth Date"
                        variant="underlined" prepend-inner-icon="mdi-calendar" readonly class="mb-4"></v-text-field>

                    <v-text-field v-model="userStore.currentUser.email" density="compact" label="Email"
                        variant="underlined" prepend-inner-icon="mdi-email-outline" readonly
                        class="mb-4"></v-text-field>

                    <v-text-field v-model="userStore.currentUser.role" density="compact" label="Role"
                        variant="underlined" prepend-inner-icon="mdi-shield-account-outline" readonly
                        class="mb-4"></v-text-field>
                </div>
            </template>

            <v-alert v-else-if="userStore.error" type="error" class="mt-4">
                {{ userStore.error }}
            </v-alert>
        </v-card>
    </v-container>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();

onMounted(async () => {
    if (!userStore.currentUser) {
        await userStore.fetchLoggedInUser();
    }
});
</script>
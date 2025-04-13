<template>
  <slot>
  </slot>
  <v-snackbar v-model="show" :color="color" elevation="10" :timeout="timeout">
    {{ message }}
    <template #actions>
      <v-btn variant="text" @click="show = false">Close</v-btn>
    </template>
  </v-snackbar>
</template>

<script lang="ts">
export const useSnackbar = (): SnackbarProvider => {
  const snackbar = inject(key)
  if (!snackbar) {
    throw new Error('useSnackbar must be used within a SnackbarProvider')
  }
  return snackbar
}

const key = Symbol() as InjectionKey<SnackbarProvider>

</script>
<script lang="ts" setup>
import type { SnackbarProvider } from '@/models/snackbarProvider';
import { type InjectionKey, provide, ref } from 'vue';

const show = ref(false)
const message = ref('')
const color = ref('')
const timeout = ref(2000)

provide(key, {
  Error(text: string) {
    message.value = text
    color.value = "error"
    show.value = true
  },
  Info(text: string) {
    message.value = text
    color.value = "info"
    show.value = true
  },
  Success(text: string) {
    message.value = text
    color.value = "success"
    show.value = true
  },
  Warning(text: string) {
    message.value = text
    color.value = "warning"
    show.value = true
  },
  Hide() {
    show.value = false
  }
})
</script>

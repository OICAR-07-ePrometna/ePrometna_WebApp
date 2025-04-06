import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useDrawer = defineStore('drawer', () => {
  const open = ref(window.matchMedia('(min-width: 1280px)').matches);

  const updateOpenState = () => {
    open.value = window.matchMedia('(min-width: 1280px)').matches;
  }; 

  const toggle = () => {
    open.value = !open.value;
  };
  const setOpen = (value: boolean) => {
    open.value = value;
  };

  onMounted(() => {
    const mediaQuery = window.matchMedia('(min-width: 1280px)');
    mediaQuery.addEventListener('change', updateOpenState);
    updateOpenState(); // Set initial state
  });

  onUnmounted(() => {
    const mediaQuery = window.matchMedia('(min-width: 1280px)');
    mediaQuery.removeEventListener('change', updateOpenState);
  });
  return {
    open,
    toggle,
    setOpen,
  };
});
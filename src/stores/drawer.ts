import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useDrawer = defineStore('drawer', () => {
  const DESKTOP_MEDIA_QUERY = '(min-width: 1280px)';
  const open = ref(false);
  let mediaQuery: MediaQueryList | null = null;

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
    mediaQuery = window.matchMedia(DESKTOP_MEDIA_QUERY);
    mediaQuery.addEventListener('change', updateOpenState);
    updateOpenState();
  });

  onUnmounted(() => {
    if (mediaQuery) {
      mediaQuery.removeEventListener('change', updateOpenState);
      mediaQuery = null;
      }
  });
  return {
    open,
    toggle,
    setOpen,
  };
});
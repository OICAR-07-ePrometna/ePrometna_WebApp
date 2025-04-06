import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useDrawer = defineStore('drawer', () => {
  const open = ref(false);
  const toggle = () => {
    open.value = !open.value;
  };
  const setOpen = (value: boolean) => {
    open.value = value;
  };
  return {
    open,
    toggle,
    setOpen,
  };
});
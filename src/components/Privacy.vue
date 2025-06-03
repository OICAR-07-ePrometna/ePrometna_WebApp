<template>
  <v-sheet v-show="show" border="md" class="pa-6 text-white mx-auto position" color="background" max-width="400">
    <h4 class="text-h5 font-weight-bold mb-4">Your Privacy</h4>

    <p class="mb-8">
      This business determines the use of personal data collected on our media properties and across the internet. We
      may collect data that you submit to us directly or data that we collect automatically including from cookies (such
      as device information or IP address).

      <br>
      <br>

      Please read our <a class="text-red-accent-2" href="/privacy.txt">Privacy Policy</a> to learn about our privacy
      practices or
      click "Your Preferences" to exercise control over your data.
    </p>

    <v-btn @click="accept" class="text-none text-black mb-4" color="primary" size="x-large" variant="flat" block>
      Accept
    </v-btn>

    <v-btn @click="decline" class="text-none text-black" color="error" size="x-large" variant="outlined" block>
      Decline
    </v-btn>
  </v-sheet>
</template>

<script setup lang="ts">
import Cookies from 'js-cookie'

const cname = "TOS_ACCEPTED"
defineProps({
  accepted: {
    type: Boolean,
    required: true,
  }
})

const checkCookie = (): boolean => {
  const val = Cookies.get(cname)
  return val == "true"
}
const show = ref<boolean>(!checkCookie())

const emit = defineEmits(['update:accepted'])

const accept = () => {
  Cookies.set(cname, "true")
  emit('update:accepted', true)
  show.value = false
}

const decline = () => {
  Cookies.remove(cname)
  emit('update:accepted', false)
  show.value = false
}

const ShowTos = () => {
  show.value = true
}

defineExpose({
  ShowTos
})
</script>

<style lang="css" scoped>
.position {
  position: absolute;
  right: 15px;
  bottom: 55px;
}
</style>

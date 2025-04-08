<template>
    <div class="search">
        <v-row align="center" class="gap-2">
        <v-icon>mdi-information</v-icon>
        <span class="spacing">Pretraga {{searchItem}}</span>
        <v-text-field :loading="loading" append-inner-icon="mdi-magnify" density="compact"
            :label="label" variant="solo" hide-details single-line @click:append-inner="onClick"></v-text-field>
    </v-row>
    </div>
    <br>
    <v-divider thickness="2" class="my-2"></v-divider>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const loaded = ref(false)
const loading = ref(false)

// changables
const label = 'tobegiven'
const searchItem = 'vozaca'

function onClick() {
    loading.value = true
    setTimeout(() => {
        loading.value = false
        loaded.value = true
    }, 2000)
}
</script>

<style lang="css">
.search{
    padding: 15px;
}
.spacing{
    padding: 0px 10px 0px 10px ;
}
</style>
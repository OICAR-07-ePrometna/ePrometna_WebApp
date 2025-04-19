<template>
    <div class="search">
        <v-row align="center" class="gap-2">
            <v-tooltip v-if="tooltip" :text="tooltip" v-model="showTooltip" :open-on-hover="false">
                <template v-slot:activator="{ props }">
                    <v-btn v-bind="props" flat density="compact" @click="showTooltip = !showTooltip">
                        <v-icon size="x-large">mdi-information</v-icon>
                    </v-btn>
                </template>
            </v-tooltip>
            <span class="spacing" v-if="label">{{ label }}</span>
            <v-text-field :loading="loading" append-inner-icon="mdi-magnify" density="compact"
                :placeholder="placeholder" variant="solo" hide-details single-line @click:append-inner="search"
                @keyup.enter="search" v-model="searchQuery"></v-text-field>
        </v-row>
    </div>
    <v-divider thickness="2" class="my-2"></v-divider>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Expozed properties
const props = defineProps({
    label: String,
    tooltip: String,
    placeholder: String,
    onClick: {
        type: Function,
        required: true,
    }
})

// TODO:
// Here lies loaded
// depricated by fran
// const loaded = ref(false)
const loading = ref(false)
const showTooltip = ref(false)
const searchQuery = ref(''); 

async function search() {
    loading.value = true
    try {
        await props.onClick(searchQuery.value); 
    }
    catch {

    }
    finally {
        loading.value = false
    }

}
</script>

<style scoped lang="css">
.search {
    padding: 30px;
}

.spacing {
    padding: 0px 10px 0px 10px;
}
</style>
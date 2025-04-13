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
                :placeholder="placeholder" variant="solo" hide-details single-line
                @click:append-inner="search"></v-text-field>
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

async function search() {
    loading.value = true
    try{
        await props.onClick()
    }
    catch{

    }
    finally{
        loading.value = false   
    }
    
}
</script>

<style lang="css">
.search {
    padding: 15px;
}

.spacing {
    padding: 0px 10px 0px 10px;
}
</style>
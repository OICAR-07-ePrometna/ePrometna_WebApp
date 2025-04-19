<template>
    <v-dialog v-model="dialog" :max-width="options.width" persistent>
        <v-card>
            <Line />
            <v-card-title>
                {{ title }}
            </v-card-title>
            <v-card-text v-show="!!message">
                {{ message }}
            </v-card-text>
            <div class="body-ctn">
                <slot name="body"></slot>
            </div>
            <v-card-actions class="pt-3">
                <v-spacer></v-spacer>
                <v-btn v-if="!options.noCancel" color="error" variant="elevated" @click="cancel">
                    odustani
                </v-btn>
                <v-btn color="primary" variant="elevated" @click="agree">potvrdi</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script lang="ts" setup>
import type { ConfirmProps } from '@/types/ConfirmProps';
import { ref } from "vue";

// Variables
const dialog = ref()
const resolve = ref();
const reject = ref();
const title = ref();
const message = ref<string>();
const options = ref({
    width: 400,
    zIndex: 200,
    noCancel: false,
    color: 'primary',
});

// Functions
const agree = () => {
    resolve.value(true);
    dialog.value = false;
};

const cancel = () => {
    resolve.value(false);
    dialog.value = false;
};

// Expose Functions
const Open = ({ Title, Message, Options = {} }: ConfirmProps) => {
    dialog.value = true;
    title.value = Title;
    message.value = Message;
    options.value = { ...options.value, ...Options };

    return new Promise((res, rej) => {
        resolve.value = res;
        reject.value = rej;
    });
};

defineExpose({
    Open,
})
</script>
<style lang="css" scoped>
.body-ctn {
    padding: 1rem;
}
</style>
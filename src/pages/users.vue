<template>
    <div>
        <Search label="Pretraga korisnika" tooltip="Unesite ime i/ili prezime korisnika" placeholder="Ime Prezime"
            :on-click="handleSearch" />
        <v-data-table-virtual :headers="headers" :items="users" height="400" item-value="name" fixed-header>
            <template v-slot:no-data>
                Nema pronađenih korisnika.
            </template>
            <template v-slot:item.actions="{ item }">
                <div class="d-flex ga-2 justify-end">
                    <v-icon color="medium-emphasis" icon="mdi-pencil" size="large" @click="editItem(item)"></v-icon>
                    <v-icon color="medium-emphasis" icon="mdi-delete" size="large" @click="deleteItem(item)"></v-icon>
                </div>
            </template>
        </v-data-table-virtual>

        <v-dialog v-model="dialog" max-width="500">
            <v-card :title="`Uredi Korisnika`">
                <v-card-text>
                    <v-row>
                        <v-col cols="12" sm="6">
                            <v-text-field v-model="editedItem.firstName" label="Ime"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-text-field v-model="editedItem.lastName" label="Prezime"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-text-field v-model="editedItem.oib" label="OIB"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-text-field v-model="editedItem.residence" label="Prebivalište"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-text-field v-model="editedItem.birthDate" label="Datum rođenja"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-text-field v-model="editedItem.email" label="Email"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-text-field v-model="editedItem.role" label="Uloga" readonly></v-text-field>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue-grey-lighten-1" variant="text" @click="closeDialog">
                        Odustani
                    </v-btn>
                    <v-btn color="blue-grey-darken-1" variant="text" @click="saveItem">
                        Spremi
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
    <ConfirmDialog ref="confirmDialog" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import Search from '@/components/Search.vue';
import { searchUsers, updateUser, deleteUser } from '@/services/userService';
import type { User } from '@/models/user';
import { useSnackbar } from '@/components/SnackbarProvider.vue';
import ConfirmDialog from '@/components/confirmDialog.vue';

const headers = [
    { title: 'Ime', key: 'firstName' },
    { title: 'Prezime', key: 'lastName' },
    { title: 'OIB', key: 'oib' },
    { title: 'Prebivalište', key: 'residence' },
    { title: 'DOB', key: 'birthDate' },
    { title: 'Email', key: 'email' },
    { title: 'Role', key: 'role' },
    { title: '', key: 'actions', sortable: false },
];
const confirmDialog = shallowRef(ConfirmDialog)
const snackbar = useSnackbar()
const users = ref<User[]>([])
const dialog = ref(false);
const isEditing = ref(false);
const editedItem = ref<User>({
    firstName: '',
    lastName: '',
    oib: '',
    residence: '',
    birthDate: '',
    email: '',
    role: undefined!,
    uuid: ''
});

const handleSearch = async (query: string) => {
    try {
        const results = await searchUsers(query);
        if (!results) {
            users.value = []
            return
        }

        users.value = results
    } catch (error) {
        // TODO: Greška pri pretraživanju korisnika
        snackbar.Error("Nemas prava vjerojatno \"401\"")
    }
};

const editItem = async (item: User) => {
    editedItem.value = { ...item };
    isEditing.value = true;
    dialog.value = true;
};

const deleteItem = async (item: User) => {
    
    const ok = await confirmDialog.value.Open({
        Title: "Brisanje korisnika",
        Message: "Jeste li sigurni da želite obrisati korisnika",
        Options: { noCancel: false }
    });

    if (!ok) return

    try {
        if (item.uuid) {
            await deleteUser(item.uuid);
            users.value = users.value.filter(user => user.uuid !== item.uuid);
        }
        snackbar.Success("Korisnik je uspješno obrisan")
    } catch (error) {
        snackbar.Error("Greška pri brisanju korisnika")
    }
};

const saveItem = async () => {
    try {
        if (editedItem.value.uuid) {
            await updateUser(editedItem.value.uuid, editedItem.value);
            const index = users.value.findIndex(user => user.uuid === editedItem.value.uuid);
            if (index > -1) {
                users.value[index] = { ...editedItem.value };
            }
        }
        snackbar.Success("Korisnik je uspješno ureďen")
        closeDialog();
    } catch (error) {
        snackbar.Error("Greška pri ureďivanju korisnika")
    }
};

const closeDialog = () => {
    dialog.value = false;
    isEditing.value = false;
    editedItem.value = {
        firstName: '',
        lastName: '',
        oib: '',
        residence: '',
        birthDate: '',
        email: '',
        role: undefined!,
        uuid: ''
    };
};
</script>

<style scoped></style>
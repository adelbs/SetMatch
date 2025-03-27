<template>
    <v-dialog
        scrollable
        v-model="show"
        width="500"
    >
        <v-card :loading="$store.state.loading || $store.state.bgLoading">
            <v-card-title>Notas</v-card-title>
            <v-card-text>
                <v-textarea
                    :disabled="$store.state.loading || $store.state.bgLoading"
                    v-model="notes"
                    auto-grow
                    placeholder="Escreve qualquer coisa aqui..."
                ></v-textarea>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    text
                    @click="show = false"
                >
                    Cancelar
                </v-btn>
                <v-btn
                    :disabled="$store.state.loading || $store.state.bgLoading"
                    color="primary"
                    text
                    @click="save"
                >
                    Salvar
                </v-btn>
            </v-card-actions>
        </v-card>

    </v-dialog>
</template>

<script>

import { getResource, saveResource } from '../../commons';

export default {
    name: 'Notes',
    props: ['musicKey', 'value'],
    data: () => ({
        notes: ''
    }),
    computed: {
        show: {
            get() { return this.value },
            set(value) { this.$emit('input', value); }
        }
    },
    mounted() {
        this.load();
    },
    methods: {
        load() {
            this.notes = '';
            getResource(`${this.musicKey}-notes`).then(notes => this.notes = notes);
        },
        save() {
            saveResource(`${this.musicKey}-notes`, this.notes);
            this.show = false;
        }
    },
    watch: {
        'musicKey': function () {
            this.load();
        }
    }
}
</script>
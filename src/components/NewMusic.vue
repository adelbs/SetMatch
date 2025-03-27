<template>
    <v-dialog
        v-model="show"
        width="500"
    >
        <v-card>
            <v-card-title>
                Adicionar música...
            </v-card-title>

            <v-card-text>
                <v-text-field
                    v-model="newMusic.artist"
                    label="Artista/Banda"
                ></v-text-field>
                <v-text-field
                    v-model="newMusic.title"
                    label="Música"
                ></v-text-field>
                <div class="mt-3">
                    Depois você poderá adicionar mais informações.
                </div>
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
                    color="primary"
                    text
                    @click="saveMusic"
                >
                    Salvar
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>

import { saveme } from '../commons';

export default {
    name: 'NewMusic',
    props: ['value'],
    data: () => ({
        newMusic: {
            artist: '',
            title: ''
        }
    }),
    computed: {
        show: {
            get() { return this.value },
            set(value) { this.$emit('input', value); }
        }
    },
    methods: {
        saveMusic() {
            const newMusic = `${this.newMusic.artist.trim()}-${this.newMusic.title.trim()}`.toLowerCase();

            if (newMusic != '-' && !this.$store.getters.me.musics.find(item => item == newMusic)) {
                this.$store.commit('music', newMusic);

                this.show = false;
                this.newMusic = {
                    artist: '',
                    title: ''
                };

                saveme();
            }
            else {
                this.$store.commit('dialog', {
                    title: 'Não deu pra salvar...',
                    text: `Verifica as informações e tenta de novo. <li>Não pode adicionar uma música duplicada.</li><li>Todos os campos são obrigatórios.</li>`,
                    show: true
                });
            }
        }
    }
}
</script>
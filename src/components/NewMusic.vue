<template>
    <v-dialog
        v-model="show"
        width="500"
    >
        <v-card>
            <v-card-title>
                Add Music...
            </v-card-title>

            <v-card-text>
                <v-text-field
                    v-model="newMusic.artist"
                    label="Artist"
                ></v-text-field>
                <v-text-field
                    v-model="newMusic.title"
                    label="Title"
                ></v-text-field>
                <div class="mt-3">
                    You can add more details later.
                </div>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    text
                    @click="show = false"
                >
                    Cancel
                </v-btn>
                <v-btn
                    color="primary"
                    text
                    @click="saveMusic"
                >
                    Save
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
                    title: 'Something wrong...',
                    text: `Please, check the information and try again. <li>You cannot add a duplicated music.</li><li>All fields are mandatory.</li>`,
                    show: true
                });
            }
        }
    }
}
</script>
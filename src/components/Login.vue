<template>
    <v-slide-y-transition hide-on-leave>
        <v-container
            class="d-flex justify-center mt-16"
            v-if="!$store.state.loading"
        >
            <v-card width="400">
                <v-card-title>Epa, quem é você?</v-card-title>
                <v-card-text>
                    <v-select
                        label="Sua banda"
                        v-model="band"
                        :items="bands"
                    ></v-select>
                    <v-text-field
                        v-model="phone"
                        label="Seu celular"
                    ></v-text-field>
                    <v-text-field
                        v-model="secret"
                        label="Senha da banda"
                    ></v-text-field>

                    <v-fade-transition hide-on-leave>
                        <div v-if="kind == 1">
                            <v-text-field
                                v-model="name"
                                label="Seu nome"
                            ></v-text-field>
                            <v-select
                                v-model="role"
                                :items="roles"
                                label="O que você faz na banda?"
                            ></v-select>
                        </div>
                    </v-fade-transition>

                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-spacer></v-spacer>

                    <!-- <v-btn
                        text
                        color="secondary"
                        @click="!kind ? kind = 1 : kind = 0"
                    >
                        {{ btnNewLabel }}
                    </v-btn> -->
                    <v-btn
                        text
                        color="primary"
                        @click="login"
                    >
                        {{ btnLoginLabel }}
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-container>
    </v-slide-y-transition>
</template>

<script>

import axios from 'axios';

import { API_ENDPOINT, API_KEY } from '../commons';

export default {
    name: 'Login',
    data: () => ({
        kind: 0,
        band: '',
        phone: '',
        secret: '',

        name: '',
        role: '',

        bands: [],
        roles: ['Batera', 'Guitarra', 'Baixo', 'Vocal', 'Teclado', 'Groupie']
    }),
    computed: {
        btnNewLabel() {
            return this.kind == 0 ? `Minha primeira vez aqui...` : 'Cancela';
        },
        btnLoginLabel() {
            return this.kind == 0 ? `Bora` : 'Criar conta nova';
        }
    },
    mounted() {
        this.$store.commit('loading', true);

        if (window.localStorage.me) {
            this.$store.commit('me', JSON.parse(window.localStorage.me));
            this.$store.commit('loading', false);
        }
        else {
            axios({
                method: 'GET',
                url: API_ENDPOINT
            }).then(response => {
                this.bands = response.data;
            }).catch(error => {
                console.log(error);
                this.$store.commit('dialog', {
                    title: `Opa, deu ruim...`,
                    text: error,
                    show: true
                });
            }).finally(() => {
                this.$store.commit('loading', false);
            });
        }
    },
    methods: {
        login() {
            this.$store.commit('loading', true);
            axios({
                method: 'POST',
                url: `${API_ENDPOINT}${this.band}/member/${this.phone}`,
                headers: { 'x-api-key': `${API_KEY}${this.secret}` },
                data: {
                    kind: this.kind,
                    secret: this.secret,
                    name: this.name,
                    role: this.role
                }
            }).then(response => {
                this.$store.commit('me', {
                    phone: this.phone,
                    band: this.band,
                    secret: this.secret,
                    name: '',
                    role: '',
                    musics: [],
                    likes: {}
                });
            }).catch(error => {
                this.$store.commit('dialog', {
                    title: `Opa, deu ruim...`,
                    text: `Parece que você informou algo errado. Na dúvida chama o admin da sua banda...`,
                    show: true
                });

                this.$store.commit('loading', false);
            });
        }
    }
}
</script>

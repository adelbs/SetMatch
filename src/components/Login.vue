<template>
    <v-slide-y-transition hide-on-leave>
        <v-container
            class="d-flex justify-center mt-16"
            v-if="!$store.state.loading"
        >
            <v-card width="400">
                <v-card-title>Hey, identify yourself...</v-card-title>
                <v-card-text>
                    <v-select
                        label="Your band"
                        v-model="band"
                        :items="bands"
                    ></v-select>
                    <v-text-field
                        v-model="phone"
                        label="Your phone"
                    ></v-text-field>
                    <v-text-field
                        v-model="secret"
                        label="Band secret"
                    ></v-text-field>

                    <v-fade-transition hide-on-leave>
                        <div v-if="kind == 1">
                            <v-text-field
                                v-model="name"
                                label="Your name"
                            ></v-text-field>
                            <v-select
                                v-model="role"
                                :items="roles"
                                label="Role"
                            ></v-select>
                        </div>
                    </v-fade-transition>

                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn
                        text
                        color="secondary"
                        @click="!kind ? kind = 1 : kind = 0"
                    >
                        {{ btnNewLabel }}
                    </v-btn>
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
        roles: ['Drum', 'Guitar', 'Bass', 'Sing', 'Keyboard', 'Groupie']
    }),
    computed: {
        btnNewLabel() {
            return this.kind == 0 ? `I'm new here...` : 'Cancel';
        },
        btnLoginLabel() {
            return this.kind == 0 ? `Let's go` : 'Create new account';
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
                url: `https://em9qllw72g.execute-api.us-east-1.amazonaws.com/v1`
            }).then(response => {
                this.bands = response.data;
            }).catch(error => {
                console.log(error);
                this.$store.commit('dialog', {
                    title: `ops, there's something wrong...`,
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
                url: `https://em9qllw72g.execute-api.us-east-1.amazonaws.com/v1/${this.band}/member/${this.phone}`,
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
                    title: `ops, wrong...`,
                    text: `Wrong information. Have questions? Talk to your band's admin.`,
                    show: true
                });

                this.$store.commit('loading', false);
            });
        }
    }
}
</script>

<template>
    <div>
        <Resources
            :musicKey="keyMore"
            v-model="showMenuMore"
        ></Resources>

        <v-fade-transition hide-on-leave>
            <v-container
                v-if="!$store.state.loading"
                class="d-flex flex-wrap justify-center mt-3"
            >
                <v-card
                    v-for="music in allMusic"
                    :key="music.key"
                    width="100%"
                    max-width="450"
                    class="ma-2"
                    :color="music.match ? 'yellow lighten-2' : ''"
                >
                    <v-card-title>
                        {{ music.artist }}
                    </v-card-title>
                    <v-card-subtitle>
                        {{ music.title }}
                    </v-card-subtitle>
                    <v-divider></v-divider>
                    <v-card-actions>
                        <v-btn
                            icon
                            @click="more(music.key)"
                            :disabled="$store.state.loading || $store.state.bgLoading"
                        >
                            <v-icon>mdi-dots-vertical</v-icon>
                        </v-btn>
                        <v-spacer></v-spacer>
                        <div v-if="music.match">Deu Match!</div>
                        <v-spacer></v-spacer>
                        <div class="caption mr-2">{{ music.likes }} likes</div>

                        <v-btn
                            icon
                            @click="dislike(music.key)"
                            :disabled="$store.state.loading || $store.state.bgLoading"
                        >
                            <v-icon v-if="music.liked == 'n'">mdi-thumb-down</v-icon>
                            <v-icon v-else>mdi-thumb-down-outline</v-icon>
                        </v-btn>

                        <v-btn
                            icon
                            @click="like(music.key)"
                            :disabled="$store.state.loading || $store.state.bgLoading"
                        >
                            <v-icon v-if="music.liked == 'y'">mdi-thumb-up</v-icon>
                            <v-icon v-else>mdi-thumb-up-outline</v-icon>
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-container>
        </v-fade-transition>
    </div>
</template>

<script>

import { update, saveme, filterMusics, sortMusics } from '../commons';

import Resources from './Resources.vue';

export default {
    name: 'Main',
    components: { Resources },
    data: () => ({
        keyMore: '',
        showMenuMore: false
    }),
    computed: {
        allMusic() {
            let musics = [];
            this.$store.getters.members.forEach(member => musics.push(...member.musics));

            musics = musics.map(music => {
                const likes = this.$store.getters.members.reduce((prev, curr) => curr.likes[music] == 'y' ? prev + 1 : prev, 0);

                return {
                    key: music,
                    artist: music.split('-')[0],
                    title: music.split('-')[1],
                    liked: this.$store.getters.me.likes[music],
                    likes: likes,
                    match: likes > 1 && likes == this.$store.getters.members.length
                }
            });

            return musics.filter(filterMusics).sort(sortMusics);
        }
    },
    mounted() {
        if (!this.$store.state.loggedIn) {
            update();
            this.$store.commit('login', true);
        }
    },
    methods: {
        dislike(key) {
            this.$store.commit('dislikeMusic', key);
            this.$store.commit('me', { ...this.$store.getters.me });

            saveme(true);
        },
        like(key) {
            this.$store.commit('likeMusic', key);
            this.$store.commit('me', { ...this.$store.getters.me });

            saveme(true);
        },
        more(key) {
            this.keyMore = key;
            this.showMenuMore = true;
        },
    }
}
</script>

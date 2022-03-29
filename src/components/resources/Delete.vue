<template>
    <v-dialog
        scrollable
        v-model="show"
        width="500"
    >
        <v-card :loading="$store.state.loading || $store.state.bgLoading">
            <v-card-title>Delete</v-card-title>
            <v-card-text>
                Are you sure? Don't get carried away by emotion...
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    text
                    @click="show = false"
                >
                    No, it's a mistake
                </v-btn>
                <v-btn
                    :disabled="$store.state.loading || $store.state.bgLoading"
                    color="error"
                    text
                    @click="deleteMusic"
                >
                    Yes, delete it!
                </v-btn>
            </v-card-actions>
        </v-card>

    </v-dialog>
</template>

<script>

import { saveme } from '../../commons';

export default {
    name: 'Delete',
    props: ['musicKey', 'value'],
    data: () => ({
    }),
    computed: {
        show: {
            get() { return this.value },
            set(value) { this.$emit('input', value); }
        }
    },
    mounted() {},
    methods: {
        deleteMusic() {
            const me = this.$store.getters.me;

            const index = me.musics.findIndex(music => music == this.musicKey);
            me.musics.splice(index, 1);

            this.$store.commit('me', me);

            saveme();

            this.show = false;
        }
    }
}
</script>
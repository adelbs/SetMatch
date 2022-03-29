<template>
    <div>
        <NewMusic v-model="addMusic"></NewMusic>
        <SortFilter v-model="filter"></SortFilter>
        <SetList v-model="setList"></SetList>
        <About v-model="about"></About>

        <v-app-bar
            app
            dense
        >
            SetMatch

            <v-spacer></v-spacer>

            <v-btn
                icon
                v-if="$store.state.me.name"
                :disabled="$store.state.loading || $store.state.bgLoading"
                @click="addMusic = true"
            >
                <v-icon>mdi-plus</v-icon>
            </v-btn>
            <v-btn
                icon
                v-if="$store.state.me.name"
                :disabled="$store.state.loading || $store.state.bgLoading"
                @click="filter = true"
            >
                <v-icon>mdi-filter-outline</v-icon>
            </v-btn>
            <v-btn
                icon
                v-if="$store.state.me.name"
                :disabled="$store.state.loading || $store.state.bgLoading"
                @click="update"
            >
                <v-icon>mdi-refresh</v-icon>
            </v-btn>
            <v-btn
                icon
                v-if="$store.state.me.name"
                :disabled="$store.state.loading || $store.state.bgLoading"
                @click="setList = true"
            >
                <v-icon>mdi-format-list-bulleted</v-icon>
            </v-btn>
            <v-btn
                icon
                v-if="$store.state.me.name"
                :disabled="$store.state.loading || $store.state.bgLoading"
                @click="about = true"
            >
                <v-icon>mdi-information-outline</v-icon>
            </v-btn>
        </v-app-bar>
    </div>
</template>

<script>

import { update } from '../commons';

import NewMusic from './NewMusic.vue';
import SortFilter from './SortFilter.vue';
import SetList from './SetList.vue';
import About from './About.vue';

export default {
    name: 'AppBar',
    components: { NewMusic, SortFilter, SetList, About },
    data: () => ({
        addMusic: false,
        filter: false,
        setList: false,
        about: false
    }),
    methods: {
        update,
        test() {
            this.$store.commit('alert', { type: 'success', message: 'Music saved' });
        }
    }
}
</script>
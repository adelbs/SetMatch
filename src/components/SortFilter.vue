<template>
    <v-dialog
        v-model="show"
        width="400"
    >
        <v-card>
            <v-card-title>
                Filter
            </v-card-title>

            <v-card-text>
                <v-switch
                    dense
                    v-model="hideThumbsDown"
                    label="Hide my thumbs down"
                ></v-switch>
                <v-switch
                    dense
                    v-model="showOnlyUnvoted"
                    label="Show only unvoted musics"
                ></v-switch>
                <v-switch
                    dense
                    v-model="showOnlyMatched"
                    label="Show only matched musics"
                ></v-switch>
                <v-switch
                    dense
                    v-model="showOnlyMyMusics"
                    label="Show only my musics"
                ></v-switch>
                <v-divider></v-divider>
                <v-select
                    v-model="sortBy"
                    class="mt-3"
                    label="Sort by"
                    :items="['Default', 'Artist', 'Title', 'Likes']"
                ></v-select>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    text
                    @click="clearAll"
                >
                    Clear All
                </v-btn>
                <v-btn
                    color="primary"
                    text
                    @click="show = false"
                >
                    Ok
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>

export default {
    name: 'SortFilter',
    props: ['value'],
    computed: {
        show: {
            get() { return this.value },
            set(value) { this.$emit('input', value); }
        },
        hideThumbsDown: {
            get() { return this.$store.getters.filter.hideThumbsDown },
            set(value) { this.$store.commit('filter', { key: 'hideThumbsDown', value }) }
        },
        showOnlyUnvoted: {
            get() { return this.$store.getters.filter.showOnlyUnvoted },
            set(value) { this.$store.commit('filter', { key: 'showOnlyUnvoted', value }) }
        },
        showOnlyMatched: {
            get() { return this.$store.getters.filter.showOnlyMatched },
            set(value) { this.$store.commit('filter', { key: 'showOnlyMatched', value }) }
        },
        showOnlyMyMusics: {
            get() { return this.$store.getters.filter.showOnlyMyMusics },
            set(value) { this.$store.commit('filter', { key: 'showOnlyMyMusics', value }) }
        },
        sortBy: {
            get() { return this.$store.getters.filter.sortBy },
            set(value) { this.$store.commit('filter', { key: 'sortBy', value }) }
        },
    },
    methods: {
        clearAll() {
            this.$store.commit('clearFilter');
            this.show = false;
        }
    }
}
</script>
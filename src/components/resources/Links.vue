<template>
    <v-dialog
        scrollable
        v-model="show"
        width="500"
    >
        <v-card :loading="$store.state.loading || $store.state.bgLoading">
            <v-card-title>Links</v-card-title>
            <v-card-text>
                <v-text-field
                    :disabled="$store.state.loading || $store.state.bgLoading"
                    class="mt-3"
                    label="Titulo"
                    v-model="label"
                    dense
                ></v-text-field>
                <v-text-field
                    :disabled="$store.state.loading || $store.state.bgLoading"
                    label="Link"
                    v-model="link"
                    dense
                ></v-text-field>
                <div class="text-right mb-3">
                    <v-btn
                        :disabled="$store.state.loading || $store.state.bgLoading"
                        outlined
                        small
                        @click="addLink"
                    >Add</v-btn>
                </div>
                <v-divider></v-divider>
                <v-list>
                    <v-list-item
                        :disabled="$store.state.loading || $store.state.bgLoading"
                        v-for="(link, i) of links"
                        :key="i"
                    >
                        <v-list-item-content>
                            <v-list-item-title>
                                <a
                                    :href="link.link"
                                    target="_blank"
                                >{{ link.label }}</a>
                            </v-list-item-title>
                        </v-list-item-content>
                        <div>
                            <v-btn
                                :disabled="$store.state.loading || $store.state.bgLoading"
                                icon
                                small
                                @click="removeLink(i)"
                            >
                                <v-icon>mdi-delete</v-icon>
                            </v-btn>
                        </div>
                    </v-list-item>
                </v-list>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    text
                    @click="show = false"
                >
                    Fechar
                </v-btn>
            </v-card-actions>
        </v-card>

    </v-dialog>
</template>

<script>

import { getResource, saveResource } from '../../commons';

export default {
    name: 'Links',
    props: ['musicKey', 'value'],
    data: () => ({
        label: '',
        link: '',
        links: []
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
            this.label = '';
            this.link = '';

            getResource(`${this.musicKey}-links`).then(links => {
                this.links = [];
                if (links) this.links = links;
            });
        },
        addLink() {
            this.links.push({ label: this.label, link: this.link });
            this.label = '';
            this.link = '';

            saveResource(`${this.musicKey}-links`, JSON.stringify(this.links));
        },
        removeLink(i) {
            this.links.splice(i, 1);
            saveResource(`${this.musicKey}-links`, JSON.stringify(this.links));
        }
    },
    watch: {
        'musicKey': function () {
            this.load();
        }
    }
}
</script>
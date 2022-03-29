<template>
    <v-dialog
        scrollable
        v-model="show"
        width="500"
    >
        <v-card :loading="$store.state.loading || $store.state.bgLoading">
            <v-card-title>Lyrics</v-card-title>
            <v-card-text>
                <v-textarea
                    v-if="editing"
                    :disabled="$store.state.loading || $store.state.bgLoading"
                    auto-grow
                    v-model="lyric"
                    placeholder="Write the lyric here"
                ></v-textarea>
                <div
                    v-else
                    :style="{'font-size': `${size}px`, 'line-height': 'normal'}"
                    v-html="formattedLyric"
                >
                </div>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-btn
                    v-if="!editing"
                    icon
                    small
                    outlined
                    @click="size -= 5"
                >
                    <v-icon>mdi-minus</v-icon>
                </v-btn>
                <v-btn
                    v-if="!editing"
                    icon
                    small
                    outlined
                    @click="size += 5"
                >
                    <v-icon>mdi-plus</v-icon>
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn
                    v-if="editing"
                    :disabled="$store.state.loading || $store.state.bgLoading"
                    color="primary"
                    text
                    @click="save"
                >
                    Save
                </v-btn>
                <v-btn
                    v-if="!editing"
                    :disabled="$store.state.loading || $store.state.bgLoading"
                    color="success"
                    text
                    @click="editing = true"
                >
                    Edit
                </v-btn>
                <v-btn
                    text
                    @click="show = false"
                >
                    Close
                </v-btn>

            </v-card-actions>
        </v-card>

    </v-dialog>
</template>

<script>

import { getResource, saveResource } from '../../commons';

export default {
    name: 'Lyrics',
    props: ['musicKey', 'value'],
    data: () => ({
        editing: false,
        size: 15,
        lyric: ''
    }),
    computed: {
        show: {
            get() { return this.value },
            set(value) { this.$emit('input', value); }
        },
        formattedLyric() {
            let result = `There is no Lyric saved here yet.`;

            if (this.lyric) {
                result = this.lyric;
                result = result.replaceAll('\n', '<br>');
            }

            return result;
        }
    },
    mounted() {
        this.load();
    },
    methods: {
        load() {
            this.editing = false;
            this.lyric = '';
            getResource(`${this.musicKey}-lyrics`).then(lyric => this.lyric = lyric);
        },
        save() {
            saveResource(`${this.musicKey}-lyrics`, this.lyric);
            this.editing = false;
        }
    },
    watch: {
        'musicKey': function () {
            this.load();
        }
    }
}
</script>
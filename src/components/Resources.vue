<template>
    <div>
        <v-dialog
            v-model="show"
            width="500"
        >
            <v-card>
                <v-list>
                    <v-list-item
                        link
                        v-for="(menu, i) of menuMore"
                        :key="i"
                        @click="openMore(menu.resource)"
                    >
                        <v-list-item-icon>
                            <v-icon>{{ menu.icon }}</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>{{ menu.caption }}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-divider></v-divider>
                    <v-list-item
                        link
                        @click="openMore()"
                    >
                        <v-list-item-icon>
                            <v-icon>mdi-cancel</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>Nevermind...</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-card>
        </v-dialog>

        <Notes
            v-model="showResource"
            :musicKey="musicKey"
            v-if="resource == 'notes'"
        ></Notes>
        <Links
            v-model="showResource"
            :musicKey="musicKey"
            v-if="resource == 'links'"
        ></Links>
        <Lyrics
            v-model="showResource"
            :musicKey="musicKey"
            v-if="resource == 'lyrics'"
        ></Lyrics>
        <Delete
            v-model="showResource"
            :musicKey="musicKey"
            v-if="resource == 'delete'"
        ></Delete>
    </div>
</template>

<script>

import Notes from './resources/Notes.vue';
import Links from './resources/Links.vue';
import Lyrics from './resources/Lyrics.vue';
import Delete from './resources/Delete.vue';

export default {
    name: 'Resources',
    props: ['musicKey', 'value'],
    components: { Notes, Links, Lyrics, Delete },
    data: () => ({
        showResource: false,
        resource: ''
    }),
    computed: {
        show: {
            get() { return this.value },
            set(value) { this.$emit('input', value); }
        },
        menuMore() {
            const menu = [
                { icon: 'mdi-text', caption: 'Notes', resource: 'notes' },
                { icon: 'mdi-link', caption: 'Links', resource: 'links' },
                { icon: 'mdi-microphone-variant', caption: 'Lyrics', resource: 'lyrics' },
            ];

            if (this.$store.getters.me.musics.find(item => item == this.musicKey))
                menu.push({ icon: 'mdi-delete', caption: `Delete this shit`, resource: 'delete' });

            return menu;
        }
    },
    methods: {
        openMore(resource) {
            this.show = false;

            if (resource) {
                this.resource = resource;
                this.showResource = true;
            }
        },
    }
}
</script>

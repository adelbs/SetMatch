<template>
    <v-dialog
        v-model="show"
        width="500"
    >
        <v-card>
            <v-card-title>
                {{ $store.state.dialog.title }}
            </v-card-title>

            <v-card-text v-html="$store.state.dialog.text">
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="primary"
                    text
                    @click="show = false"
                >
                    Got it
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    name: 'Dialog',
    computed: {
        show: {
            get() {
                return this.$store.state.dialog.show;
            },
            set(value) {
                this.$store.commit('dialog', {
                    title: this.$store.state.dialog.title,
                    text: this.$store.state.dialog.text,
                    show: value
                });
            }
        }
    }
}
</script>

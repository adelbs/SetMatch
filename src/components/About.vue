<template>
    <v-dialog
        scrollable
        v-model="show"
        width="500"
    >
        <v-card :loading="$store.state.loading || $store.state.bgLoading">
            <v-card-title>About me...</v-card-title>
            <v-card-text>
                Hi, {{ name }}! My name is Felipe Jacob. 
                <br><br>
                I created this app just for fun :) 
                <br>
                Hope you enjoy it.
                <br><br>
                If you are nerd like me, you can check out the source code here:
                <br>
                <a href="https://github.com/adelbs/SetMatch" target="_blank">https://github.com/adelbs/SetMatch</a>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    :disabled="$store.state.loading || $store.state.bgLoading"
                    color="primary"
                    text
                    @click="show = false"
                >
                    Great! You are the best!
                </v-btn>
            </v-card-actions>
        </v-card>

    </v-dialog>
</template>

<script>

export default {
    name: 'About',
    props: ['value'],
    computed: {
        show: {
            get() { return this.value },
            set(value) { this.$emit('input', value); }
        },
        name() {
            return this.$store.getters.me.name;
        }
    }
}
</script>
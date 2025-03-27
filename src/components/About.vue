<template>
    <v-dialog
        scrollable
        v-model="show"
        width="500"
    >
        <v-card :loading="$store.state.loading || $store.state.bgLoading">
            <v-card-title>Sobre mim...</v-card-title>
            <v-card-text>
                E aí, {{ name }}! Eu sou o Felipe Jacob. 
                <br><br>
                Criei esse app por diversão, e também porque não tinha nada melhor pra fazer num certo domingo a noite :)
                <br><br>
                Espero que curta!
                <br><br>
                Se você é nerd, como eu, pode dar uma olhada no código fonte aqui:
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
                    Valeu!
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
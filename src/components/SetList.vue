<template>
    <v-dialog
        scrollable
        v-model="show"
        width="500"
    >
        <v-card :loading="$store.state.loading || $store.state.bgLoading">
            <v-card-title>SetList...</v-card-title>
            <v-card-text>
                Não implementado ainda... Um dia arrumo tempo pra isso...
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    :disabled="$store.state.loading || $store.state.bgLoading"
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

export default {
    name: 'SetList',
    props: ['value'],
    computed: {
        show: {
            get() { return this.value },
            set(value) { this.$emit('input', value); }
        }
    }
}
</script>
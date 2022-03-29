<template>
    <v-slide-y-transition>
        <v-alert
            dense
            v-if="$store.state.alert.show"
            :type="$store.state.alert.type"
        >{{ $store.state.alert.message }}</v-alert>
    </v-slide-y-transition>
</template>

<script>
export default {
    name: 'Alert',
}
</script>

<style scoped>
.v-alert {
    position: fixed;
    left: 50%;
    top: 40px;
    transform: translate(-50%, -50%);
    margin: 0 auto;
    z-index: 100;
}
</style>
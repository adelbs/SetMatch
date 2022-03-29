<template>
    <v-app>
        <AppBar></AppBar>
        <Alert></Alert>
        <v-main>
            <Dialog></Dialog>
            <Loading
                :show="$store.state.loading"
                text="Just wait..."
            ></Loading>

            <Login v-if="!$store.state.me.phone"></Login>
            <Main v-else></Main>
        </v-main>
    </v-app>
</template>

<script>

import AppBar from './components/AppBar.vue'
import Alert from './components/Alert.vue'
import Dialog from './components/Dialog.vue'
import Loading from './components/Loading.vue'
import Login from './components/Login.vue'
import Main from './components/Main.vue'

export default {
    name: 'App',
    components: {
        AppBar, Alert, Dialog, Loading, Login, Main
    },
    methods: {
        test() {
            this.$store.commit('loading', false);
        }
    }
}
</script>
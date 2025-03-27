import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        loggedIn: false,
        loading: true,
        bgLoading: false,
        alert: {
            show: false,
            type: '',
            message: ''
        },
        dialog: {
            show: false,
            title: '',
            text: ''
        },
        me: {
            phone: 0,
            name: '',
            band: '',
            secret: '',
            musics: [],
            likes: {}
        },
        filter: {
            hideThumbsDown: true,
            showOnlyUnvoted: false,
            showOnlyMatched: false,
            showOnlyMyMusics: false,
            sortBy: 'Padrão'
        },
        members: []
    },
    getters: {
        me: (state) => state.me,
        members: (state) => state.members,
        filter: (state) => state.filter
    },
    mutations: {
        login(state, value) {
            state.loggedIn = value;
        },
        loading(state, value) {
            state.loading = value;
        },
        bgLoading(state, value) {
            state.bgLoading = value;
        },
        alert(state, value) {
            state.alert.type = value.type;
            state.alert.message = value.message;
            state.alert.show = true;
            setTimeout(() => state.alert.show = false, 3000);
        },
        dialog(state, value) {
            state.dialog = value;
        },
        me(state, value) {
            state.me = value;
            window.localStorage.me = JSON.stringify(value);
        },
        dislikeMusic(state, value) {
            if (!state.me.likes[value] || state.me.likes[value] == 'y') state.me.likes[value] = 'n';
            else state.me.likes[value] = '';
        },
        likeMusic(state, value) {
            if (!state.me.likes[value] || state.me.likes[value] == 'n') state.me.likes[value] = 'y';
            else state.me.likes[value] = '';
        },
        resetMembers(state) {
            state.members = [];
        },
        pushMember(state, member) {
            state.members.push(member);
        },
        music(state, value) {
            state.me.musics.push(value);
            state.me.likes[value] = 'y';
        },
        filter(state, value) {
            state.filter[value.key] = value.value;
        },
        clearFilter(state) {
            state.filter = {
                hideThumbsDown: true,
                showOnlyUnvoted: false,
                showOnlyMatched: false,
                showOnlyMyMusics: false,
                sortBy: 'Padrão'
            };
        }
    }
});

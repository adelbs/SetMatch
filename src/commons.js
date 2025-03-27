import axios from 'axios';
import store from './store';

export const API_ENDPOINT = 'https://[api]';
export const API_KEY = '[key]-'

export async function update() {

    store.commit('loading', true);

    try {
        let response = await axios({
            method: 'GET',
            url: `${API_ENDPOINT}${store.state.me.band}/member`,
            headers: { 'x-api-key': `${API_KEY}${store.state.me.secret}` },
        });

        store.commit('resetMembers');

        const members = response.data;
        for (let i = 0; i < members.length; i++) {
            response = await axios({
                method: 'GET',
                url: `${API_ENDPOINT}${store.state.me.band}/member/${members[i]}`,
                headers: { 'x-api-key': `${API_KEY}${store.state.me.secret}` },
            });

            store.commit('pushMember', response.data);
            if (members[i] == store.state.me.phone) {
                store.commit('me', {
                    phone: members[i],
                    name: response.data.name,
                    band: store.state.me.band,
                    secret: store.state.me.secret,
                    role: response.data.role,
                    musics: response.data.musics,
                    likes: response.data.likes
                });
            }
        }

    }
    catch (error) {
        console.log(error);
        store.commit('dialog', {
            title: `Opa, deu ruim...`,
            text: error,
            show: true
        });
    }
    finally {
        store.commit('loading', false);
    }
}

export function saveme(dontAlert) {
    store.commit('bgLoading', true);

    axios({
        method: 'POST',
        url: `${API_ENDPOINT}${store.getters.me.band}/member/${store.getters.me.phone}`,
        headers: { 'x-api-key': `${API_KEY}${store.state.me.secret}` },
        data: {
            kind: 2,
            secret: store.getters.me.secret,
            name: store.getters.me.name,
            role: store.getters.me.role,
            musics: store.getters.me.musics,
            likes: store.getters.me.likes
        }
    })
        .then(response => {
            if (!dontAlert) store.commit('alert', { type: 'success', message: 'Música Salva!' });
        })
        .catch(error => {
            console.log(error);
            store.commit('dialog', {
                title: `Opa, deu ruim...`,
                text: error,
                show: true
            });
        }).finally(() => store.commit('bgLoading', false));
}

export async function getResource(key) {
    store.commit('bgLoading', true);

    let result = '';

    try {
        result = await axios({
            method: 'GET',
            url: `${API_ENDPOINT}${store.getters.me.band}/music/${key}`,
            headers: { 'x-api-key': `${API_KEY}${store.state.me.secret}` },
        });

        result = result.data;
    }
    catch (error) {
        console.log(error);
    }
    finally {
        store.commit('bgLoading', false);
    }

    return result;
}

export function saveResource(key, data) {
    store.commit('bgLoading', true);

    axios({
        method: 'POST',
        url: `${API_ENDPOINT}${store.getters.me.band}/music/${key}`,
        headers: { 'x-api-key': `${API_KEY}${store.state.me.secret}` },
        data
    })
        .then(response => {
            store.commit('alert', { type: 'success', message: 'Música Salva!' });
        })
        .catch(error => {
            console.log(error);
            store.commit('dialog', {
                title: `Opa, deu ruim...`,
                text: error,
                show: true
            });
        }).finally(() => store.commit('bgLoading', false));
}

export function filterMusics(item, index, array) {
    const filter = store.getters.filter;
    const me = store.getters.me;

    let show = true;

    if (show && filter.hideThumbsDown) {
        show = (me.likes[item.key] != 'n');
    }

    if (show && filter.showOnlyUnvoted) {
        show = (!me.likes[item.key]);
    }

    if (show && filter.showOnlyMatched) {
        show = (item.match);
    }

    if (show && filter.showOnlyMyMusics) {
        show = (store.getters.me.musics.find(myMusic => myMusic == item.key));
    }

    return show;
}

export function sortMusics(a, b) {
    const sortBy = store.getters.filter.sortBy;
    let result = 0;

    if (sortBy == 'Artista/Banda') {
        if (a.artist > b.artist) result = 1;
        else if (a.artist < b.artist) result = -1;
        else result = 0;
    }
    else if (sortBy == 'Música') {
        if (a.title > b.title) result = 1;
        else if (a.title < b.title) result = -1;
        else result = 0;
    }
    else if (sortBy == 'Likes') {
        if (a.likes > b.likes) result = -1;
        else if (a.likes < b.likes) result = 1;
        else result = 0;
    }

    return result;
}
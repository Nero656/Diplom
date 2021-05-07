import router from "@/router";

const state = {
    auth: false,
}
const getters = {}
const mutations = {
    Auth(state, auth) {
        state.auth = auth;
    },
    Logout(State, auth){
        state.auth = auth;
    }
}
const actions = {
    Auth({commit}) {
        commit('Auth', true);
        return  router.push('/admin-panel')
    },
    Logout({commit}) {
        commit('Logout', false);
        return  router.push('/')
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}

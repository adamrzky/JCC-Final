export default {
    namespaced: true,
    state: {
        title: '',
    },
    mutations: {
        setTitle: (state, payload) => {
            state.title = payload
        }
    },
    actions: {
        setTitle : ({ commit }, payload) => {
            commit('setTitle', payload)
        }
    },
    getters: {
        title: state => state.title,
    },
}
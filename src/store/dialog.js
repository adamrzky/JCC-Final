export default {
    namespaced: true,
    state: {
        status: false,
        component: '',
        params: {},
        endForm: false 
    },
    mutations: {
        setStatus: (state, status) => {
            state.status = status
        },
        setComponent: (state, {component, params}) => {
            state.component = component
            state.params = params
        },
        setEndForm: (state, endForm) => {
            state.endForm = endForm
        },
    },
    actions: {
        setStatus: ({commit}, status) => {
            commit('setStatus', status)
        },
        setComponent: ({commit}, {component, params}) => {
            commit('setComponent', {component, params})
            commit('setStatus', true)
        },
        setEndForm: ({commit}, endForm) => {
            commit('setEndForm', endForm)
        },
    },
    getters: {
        status: state => state.status,
        component: state => state.component,
        params: state => state.params,
        endForm: state => state.endForm,
    },
}
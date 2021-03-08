const state = {
    user: {
        lastPage: null
    },
}
const getters = {
    get: (state, getters, rootState) => () => {
        return state.user
    },
}

const mutations = {
    set (state, payload) {
        state.user = payload
    },
}

const actions = {
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}

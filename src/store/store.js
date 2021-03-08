import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate"
import user from './modules/user'

const plugins = typeof window === 'undefined'
    ? []
    : [createPersistedState({
        storage: window.sessionStorage
    })]

const store = createStore({
    modules: {
        user
    },
    plugins
})

export default store

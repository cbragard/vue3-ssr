import {
    createRouter,
    createMemoryHistory,
    createWebHistory
} from 'vue-router'

const isServer = typeof window === 'undefined'
const history = isServer
    ? createMemoryHistory()
    : createWebHistory()

const routes = [
    {
        path: "/",
        name: "Home",
        component: require('./views/home/home.vue').default
    }
]

const router = createRouter({
  history,
  routes,
})

export {
    routes,
    router
}

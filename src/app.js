import { createSSRApp, createApp } from 'vue'
import { createI18n, useI18n } from 'vue-i18n'

import { router } from './router'
import store from './store/store'
import messages from './messages.json'

import App from './app.vue'

export default function buildApp() {
    const i18n = new createI18n({
        locale: 'en',
        messages
    })
    const app = typeof window === 'undefined'
        ? createSSRApp(App)
        : createApp(App)

    app.use(router)
    app.use(store)
    app.use(i18n)

    return { app, router, store }
}

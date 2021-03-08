import moment from 'moment'
import { socketio } from 'socket.io-client'

import buildApp from './app'

__webpack_public_path__ = process.env.NODE_HOST

const { app, router, store } = buildApp()
const storeInitialState = window.INITIAL_DATA

if (storeInitialState) {
    store.replaceState(storeInitialState)
}

app.config.globalProperties.moment = moment
app.config.globalProperties.$socketio = socketio

router
    .isReady()
    .then(() => {
        app.mount('#app', true)
    })

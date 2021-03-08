import fs from 'fs'
import { renderToString } from '@vue/server-renderer'


import buildApp from '../app'
import { routes } from '../router'
import Util from './util'

const vue = ({ req, res, db }) => {
    const manifest = fs.readFileSync('/app/build/manifest.json')
    const js = JSON.parse(manifest)['client.js']
    const { router, app, store } = buildApp()
    Util.log(`req url: "${req.url}" - JS client file: "${js}"`)
    router.push(req.url)
    switch(req.url) {
        default:
            store.commit('user/set', {
                lastPage: req.url
            })
            break
    }
    router
        .isReady()
        .finally(async() => {
            const html = await renderToString(app)
            res.end(`
                <html>
                    <head>
                        <title>VUE-SSR</title>
                    </head>
                    <body>
                        ${html}
                        <script src="${process.env.NODE_HOST}/${js}"></script>
                    </body>
                </html>
            `)
        })
}

export default vue

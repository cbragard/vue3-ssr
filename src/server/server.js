import fs from 'fs'
import https from 'https'
import http from 'http'
import express from 'express'
import compression from 'compression'
import session from 'express-session'
import sessionFileStore from 'session-file-store'
const fileStore = sessionFileStore(session)
import sharedsession from "express-socket.io-session"
import socketIO from 'socket.io'
const mongo = require('mongodb').MongoClient
import Util from './util'
import vue from './vue'

const mhost = process.env.MONGODB_APPLICATION_HOST
const mlogin = process.env.MONGODB_APPLICATION_USER
const mpwd = process.env.MONGODB_APPLICATION_PWD
const mdb = process.env.MONGODB_APPLICATION_DATABASE
const mongourl = `mongodb+srv://${mlogin}:${mpwd}@${mhost}/${mdb}`
const app = express()
const appStatic = express()
const sessionMiddleware = session({
    store: new fileStore({ path: '/app/data/tmp' }),
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
    secret: 'vue3-SSR',
    resave: true,
    saveUninitialized: true
})
app.use(express.static('build'))
app.use(compression())
app.use(express.json())
app.use(express.urlencoded())
app.use(sessionMiddleware)

appStatic.use(express.static('build'))
appStatic.use(compression())
appStatic.use(express.json())
appStatic.use(express.urlencoded())

mongo.connect(mongourl, async(err, client) => {
    if(err) {
        Util.log(`mongoDB error ${err.toString()}`)
        if (client) {
            client.close()
        }
    } else {
        const db = client.db(mdb)
        let httpServer
        let httpsServer
        if (process.env.NODE_ENV !== 'development') {
            const key = fs.readFileSync('/app/data/ssl/server.key')
            const cert = fs.readFileSync('/app/data/ssl/server.cert')
            httpsServer = https.Server({ cert, key }, app)
            httpServer = http.Server(appStatic)
            httpsServer.listen(443)
            httpServer.listen(80)
        } else {
            httpsServer = http.Server(app)
            httpsServer.listen(80)
        }
        const io = socketIO(httpsServer, {
            cors: { origin: '*' }
        })
        io.use(sharedsession(sessionMiddleware))
        app.get('/favicon.ico', (req, res) => res.status(200).send())
        app.all('*', (req, res) => vue({ req, res, db }))
        require('./socket')(db, io)
    }
})

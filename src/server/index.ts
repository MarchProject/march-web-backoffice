import express, { Router } from 'express'
import next from 'next'
import { init } from '../router/common'
import cookieParser from 'cookie-parser'
import * as serverConfig from '../config/server'
import { ServerConfig } from '../types/config'
import http from 'http'
import bodyParser from 'body-parser'
import session, { SessionOptions } from 'express-session'
import { v4 as uuidv4 } from 'uuid'
// import fs from 'fs'

export async function start() {
  global.config = serverConfig.init(process.env)
  const basePath = process.env.BASE_PATH
  const config: ServerConfig = global.config
  const dev = process.env.NODE_ENV !== 'production'
  const nextServer = next({ dev })
  // const handle = nextServer.getRequestHandler()
  const expressServer = express()
  expressServer.use(cookieParser())

  expressServer.use(bodyParser.json())
  expressServer.use(bodyParser.urlencoded({ extended: false }))

  const sessionOptions: SessionOptions = {
    secret: 'secret_mak_mak',
    resave: false,
    saveUninitialized: false,
    genid: uuidv4,
    cookie: {
      // 1 day
      maxAge: 24 * 60 * 60 * 1000 * 7,
    },
  }
  expressServer.use(session(sessionOptions))

  expressServer.use(`${basePath}/_next`, express.static('.next'))
  expressServer.use(`${basePath}/public`, express.static('public'))
  // const tt = 'rr'
  // const key = fs.readFileSync('./key.pem')
  // const cert = fs.readFileSync('./cert.pem')
  // // console.log(key, cert)
  const router = Router()
  expressServer.use(init(router, nextServer))
  expressServer.use(router)

  // const httpServer = https.createServer({ key: key, cert: cert }, expressServer) //test https AD
  const httpServer = http.createServer(expressServer)

  nextServer
    .prepare()
    .then(() => {
      const port = config.port
      const url = `http://0.0.0.0:${port}/backoffice`

      // expressServer.get('*', (req, res) => {
      //   return handle(req, res)
      // })

      httpServer.listen({ port }, () => {
        console.log(`REST server is ready at ${url}`)
      })
    })
    .catch((ex) => {
      console.error(ex.stack)
      process.exit(1)
    })
}

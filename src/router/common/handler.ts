import { NextServer } from 'next/dist/server/next'
import { Request, Response, Router } from 'express'
import url from 'url'
import { Route } from './types'
import { homeRoute, permissionRoute } from '../home'
import { validateAccessToken } from '../../middleware/auth'
import { azureAdLoginPath, getLoginRoute } from '../auth'
import { setCookieSignIn } from '../../core/services/auth'
import {
  inventoryRoute,
  inventoryCreateRoute,
  inventoryUpdateRoute,
  inventoryViewRoute,
} from '../inventory'
import { validateScope } from '../../middleware/scope'
import { salesRoute } from '../sales'
import { dashboardRoute } from '../dashboard'

export const routes: Route[] = [
  homeRoute,
  salesRoute,
  dashboardRoute,

  inventoryCreateRoute,
  inventoryUpdateRoute,
  inventoryViewRoute,
  inventoryRoute,

  permissionRoute,
]
function getBasePath() {
  return process.env.BASE_PATH ?? '/backoffice'
}

function handleLoginPage(req: Request, res: Response, nextServer: NextServer) {
  const logPrefix = '[router.renderLoginPage]'
  const parsedUrl = url.parse(req.url, true)
  const { query } = parsedUrl
  console.log(logPrefix)

  return nextServer.render(req, res, getLoginRoute().path, query)
}

function handlePage(req: Request, res: Response, nextServer: NextServer) {
  const basePath = getBasePath()
  const parsedUrl = url.parse(req.url, true)
  const { pathname, query } = parsedUrl as any
  const _pathname = pathname
    .replace(basePath, '')
    .replace('/en', '')
    .replace('/th', '')
  return nextServer.render(req, res, _pathname, query)
}

export function init(router: Router, nextServer: NextServer) {
  const logPrefix = 'router.init'
  console.log({ logPrefix })

  const basePath = getBasePath()
  console.log(logPrefix, { basePath })

  const handleNextRequest = nextServer.getRequestHandler()

  router.get(
    //
    /\/uam\/login/,
    (_, res, next) => {
      const uamLoginEnabled = global.config.uamLoginEnabled
      console.log({ uamLoginEnabled })

      if (!uamLoginEnabled) {
        return res.redirect(`${basePath}${azureAdLoginPath}`)
      }

      return next()
    },
  )

  router.get(
    //
    basePath,
    (req, res) => handleLoginPage(req, res, nextServer),
  )

  routes.forEach((route: any) => {
    router.get(
      route.regex,
      route.auth ? validateAccessToken : (_, __, next) => next(),
      (req, res, next) => validateScope(req, res, next),
      (req, res) => handlePage(req, res, nextServer),
    )
  })

  router.post('/backoffice/api/signIn', async (req: Request, res: Response) => {
    console.log({ req: req.body })
    try {
      const response = await setCookieSignIn(
        {
          access_token: req.body.access_token,
          refresh_token: req.body.refresh_token,
        },
        res,
      )
      res.send(response)
    } catch (error) {
      res.status(error?.response?.data?.statusCode).send({
        message: error?.response?.data?.message,
      })
    }
  })

  router.get('*', (req: Request, res: Response) => {
    const logPrefix = '[controller static resources]'
    const parsedUrl = url.parse(req.url, true)

    console.log(logPrefix, parsedUrl.pathname)
    return handleNextRequest(req, res, parsedUrl)
  })

  return router
}

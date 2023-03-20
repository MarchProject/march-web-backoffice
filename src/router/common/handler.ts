import { NextServer } from 'next/dist/server/next'
import { Request, Response, Router } from 'express'
import url from 'url'
import { Route } from './types'
import { homeRoute } from '../home'
import { validateAccessToken } from '../../middleware/auth'
import { uamLoginRoute, userLoginRoute } from '../user'
import { azureAdLoginPath, getLoginRoute } from '../auth'
// import {
//   signIn,
//   signInWithAzureAD,
//   signOut,
// } from '../../core/services/server/auth'
import {
  userRoleUpdateRoute,
  usersManagementApprovalStepRoute,
  usersManagementUserCreateRoute,
  usersManagementUserRoleCreateRoute,
  usersManagementUserRoleRoute,
  usersManagementUserRoute,
  userUpdateRoute,
} from '../users-management'
import { shopRolesManagementRoute } from '../shop-management'
import { setCookieSignIn } from '../../core/services/auth'
// import { validateScope } from '../../middleware/scope'

export const routes: Route[] = [
  homeRoute,
  userLoginRoute,
  uamLoginRoute,

  //user-management/user
  usersManagementUserRoute,
  usersManagementUserCreateRoute,
  userUpdateRoute,

  //user-management/user-role
  usersManagementUserRoleRoute,
  usersManagementUserRoleCreateRoute,
  userRoleUpdateRoute,

  //user-management/approval
  usersManagementApprovalStepRoute,

  ////agent-management/
  shopRolesManagementRoute,
]
function getBasePath() {
  return process.env.BASE_PATH ?? '/backoffice'
}

function handleLoginPage(req: Request, res: Response, nextServer: NextServer) {
  //azure
  const logPrefix = '[router.renderLoginPage]'
  const parsedUrl = url.parse(req.url, true)
  const { query } = parsedUrl
  // const loginPage = '/user/login'
  const loginPage = getLoginRoute().path
  console.log(logPrefix, { loginPage })

  return nextServer.render(
    req,
    res,
    getLoginRoute().path,
    // loginPage,
    query,
  )
}

function handlePage(req: Request, res: Response, nextServer: NextServer) {
  const basePath = getBasePath()
  const parsedUrl = url.parse(req.url, true)
  const { pathname, query } = parsedUrl as any
  const _pathname = pathname
    .replace(basePath, '')
    .replace('/en', '')
    .replace('/th', '')

  // console.log('test', { pathname, _pathname, query })

  return nextServer.render(req, res, _pathname, query)
}

// async function signInApi(req: Request, res: Response) {
//   try {
//     const response = await signIn(
//       {
//         username: req.body.username,
//         password: req.body.password,
//       },
//       res,
//     )
//     return response
//   } catch (error) {
//     console.log('signInApi', error)
//     return Promise.reject(error)
//   }
// }

// async function signOutApi(res: Response) {
//   const response = await signOut(res)
//   console.log({ response }, 'signOutApi')
//   return response
// }

export function init(router: Router, nextServer: NextServer) {
  //

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
        // /user/login
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
      // (req, res, next) => validateScope(req, res, next, route.path),
      (req, res) => handlePage(req, res, nextServer),
    )
  })

  router.post('/backoffice/api/signIn', async (req: Request, res: Response) => {
    try {
      const response = await setCookieSignIn(
        {
          access_token: req.body.access_token,
        },
        res,
      )
      res.send(response)
    } catch (error) {
      res.status(error.response.data.statusCode).send({
        message: error.response.data.message,
      })
    }
  })

  // router.post('/backoffice/api/signOut', async (_: Request, res: Response) => {
  //   const response = await signOut(res)
  //   res.send(response)
  // })

  // router.post(
  //   '/backoffice/api/logout',
  //   async (req: Request, res: Response) => {

  //     const response =  await signInApi(req, res)
  //     res.send(response)
  //   },
  // )

  router.get('*', (req: Request, res: Response) => {
    const logPrefix = '[controller static resources]'
    const parsedUrl = url.parse(req.url, true)

    console.log(logPrefix, parsedUrl.pathname)

    return handleNextRequest(req, res, parsedUrl)
  })

  return router
}

import { NextFunction, Request, Response } from 'express'
import { CookiesKey } from '../constant/index'
import jwt from 'jsonwebtoken'
// import { uam } from 'src/types/uam'
import { scopeMenuRoute } from '../router/common/menu'
import {
  generateMenuResponse,
  generatePathResponse,
} from '../utils/common/generateResponse'
interface JwtPayload {
  role: string
  info: {
    functions: string[]
    page: {
      [key: string]: string[]
    }
  }
  deviceId: string
  userId: string
  shopsId: string
  userName: string
  iat: number
  exp: number
}

export async function validateScope(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const logPrefix = '[middleware.auth.validateScope]'
  console.log(logPrefix)
  const accessToken = req.cookies[CookiesKey.accessToken]

  const decoded = jwt.decode(accessToken) as JwtPayload
  const scopes = decoded?.info?.functions
  const page = decoded?.info?.page
  const path = req.originalUrl.replace('/backoffice', '')
  const _path = generatePathResponse(path)
  const pages = generateMenuResponse(page)

  const isInScopeMenu = Object.values(scopeMenuRoute).includes(_path)

  if (!isInScopeMenu) {
    return next()
  }

  let availablePaths = []
  scopes?.forEach((scope) => {
    if (scope.includes('MENU:')) {
      availablePaths.push(scopeMenuRoute[scope])
    }
  })

  pages?.forEach((page) => {
    if (page.includes('MENU:')) {
      if (scopeMenuRoute[page] !== undefined)
        availablePaths.push(scopeMenuRoute[page])
    }
  })

  console.log({
    availablePaths,
  })

  if (!availablePaths.includes(_path)) {
    return res.redirect('/backoffice/permission')
  }

  return next()
}

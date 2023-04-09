import { NextFunction, Request, Response } from 'express'
import { CookiesKey } from '../constant/index'
import jwt from 'jsonwebtoken'
// import { uam } from 'src/types/uam'
import { homeRoute } from '../router/home'
import { scopeMenuRoute } from '../router/common/menu'

export async function validateScope(
  req: Request,
  res: Response,
  next: NextFunction,
  path: string,
) {
  const logPrefix = '[middleware.auth.validateScope]'
  console.log(logPrefix, path)
  const accessToken = req.cookies[CookiesKey.accessToken]

  const decoded = jwt.decode(accessToken) as any
  // uam.JwtPayload
  const scopes = decoded?.info?.functions

  const isInScopeMenu = Object.values(scopeMenuRoute).includes(path)
  if (!isInScopeMenu) {
    return next()
  }

  let availablePaths = []
  scopes?.forEach((scope) => {
    if (scope) {
      availablePaths.push(scopeMenuRoute[scope])
    }
  })
  console.log({
    scopes,
    decoded,
    availablePaths,
    path,
    logic: !availablePaths.includes(path),
  })
  const homePath = `${process.env.BASE_PATH}${homeRoute.path}`
  if (!availablePaths.includes(path)) {
    return res.redirect(homePath)
  }

  return next()
}

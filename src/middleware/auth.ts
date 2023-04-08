import { NextFunction, Request, Response } from 'express'
import { CookiesKey } from '../constant/index'
import { getLoginRoute } from '../router/auth'
import { verifyAccessToken } from '../core/services/auth'

export async function validateAccessToken(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const logPrefix = '[middleware.auth.validateAccessToken]'
  const accessToken = req.cookies[CookiesKey.accessToken]
  const refreshToken = req.cookies[CookiesKey.refreshToken]
  // console.log(logPrefix, req.path)

  const loginPath = `${process.env.BASE_PATH}${getLoginRoute().path}`
  console.log(logPrefix, { accessToken, loginPath })

  if (!accessToken) {
    return res.redirect('/backoffice/login')
  }

  try {
    const response = await verifyAccessToken({ accessToken, refreshToken, res })
    console.log('[error_sus]', { response })
  } catch (error) {
    console.log('[error_verify]', { error })

    return res.redirect('/backoffice/login')
  }

  return next()
}

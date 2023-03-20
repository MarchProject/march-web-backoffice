import { CookieOptions, Response } from 'express'
import { SignInResponse } from '../model'
import { CookiesKey } from '../../constant'
import { GraphQLClient } from 'graphql-request'
import * as serverConfig from '../../config/server'
import jwt from 'jsonwebtoken'
import { common } from '../../types/common'
import { VerifyAccessToken, VerifyAccessTokenResponse } from '../../types/auth'
import { verifyAccessTokenMutation } from '../gql/auth'
import { handleGraphqlRequestError } from '../common'

function createCookiesOptions(): CookieOptions {
  return {
    secure: false,
    maxAge: 60 * 60 * 1000,
    httpOnly: false,
    sameSite: 'strict',
  }
}

export async function setCookieSignIn(
  req: any,
  res: Response,
): Promise<SignInResponse> {
  const logPrefix = '[service.auth.setCookieSignIn]'

  // const url: string = global.config.coreApiUrl
  try {
    const { access_token } = req
    if (!access_token) {
      throw new Error('Failed to login')
    }

    const { userId, userName } = jwt.decode(access_token)
    console.log(logPrefix, { access_token })

    const cookieOptions = createCookiesOptions()
    res.cookie(CookiesKey.accessToken, access_token, cookieOptions)
    res.cookie(CookiesKey.username, userName, cookieOptions)
    return {
      accessToken: access_token,
      userId,
      username: userName,
      config: serverConfig.toClientConfig(),
    }
  } catch (error) {
    return Promise.reject(error)
  }
}

export async function verifyAccessToken(
  ctx: common.ServiceContext,
): Promise<VerifyAccessToken> {
  const logPrefix = '[service.auth.verifyAccessToken]'

  const { accessToken } = ctx
  console.log(logPrefix, { accessToken })

  const graphQLClient = new GraphQLClient(global.config.coreApiUrl, {
    headers: {
      authorization: `Bearer ${ctx.accessToken}`,
    },
  })

  let response: VerifyAccessTokenResponse
  try {
    response = await graphQLClient.request<VerifyAccessTokenResponse>(
      verifyAccessTokenMutation,
      { token: accessToken },
    )
  } catch (error) {
    console.log({ error })
    handleGraphqlRequestError(error, logPrefix)
    return Promise.reject(error)
  }

  return response?.verifyAccessToken
}

export function clearCookies(res: Response) {
  res.clearCookie(CookiesKey.accessToken)
  res.clearCookie(CookiesKey.username)
}

export async function signOut(res: Response) {
  const logPrefix = '[service.auth.signOut]'
  console.log(logPrefix)
  clearCookies(res)
  return true
}

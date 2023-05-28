import { CookieOptions, Response } from 'express'
import { SignInResponse } from '../model'
import { CookiesKey } from '../../constant'
import { GraphQLClient } from 'graphql-request'
import * as serverConfig from '../../config/server'
import jwt from 'jsonwebtoken'
import { common } from '../../types/common'
import { VerifyAccessToken, VerifyAccessTokenResponse } from '../../types/auth'
import { tokenExpireMutation, verifyAccessTokenMutation } from '../gql/auth'
import { handleGraphqlRequestError } from '../common'

function createCookiesOptions(): CookieOptions {
  return {
    secure: false,
    maxAge: 60 * 60 * 1000, //cokkie time
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
    const { access_token, refresh_token } = req
    if (!access_token) {
      throw new Error('Failed to login')
    }

    const { userId, userName, info } = jwt.decode(access_token) as any
    console.log(logPrefix, { access_token, info })

    const cookieOptions = createCookiesOptions()
    res.cookie(CookiesKey.accessToken, access_token, cookieOptions)
    res.cookie(CookiesKey.refreshToken, refresh_token, cookieOptions)
    res.cookie(CookiesKey.username, userName, cookieOptions)
    return {
      accessToken: access_token,
      userId,
      username: userName,
      refreshToken: refresh_token,
      config: serverConfig.toClientConfig(),
      functions: info.functions,
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

  const graphQLClient = new GraphQLClient(global.config.authApiUrl, {
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
    try {
      await getNewAccessToken(ctx)
      return response?.verifyAccessToken
    } catch (error) {
      handleGraphqlRequestError(error, logPrefix)
      return Promise.reject(error)
    }
  }
}

export async function getNewAccessToken(
  ctx: common.ServiceContext,
): Promise<any> {
  const logPrefix = '[service.auth.getNewAccessToken]'
  const cookieOptions = createCookiesOptions()
  const { accessToken, refreshToken, res } = ctx
  console.log(logPrefix, { accessToken, refreshToken, ctx })
  console.log('here')
  const graphQLClient = new GraphQLClient(global.config.authApiUrl, {
    headers: {
      authorization: `Bearer ${ctx.accessToken}`,
    },
  })

  let response: any
  try {
    response = await graphQLClient.request<any>(tokenExpireMutation, {
      refreshToken,
    })
    console.log({ res }, 'setnewres')
    res.cookie(
      CookiesKey.accessToken,
      response?.tokenExpire?.access_token,
      cookieOptions,
    )
    console.log({ responseHere: response })
  } catch (error) {
    console.log({ error20: error })
    handleGraphqlRequestError(error, logPrefix)
    return Promise.reject(error)
  }
  return response?.tokenExpire?.access_token
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

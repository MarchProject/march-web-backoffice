import { ClientConfig } from 'src/types/config'

export type SignInRequest = {
  username: string
  password: string
}

export type SignInResponse = {
  picture: string
  userId: string
  username: string
  shopName: string
  accessToken: string
  refreshToken: string
  config?: ClientConfig
  functions: string[]
}

export type ILoginResponse = {
  token: string
  username?: string
}

type LoginResultSignIn = {
  access_token: string
  refresh_token: string
  config?: any
  userId: string
  username: string
}

export type LoginResult = {
  signIn: LoginResultSignIn
}

export type SigninOAuthData = {
  signInOAuth: LoginResultSignIn
}

export type SigninOAuthVariables = {
  code: string
}

export type SigninVariables = {
  username: string
  password: string
}

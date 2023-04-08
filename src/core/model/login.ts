import { ClientConfig } from 'src/types/config'

export type SignInRequest = {
  username: string
  password: string
}

export type SignInResponse = {
  userId: string
  username: string
  accessToken: string
  refreshToken: string
  config?: ClientConfig
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

export type SigninVariables = {
  username: string
  password: string
}

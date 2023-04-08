export type ServerConfig = {
  development: boolean
  port: number
  defaultLoginPath: string
  uamLoginEnabled: boolean
  coreApiUrl: string
  azureAdClientid: string
  azureAdAuthority: string

}

export type ClientConfig = {
  development: boolean
  coreApiUrl: string
  defaultLoginPath: string
  userId?: string
  username?: string
  accessToken?: string
}

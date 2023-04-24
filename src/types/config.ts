export type ServerConfig = {
  development: boolean
  port: number
  defaultLoginPath: string
  uamLoginEnabled: boolean
  authApiUrl: string
  inventoryApiUrl: string
  azureAdClientid: string
  azureAdAuthority: string
}

export type ClientConfig = {
  development: boolean
  authApiUrl: string
  inventoryApiUrl: string
  defaultLoginPath: string
  userId?: string
  username?: string
  accessToken?: string
}

export enum RoleName {
  SuperAdmin = 'superadmin',
}

export namespace uam {
  export type JwtPayload = {
    exp: number
    CustomInfo: {
      groups: string
      functions: string[]
      user_id: number
      username: string
    }
  }
}

export type Credential = {
  picture?: string
  userId?: string
  username?: string
  shopName?: string
  accessToken?: string
  refreshToken?: string
  expiresIn?: number
  functions: string[]
  groups?: RoleName[]
}

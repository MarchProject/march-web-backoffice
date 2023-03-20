import { Request, Response } from 'express'

export namespace common {
  export type ServiceContext = {
    accessToken?: string
    req?: Request
    res?: Response
  }
}



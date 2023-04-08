import { Route } from '../common/types'

export const userLoginRoute: Route = {
  path: '/user/login',
  auth: false,
  regex: /(\/(en|th)|)\/user\/login/,
}


export const uamLoginRoute: Route = {
  path: '/login',
  auth: false,
  regex: /(\/(en|th)|)\/login/,
}
import { Route } from '../common/types'

export const homeRoute: Route = {
  path: '/home',
  auth: true,
  regex: /(\/(en|th)|)\/home/,
}

export const permissionRoute: Route = {
  path: '/permission',
  auth: false,
  regex: /(\/(en|th)|)\/home/,
}

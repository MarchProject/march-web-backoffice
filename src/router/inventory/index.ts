import { Route } from '../common/types'

export const inventoryRoute: Route = {
  path: '/inventory',
  auth: true,
  regex: /(\/(en|th)|)\/inventory/,
}

export const inventoryCreateRoute: Route = {
  path: '/inventory/create',
  auth: true,
  regex: /(\/(en|th)|)\/inventory\/create/,
}

function userUpdatePathWithParam(param: string) {
  return `${inventoryUpdateRoute.prepath}/${param}${inventoryUpdateRoute.postpath}`
}

export const inventoryUpdateRoute: Route = {
  path: '/inventory/:Id/update',
  prepath: '/inventory',
  postpath: '/update',
  pathWithParam: userUpdatePathWithParam,
  auth: true,
  regex: /(\/(en|th)|)\/inventory\/(.+)\/update/,
}

function userViewPathWithParam(param: string) {
  return `${inventoryViewRoute.prepath}/${param}${inventoryViewRoute.postpath}`
}

export const inventoryViewRoute: Route = {
  path: '/inventory/:Id/view',
  prepath: '/inventory',
  postpath: '/view',
  pathWithParam: userViewPathWithParam,
  auth: true,
  regex: /(\/(en|th)|)\/inventory\/(.+)\/view/,
}

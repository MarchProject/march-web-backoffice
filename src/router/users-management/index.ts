import { Route } from '../common/types'

export const usersManagementUserRoute: Route = {
  path: '/users-management/user',
  auth: true,
  regex: /(\/(en|th)|)\/users-management\/user/,
}

export const usersManagementUserCreateRoute: Route = {
  path: '/users-management/user/create',
  auth: true,
  regex: /(\/(en|th)|)\/users-management\/user\/create/,
}

function userUpdatePathWithParam(param: string) {
  return `${userUpdateRoute.prepath}/${param}${userUpdateRoute.postpath}`
}
export const userUpdateRoute: Route = {
  path: '/users-management/user/:userId/update',
  prepath: '/users-management/user',
  postpath: '/update',
  pathWithParam: userUpdatePathWithParam,
  auth: true,
  regex: /(\/(en|th)|)\/users-management\/user\/(.+)\/update/,
}

export const usersManagementUserRoleRoute: Route = {
  path: '/users-management/user-role',
  auth: true,
  regex: /(\/(en|th)|)\/users-management\/user-role/,
}

export const usersManagementUserRoleCreateRoute: Route = {
  path: '/users-management/user-role/create',
  auth: true,
  regex: /(\/(en|th)|)\/users-management\/user-role\/create/,
}

function userRoleUpdatePathWithParam(param: string) {
  return `${userRoleUpdateRoute.prepath}/${param}${userRoleUpdateRoute.postpath}`
}
export const userRoleUpdateRoute: Route = {
  path: '/users-management/user-role/:id/update',
  prepath: '/users-management/user-role',
  postpath: '/update',
  pathWithParam: userRoleUpdatePathWithParam,
  auth: true,
  regex: /(\/(en|th)|)\/users-management\/user-role\/(.+)\/update/,
}

export const usersManagementApprovalStepRoute: Route = {
  path: '/users-management/approval-step',
  auth: true,
  regex: /(\/(en|th)|)\/users-management\/approval-step/,
}

import { Route } from '../common/types'

export const shopRolesManagementRoute: Route = {
  path: '/shop-management/shop-roles',
  auth: true,
  regex: /(\/(en|th)|)\/shop-management\/shop-roles/,
}

export const shopShopsManagementRoute: Route = {
  path: '/shop-management/shop-shops',
  auth: true,
  regex: /(\/(en|th)|)\/shop-management\/shop-shops/,
}

export const shopUsersManagementRoute: Route = {
  path: '/shop-management/shop-users',
  auth: true,
  regex: /(\/(en|th)|)\/shop-management\/shop-users/,
}

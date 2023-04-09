import { Route } from '../common/types'

export const inventoryRoute: Route = {
  path: '/inventory',
  auth: true,
  regex: /(\/(en|th)|)\/inventory/,
}

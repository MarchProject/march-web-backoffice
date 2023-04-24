import { Route } from '../common/types'

export const customerRoute: Route = {
  path: '/customer',
  auth: true,
  regex: /(\/(en|th)|)\/customer/,
}

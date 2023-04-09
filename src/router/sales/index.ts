import { Route } from '../common/types'

export const salesRoute: Route = {
  path: '/sales',
  auth: true,
  regex: /(\/(en|th)|)\/sales/,
}

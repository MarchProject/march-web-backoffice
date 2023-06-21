import { Route } from '../common/types'

export const dashboardRoute: Route = {
  path: '/dashboard',
  auth: true,
  regex: /(\/(en|th)|)\/dashboard/,
}

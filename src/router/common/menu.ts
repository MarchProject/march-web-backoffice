import { dashboardRoute } from '../dashboard'
import { inventoryRoute } from '../inventory'
import { salesRoute } from '../sales'

export const scopeMenuRoute = {
  'MENU:INVENTORY': inventoryRoute.path,
  'MENU:SALES': salesRoute.path,
  'MENU:DASHBOARD': dashboardRoute.path,
}

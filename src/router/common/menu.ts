import { customerRoute } from '../customer'
import { dashboardRoute } from '../dashboard'
import {
  inventoryCreateRoute,
  // inventoryCreateRoute,
  inventoryRoute,
  inventoryUpdateRoute,
  inventoryViewRoute,
} from '../inventory'
import { salesRoute } from '../sales'

export const scopeMenuRoute = {
  'MENU:INVENTORY': inventoryRoute.path,
  'MENU:SALES': salesRoute.path,
  'MENU:DASHBOARD': dashboardRoute.path,
  'MENU:CUSTOMER': customerRoute.path,

  'MENU:INVENTORY:CREATE': inventoryCreateRoute.path,
  'MENU:INVENTORY:VIEW': inventoryViewRoute.path,
  'MENU:INVENTORY:UPDATE': inventoryUpdateRoute.path,
  // 'MENU:DASHBOARD:CREATE': '',
  // 'MENU:DASHBOARD:VIEW': '',
  // 'MENU:DASHBOARD:UPDATE': '',
  // 'MENU:SALES:CREATE': '',
  // 'MENU:SALES:VIEW': '',
  // 'MENU:SALES:UPDATE': '',
  // 'MENU:CUSTOMER:CREATE': '',
  // 'MENU:CUSTOMER:VIEW': '',
  // 'MENU:CUSTOMER:UPDATE': '',
  // 'CREATE:INVENTORY': inventoryCreateRoute.path,
}

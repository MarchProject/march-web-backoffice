import { shopRolesManagementRoute } from '../shop-management'
import {
  usersManagementApprovalStepRoute,
  usersManagementUserRoleRoute,
  usersManagementUserRoute,
} from '../users-management'

export const scopeMenuRoute = {
  USER: usersManagementUserRoute.path,
  USER_ROLE: usersManagementUserRoleRoute.path,
  APPROVAL_STEP: usersManagementApprovalStepRoute.path,
  AGENT_ROLES: shopRolesManagementRoute.path,
}

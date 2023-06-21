import { Model } from './model'

export enum PermissionGroup {
  MASTER_DATA = 'MASTER_DATA',
  SALE_MANAGEMENT = 'SALE_MANAGEMENT',
  AGENT_MANAGEMENT = 'AGENT_MANAGEMENT',
  CAMPAIGN_MANAGEMENT = 'CAMPAIGN_MANAGEMENT',
  REWARD_MANAGEMENT = 'REWARD_MANAGEMENT',
  USER_MANAGEMENT = 'USER_MANAGEMENT',
  REPORT = 'REPORT',
  NULL = 'NULL',
}

export class Group extends Model {
  index?: number
  name: string
  backofficeGroupFunction?: backofficeFunction[]
  description: string
  active: boolean
  deleted: boolean
}
export class backofficeFunction {
  backofficeFunction: Functions
}

export class Functions extends Model {
  index?: number
  name: string
  description: string
  group: PermissionGroup
  active: boolean
  deleted: boolean
}

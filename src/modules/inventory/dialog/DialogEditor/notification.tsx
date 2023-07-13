import { EnumSeverity } from '@/context/notification'

export const notificationDeleteSuccessProp = {
  severity: EnumSeverity.success,
  title: 'Product Type',
  message: 'Delete Success',
}
export const notificationTypeUsedDeleteErrorProp = {
  severity: EnumSeverity.error,
  title: 'Product Type',
  message: 'Delete Failed. or This type already use in product',
}
export const notificationDeleteErrorProp = {
  severity: EnumSeverity.error,
  title: 'Product Type',
  message: 'Delete Failed. or This type already use in product',
}
export const notificationUpdateSuccessProp = (
  type = 'type',
  create: boolean = true,
) => {
  return {
    severity: EnumSeverity.success,
    title: `Product ${type === 'type' ? 'type' : 'brand'}`,
    message: `${create ? 'Create' : 'Update'} Success`,
  }
}
export const notificationUpdateErrorProp = (
  type = 'type',
  create: boolean = true,
) => {
  return {
    severity: EnumSeverity.error,
    title: `Product ${type === 'type' ? 'type' : 'brand'}`,
    message: `${create ? 'Create' : 'Update'} Failed.`,
  }
}

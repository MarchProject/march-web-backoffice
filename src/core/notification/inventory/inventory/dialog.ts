import { EnumSeverity } from '@/context/notification'
import { EnumDeletedMode } from '@/core/gql/inventory/recoveryHardDeletedMutation'

export const notificationMutationProp = (
  message: string,
  severity: EnumSeverity,
) => {
  return {
    severity,
    title: message?.split('|')?.[0],
    message: message?.split('|')?.[1],
  }
}

export const notificationDeleteSuccessProp = (type = 'type') => {
  return {
    severity: EnumSeverity.success,
    title: `Product ${type === 'type' ? 'type' : 'brand'}`,
    message: 'Delete Success',
  }
}
export const notificationTypeUsedDeleteErrorProp = (type = 'type') => {
  return {
    severity: EnumSeverity.error,
    title: `Product ${type === 'type' ? 'type' : 'brand'}`,
    message: `This ${
      type === 'type' ? 'type' : 'brand'
    } already use in product`,
  }
}
export const notificationInternalErrorProp = (
  message: string = '',
  title?: string,
) => {
  return {
    severity: EnumSeverity.error,
    title: title ? title : `Internal Error`,
    message,
  }
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
  message: string,
) => {
  return {
    severity: EnumSeverity.error,
    title: `Product ${type === 'type' ? 'type' : 'brand'}`,
    message: `${create ? 'Create' : 'Update'} Failed. ${message}`,
  }
}

export const notificationTrashFetchErrorProp = {
  severity: EnumSeverity.error,
  title: `Trash`,
  message: 'Fetch Error',
}

export const notificationTrashMutateErrorProp = {
  severity: EnumSeverity.error,
  title: `Trash`,
  message: 'Fetch Error',
}

export const notificationTrashMutateSuccessProp = (
  message: EnumDeletedMode,
) => {
  return {
    severity: EnumSeverity.success,
    title: `Trash`,
    message: `${message === 'RECOVERY' ? 'Restore' : 'Delete'} Success`,
  }
}

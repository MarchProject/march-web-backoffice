import { EnumSeverity } from '@/context/notification'

export const notificationEditorSuccessProp = (message) => {
  return {
    severity: EnumSeverity.success,
    title: 'Inventory',
    message: `${message} Success`,
  }
}

export const notificationEditorErrorProp = (head: string, message: string) => {
  return {
    severity: EnumSeverity.error,
    title: 'Inventory',
    message: `[${head}] ${message}`,
  }
}

export const notificationEditorDeleteErrorProp = (message: string) => {
  return {
    severity: EnumSeverity.error,
    title: 'Inventory',
    message: `[Delete] ${message}`,
  }
}

export const notificationEditorValidErrorProp = {
  severity: EnumSeverity.error,
  title: 'Inventory',
  message: 'Validate Fail',
}

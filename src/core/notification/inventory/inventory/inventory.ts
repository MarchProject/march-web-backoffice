import { EnumSeverity } from '@/context/notification'

export const notificationFetchInventoryErrorProp = (message) => {
  return {
    severity: EnumSeverity.error,
    title: 'Inventory',
    message: `Fetch ${message}`,
  }
}

export const notificationFavoriteInventoryErrorProp = {
  severity: EnumSeverity.error,
  title: 'Inventory',
  message: 'Favorite Failed',
}

export const notificationFavoriteInventorySuccessProp = {
  severity: EnumSeverity.success,
  title: 'Inventory',
  message: 'Favorite Success',
}

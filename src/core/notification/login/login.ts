import { EnumSeverity } from '@/context/notification'

export const notificationSignInSuccessProp = {
  severity: EnumSeverity.success,
  title: 'Sign In',
  message: 'Sign In Success',
}

export const notificationSignInErrorProp = {
  severity: EnumSeverity.error,
  title: 'Sign In',
  message: 'Sign In Error',
}

export const notificationSignInExpireErrorProp = {
  severity: EnumSeverity.error,
  title: 'Sign In',
  message: 'Sign In Expire',
}

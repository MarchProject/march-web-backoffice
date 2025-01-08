import {
  ConfigNotificationPropsType,
  NotificationType,
} from '@/context/notification'

export const notificationMutationProp = (
  message: string,
  severity: NotificationType,
) => {
  return {
    severity,
    title: message?.split('|')?.[0],
    message: message?.split('|')?.[1],
  }
}

export const notificationInternalErrorProp = (
  message: string = '',
  title?: string,
): ConfigNotificationPropsType => {
  return {
    severity: 'error',
    title: title ? title : `Internal Error`,
    message,
  }
}

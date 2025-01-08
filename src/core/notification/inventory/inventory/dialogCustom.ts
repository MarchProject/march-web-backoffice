import { NotificationType } from '@/context/notification'

export const  notificationProp = (
  title: string,
  message: string,
  severity: NotificationType,
) => {
  return {
    severity: severity,
    title: title,
    message: `${message}`,
  }
}

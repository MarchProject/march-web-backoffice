import { EnumSeverity } from '@/context/notification'

export const notificationProp = (
  title: string,
  message: string,
  severity: EnumSeverity,
) => {
  return {
    severity: severity,
    title: title,
    message: `${message}`,
  }
}

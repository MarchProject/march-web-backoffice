import { EnumSeverity } from '@/context/notification'

export const notificationFileSizeErrorProp = {
  severity: EnumSeverity.error,
  title: 'Upload CSV',
  message: `File size limit.`,
}

export const notificationMultiErrorProp = {
  severity: EnumSeverity.error,
  title: 'Uplaod CSV',
  message: 'Maximum is 4 files can be uploaded.',
}

export const notificationTypeErrorProp = {
  severity: EnumSeverity.error,
  title: 'Uplaod CSV',
  message: 'Please Upload CSV.',
}

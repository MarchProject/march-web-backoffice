import { EnumSeverity } from "@/context/notification"

export const notificationDialogUploadSuccessProp = {
    severity: EnumSeverity.success,
    title: 'Inventory',
    message: 'Upload Success',
  }
  
  export const notificationDialogUploadErrorProp = (message: string) => {
    return {
      severity: EnumSeverity.error,
      title: 'Inventory',
      message: `${message}`,
    }
  }
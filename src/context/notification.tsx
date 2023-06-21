import { SnackbarCloseReason, SnackbarProps } from '@mui/material/Snackbar'
import {
  createContext,
  FC,
  ReactElement,
  SyntheticEvent,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'
import { noop } from '../utils/common/noop'

interface INotificationContextProvider {
  children: ReactElement
}

export enum EnumNotificationType {
  toast = 'toast',
}

export enum EnumSeverity {
  success = 'success',
  error = 'error',
}

export interface INotification extends Pick<SnackbarProps, 'onClose'> {
  type?: EnumNotificationType
  severity: EnumSeverity
  duration?: number
  title?: string
  message?: string
  open?: boolean
  onClick?: (event: SyntheticEvent<Element, Event>) => void
  onClose?: (
    event: Event | SyntheticEvent<any, Event>,
    reason?: SnackbarCloseReason,
  ) => void
}

interface INotificationContext {
  notification: (config: INotification) => void
  notificationProps: INotification
}

const initialNotificationProps: INotification = {
  type: EnumNotificationType.toast,
  severity: EnumSeverity.success,
  duration: 3000,
  onClose: noop,
  open: false,
}

const NotificatioContext = createContext<INotificationContext>({
  notification: noop,
  notificationProps: initialNotificationProps,
})

export const NotificationContextProvider: FC<INotificationContextProvider> = (
  props,
) => {
  const { children } = props
  const [notificationProps, setNotificationProps] = useState<INotification>(
    initialNotificationProps,
  )

  const handleClose = useCallback(
    (
      event: Event | SyntheticEvent<any, Event>,
      reason?: SnackbarCloseReason,
    ) => {
      if (reason === 'clickaway') {
        return
      }
      const onClose = notificationProps.onClose
      if (onClose) {
        onClose(event, reason)
      }

      setNotificationProps((preState) => ({
        ...preState,
        open: false,
      }))
    },
    [notificationProps],
  )

  const handleClickAlert = useCallback(
    (event: SyntheticEvent<Element, Event>) => {
      const onClose = notificationProps.onClose
      if (onClose) {
        onClose(event)
      }

      setNotificationProps((preState) => ({
        ...preState,
        open: false,
      }))
    },
    [notificationProps.onClose],
  )

  const notification = useCallback((config: INotification): void => {
    setNotificationProps((preState) => {
      return {
        ...preState,
        ...config,
        open: true,
      }
    })
  }, [])

  const contextValue = useMemo(() => {
    return {
      notification,
      notificationProps: {
        ...notificationProps,
        onClose: handleClose,
        onClick: handleClickAlert,
      },
    }
  }, [handleClickAlert, handleClose, notification, notificationProps])

  return (
    <NotificatioContext.Provider value={contextValue}>
      {children}
    </NotificatioContext.Provider>
  )
}

export const useNotificationContext = () => useContext(NotificatioContext)

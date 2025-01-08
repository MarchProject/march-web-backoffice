import {
  createContext,
  FC,
  ReactElement,
  useCallback,
  useContext,
  useMemo,
} from 'react'
import { noop } from '../utils/common/noop'
import { notification as notificationAnd } from 'antd'
import { useTranslation } from 'react-i18next'
import { tkeys } from '@/translations/i18n'

interface INotificationContextProvider {
  children: ReactElement
}

export type NotificationType = 'success' | 'info' | 'warning' | 'error'

export type ConfigErrorNotificationType = {
  title?: string
  description?: string
}

export type ConfigNotificationPropsType = {
  severity?: NotificationType
  title?: string
  duration?: number | null
  message?: string
  onClick?: () => void
  onClose?: () => void
}

interface INotificationContext {
  errorNotification: (config?: ConfigErrorNotificationType) => void
  notification: (config?: ConfigNotificationPropsType) => void
}

const NotificatioContext = createContext<INotificationContext>({
  errorNotification: noop,
  notification: noop,
})

export const NotificationContextProvider: FC<INotificationContextProvider> = (
  props,
) => {
  const { children } = props
  const { t: trans } = useTranslation()
  const [api, contextHolder] = notificationAnd.useNotification()

  const notification = useCallback(
    ({
      severity: type,
      title,
      message,
    }: ConfigNotificationPropsType = {}): void => {
      api[type ? type : 'success']({
        message: title || '',
        description: message || '',
      })
    },
    [api],
  )

  const errorNotification = useCallback(
    ({ title, description }: ConfigErrorNotificationType = {}) => {
      api.error({
        message: title || trans(tkeys.common.notification.error.title),
        description:
          description || trans(tkeys.common.notification.error.description),
      })
    },
    [api, trans],
  )

  const contextValue = useMemo(() => {
    return {
      errorNotification,
      notification,
    }
  }, [notification, errorNotification])

  return (
    <NotificatioContext.Provider value={contextValue}>
      {contextHolder}
      {children}
    </NotificatioContext.Provider>
  )
}

export const useNotificationContext = () => useContext(NotificatioContext)

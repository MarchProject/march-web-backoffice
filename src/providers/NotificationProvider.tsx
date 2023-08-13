import AlertNoti from '@/components/common/Alert/AlertNotification'
import { useNotificationContext } from '@/context/notification'

import { FC, ReactElement } from 'react'

interface INotificationProvider {
  children: ReactElement
}

const Notification = (props: any) => {
  return <AlertNoti {...props} />
}

const NotificationProvider: FC<INotificationProvider> = ({ children }) => {
  const { notificationProps } = useNotificationContext()

  return (
    <>
      <Notification {...notificationProps} />
      {children}
    </>
  )
}

export default NotificationProvider

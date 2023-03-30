import { useNotificationContext } from '@/context/notification'
import AlertNoti from '@/components/common/Alert/alert'
import { Alert, AlertTitle, Snackbar } from '@mui/material'
import { FC, ReactElement } from 'react'

interface INotificationProvider {
  children: ReactElement
}

const Notification = (props: any) => {
  return <AlertNoti {...props} />
}

const NotificationProvider: FC<INotificationProvider> = ({ children }) => {
  const { notificationProps } = useNotificationContext()
  console.log({ notificationProps })

  return (
    <>
      <Notification {...notificationProps} />
      {children}
    </>
  )
}

export default NotificationProvider

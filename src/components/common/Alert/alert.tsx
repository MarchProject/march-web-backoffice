import { Alert, AlertColor, AlertTitle } from '@mui/material'
import classnames from 'classnames'
import React from 'react'

interface IAlertToast {
  severity?: AlertColor
  title: string
  message: string
  variant: 'standard' | 'filled' | 'outlined'
  classNames?: string
}

const AlertToast = ({
  severity,
  title,
  message,
  variant,
  classNames,
}: IAlertToast) => {
  return (
    <Alert
      className={classnames(classNames)}
      severity={severity}
      variant={variant}>
      <AlertTitle>{title}</AlertTitle>
      {message}
    </Alert>
  )
}

export default AlertToast

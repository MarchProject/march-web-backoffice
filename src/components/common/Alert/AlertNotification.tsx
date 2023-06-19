import React from 'react'
import { Alert, AlertTitle, Snackbar } from '@mui/material'

const AlertNoti = ({
  open,
  onClose,
  severity,
  onClick,
  duration,
  message,
  title,
}: any) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={duration}
      style={{ width: '100%', maxWidth: '400px' }}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <Alert
          style={{ width: '100%', borderRadius: '15px' }}
          severity={severity}
          onClose={onClick}>
          <AlertTitle>{title}</AlertTitle>
          {message}
        </Alert>
    </Snackbar>
  )
}

export default AlertNoti

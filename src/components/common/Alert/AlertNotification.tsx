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
    <div className="flex justify-center">
      <Snackbar
        open={open}
        autoHideDuration={duration}
        onClose={onClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert
          className="xl:w-[400px] w-[270px] rounded-xl"
          // style={{ width: '100%', borderRadius: '15px' }}
          severity={severity}
          onClose={onClick}>
          <AlertTitle>{title}</AlertTitle>
          {message}
        </Alert>
      </Snackbar>
    </div>
  )
}

export default AlertNoti

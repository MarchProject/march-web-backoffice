import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material'
import React from 'react'

interface IDialogM {
  open: boolean
  dialogTitle: string
  handleClose: () => void
  contentRender: () => JSX.Element
  actionRender: () => JSX.Element
}

export const DialogM = ({
  open,
  handleClose,
  contentRender,
  actionRender,
  dialogTitle,
}: IDialogM) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{
        '& .MuiPaper-root': {
          maxWidth: '440px',
          width: '100%',
          borderRadius: '10px',
        },
      }}>
      <DialogTitle id="alert-dialog-title">{dialogTitle}</DialogTitle>
      <DialogContent>{contentRender()}</DialogContent>
      <DialogActions>{actionRender()}</DialogActions>
    </Dialog>
  )
}

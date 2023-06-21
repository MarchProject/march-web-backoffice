import {
  Dialog,
  DialogActions,
  DialogTitle,
} from '@mui/material'
import classnames from 'classnames'
import React from 'react'

interface IDialogM {
  open: boolean
  dialogTitle: string
  handleClose: () => void
  contentRender: () => JSX.Element
  actionRender: () => JSX.Element
  classNames?: string
}

export const DialogM = ({
  open,
  handleClose,
  contentRender,
  actionRender,
  classNames,
  dialogTitle,
}: IDialogM) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      className={classnames(classNames)}
      aria-describedby="alert-dialog-description"
      sx={{
        '& .MuiPaper-root': {
          maxWidth: '440px',
          width: '100%',
          borderRadius: '10px',
        },
      }}>
      <DialogTitle id="alert-dialog-title">{dialogTitle}</DialogTitle>
      {contentRender()}
      <DialogActions>{actionRender()}</DialogActions>
    </Dialog>
  )
}

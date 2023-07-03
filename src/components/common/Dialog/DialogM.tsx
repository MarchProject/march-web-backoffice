import { Breakpoint, Dialog, DialogActions, DialogTitle } from '@mui/material'
import classnames from 'classnames'
import React from 'react'

interface IDialogM {
  open: boolean
  dialogTitle: string
  handleClose: () => void
  contentRender: () => JSX.Element
  actionRender: () => JSX.Element
  classNames?: string
  maxWidth?: Breakpoint
  dialogContentTextRender?: () => JSX.Element
}

export const DialogM = ({
  open,
  handleClose,
  contentRender,
  actionRender,
  classNames,
  dialogTitle,
  maxWidth = 'xs',
  dialogContentTextRender = () => <></>,
}: IDialogM) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      className={classnames(classNames)}
      aria-describedby="alert-dialog-description"
      fullWidth
      maxWidth={maxWidth}
      sx={{
        '& .MuiPaper-root': {
          // maxWidth: '440px',
          // width: '100%',
          borderRadius: '10px',
        },
      }}>
      <DialogTitle id="alert-dialog-title" className="text-primary">
        {dialogTitle}
      </DialogTitle>
      {dialogContentTextRender()}
      {contentRender()}
      <DialogActions>{actionRender()}</DialogActions>
    </Dialog>
  )
}

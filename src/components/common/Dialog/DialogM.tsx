import { Breakpoint, Dialog, DialogActions, DialogTitle } from '@mui/material'
import classnames from 'classnames'
import React from 'react'
import { IoMdClose } from 'react-icons/io'
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
      <DialogTitle
        id="alert-dialog-title"
        className="text-primary  flex justify-between">
        <p className="m-0 font-bold">{dialogTitle}</p>
        <IoMdClose
          className="text-gray-500 cursor-pointer hover:text-gray-800"
          size={20}
          onClick={handleClose}
        />
      </DialogTitle>
      {dialogContentTextRender()}
      {contentRender()}
      <DialogActions className="mb-[16px]">{actionRender()}</DialogActions>
    </Dialog>
  )
}

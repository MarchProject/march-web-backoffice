import ButtonForm from '@/components/common/Button/button'
import { DialogM } from '@/components/common/Dialog/DialogM'
import { InventoryTrash } from '@/core/model/inventory'
import React from 'react'

interface IDialogTrashProps {
  open: boolean
  handleClose: () => void
  trashData: InventoryTrash
}

export const DialogTrash = ({
  open,
  handleClose,
  trashData,
}: IDialogTrashProps) => {
  console.log({ trashData })
  return (
    <DialogM
      dialogTitle="Trash"
      open={open}
      maxWidth="md"
      handleClose={handleClose}
      dialogContentTextRender={() => {
        return (
          <>
            <p className="text-secondary m-0 px-[24px] text-base">
              Upload a CSV to import item data to your inventory.
            </p>
          </>
        )
      }}
      contentRender={() => {
        return <></>
      }}
      actionRender={() => {
        return (
          <>
            <ButtonForm
              classNames="!w-[60px] !h-[40px] !w-[100%] !normal-case"
              label={'Close'}
              color={'primary'}
              variant="text"
              onClick={handleClose}
            />
          </>
        )
      }}
    />
  )
}

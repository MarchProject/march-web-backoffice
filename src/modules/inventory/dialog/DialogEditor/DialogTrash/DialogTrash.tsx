import ButtonForm from '@/components/common/Button/button'
import { DialogM } from '@/components/common/Dialog/DialogM'
import { InventoryTrash } from '@/core/model/inventory'
import React from 'react'
import { Trash } from './view/Container'
import {
  EnumDeletedMode,
  EnumDeletedType,
} from '@/core/gql/inventory/inventoryTrash'

interface IDialogTrashProps {
  open: boolean
  handleClose: () => void
  trashData: InventoryTrash
  recoveryHardDeletedHandle: (
    id: string,
    type: EnumDeletedType,
    mode: EnumDeletedMode,
  ) => void
}

export const DialogTrash = ({
  open,
  handleClose,
  trashData,
  recoveryHardDeletedHandle,
}: IDialogTrashProps) => {
  return (
    <DialogM
      dialogTitle="Trash"
      open={open}
      maxWidth="sm"
      handleClose={handleClose}
      dialogContentTextRender={() => {
        return (
          <>
            <p className="text-secondary m-0 px-[24px] text-base">
              Recovery or Delete from Trash.
            </p>
          </>
        )
      }}
      contentRender={() => {
        return (
          <>
            <Trash
              trashData={trashData}
              recoveryHardDeletedHandle={recoveryHardDeletedHandle}
            />
          </>
        )
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

import { DialogM } from '@/components/common/Dialog/DialogM'
import { InventoryTrash } from '@/core/model/inventory'
import React from 'react'
import { Trash } from './view/Container'
import {
  EnumDeletedMode,
  EnumDeletedType,
} from '@/core/gql/inventory/recoveryHardDeletedMutation'
import { useTranslation } from 'react-i18next'
import { tkeys } from '@/translations/i18n'

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
  const { t: trans }: any = useTranslation()
  const keys = tkeys.Inventory.MainPage.dialog.trash
  return (
    <DialogM
      dialogTitle={trans(keys.header.lable)}
      open={open}
      maxWidth="sm"
      handleClose={handleClose}
      dialogContentTextRender={() => {
        return (
          <>
            <p className="text-secondary m-0 px-[24px] text-base">
              {trans(keys.header.sub)}
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
            {/* <ButtonForm
              classNames="!w-[60px] !h-[40px] !w-[100%] !normal-case"
              label={'Close'}
              color={'primary'}
              variant="text"
              onClick={handleClose}
            /> */}
          </>
        )
      }}
    />
  )
}

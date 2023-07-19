import { DialogM } from '@/components/common/Dialog/DialogM'

import React from 'react'
import { TypeViewMain } from './view/Container'
import { InventoryType } from '@/core/model/inventory'

interface IDialogTypeProps {
  open: boolean
  handleClose: () => void
  inventoriesTypeData: InventoryType[]
  deleteTypeHandle: (id: string) => void
  updateTypeHandle: (data: any) => void
}

export const DialogType = ({
  open,
  handleClose,
  inventoriesTypeData,
  deleteTypeHandle,
  updateTypeHandle
}: IDialogTypeProps) => {
  return (
    <DialogM
      dialogTitle="Type"
      open={open}
      maxWidth="sm"
      handleClose={handleClose}
      dialogContentTextRender={() => {
        return (
          <>
            <p className="text-secondary m-0 px-[24px] text-base">
              Add type for items
            </p>
          </>
        )
      }}
      contentRender={() => {
        return (
          <>
            <TypeViewMain
              inventoriesTypeData={inventoriesTypeData}
              deleteTypeHandle={deleteTypeHandle}
              updateTypeHandle={updateTypeHandle}
            />
          </>
        )
      }}
      actionRender={() => {
        return <></>
      }}
    />
  )
}

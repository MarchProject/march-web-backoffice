import ButtonForm from '@/components/common/Button/button'
import { Input } from '@/components/common/Input'
import { InventoryBranch } from '@/core/model/inventory'
import { tkeys } from '@/translations/i18n'
import { max } from '@/utils/common/normalizeInput'
import { defaultGet } from '@/utils/common/utils'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

interface IBranchObjUpdate {
  inventoryBranchData: InventoryBranch
  updateBranchHandle: (data: {
    id: string
    name: string
    description?: string
  }) => void
  setValueMode: (value: string) => void
}

export const BranchObjUpdate = ({
  inventoryBranchData,
  updateBranchHandle,
  setValueMode,
}: IBranchObjUpdate) => {
  const { t: trans }: any = useTranslation()
  const keys = tkeys.Inventory.MainPage.dialog.branch.mode.update
  const [inventoryBranchDataValue, setInventoryBranchDataValue] = useState({
    id: null,
    name: null,
    description: null,
    formattedUpdatedAt: null,
    formattedCreatedAt: null,
    createdBy: null,
    updatedBy: null,
  })

  useEffect(() => {
    if (inventoryBranchData) {
      setInventoryBranchDataValue({
        id: defaultGet(inventoryBranchData, 'id', ''),
        name: defaultGet(inventoryBranchData, 'name', ''),
        description: defaultGet(inventoryBranchData, 'description', ''),
        formattedCreatedAt: defaultGet(
          inventoryBranchData,
          'formattedCreatedAt',
          '',
        ),
        formattedUpdatedAt: defaultGet(
          inventoryBranchData,
          'formattedUpdatedAt',
          '',
        ),
        createdBy: defaultGet(inventoryBranchData, 'createdBy', ''),
        updatedBy: defaultGet(inventoryBranchData, 'updatedBy', ''),
      })
    }
  }, [inventoryBranchData])

  if (inventoryBranchData) {
    return (
      <div>
        <div className="mt-[10px] h-[350px]">
          <div className="h-[300px] maxs-w-[480px] mx-auto overflow-y-auto p-[10px]">
            <div className="w-full flex flex-col gap-[10px]">
              <Input
                id={'name'}
                type={'text'}
                name={'name'}
                inputLabel={{
                  label: trans(keys.field.name),
                  required: true,
                }}
                variant="outlined"
                value={inventoryBranchDataValue?.name}
                onChange={(e) => {
                  setInventoryBranchDataValue((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }}
                normalizes={[max(40)]}
              />
              <Input
                id={'description'}
                type={'text'}
                name={'description'}
                inputLabel={{
                  label: trans(keys.field.description),
                  required: false,
                }}
                rows={6}
                multiline
                variant="outlined"
                value={inventoryBranchDataValue?.description}
                onChange={(e) => {
                  setInventoryBranchDataValue((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }}
                normalizes={[max(290)]}
              />
              <Input
                id={'formattedCreatedAt'}
                type={'text'}
                name={'formattedCreatedAt'}
                inputLabel={{
                  label: trans(keys.field.createdAt),
                  required: false,
                }}
                disabled
                variant="outlined"
                value={inventoryBranchDataValue?.formattedCreatedAt}
                onChange={(e) => {
                  setInventoryBranchDataValue((prev) => ({
                    ...prev,
                    formattedCreatedAt: e.target.value,
                  }))
                }}
              />
              <Input
                id={'createdBy'}
                type={'text'}
                name={'createdBy'}
                inputLabel={{
                  label: trans(keys.field.createdBy),
                  required: false,
                }}
                disabled
                variant="outlined"
                value={inventoryBranchDataValue?.createdBy}
                onChange={(e) => {
                  setInventoryBranchDataValue((prev) => ({
                    ...prev,
                    createdBy: e.target.value,
                  }))
                }}
              />
              <Input
                id={'formattedUpdatedAt'}
                type={'text'}
                name={'formattedUpdatedAt'}
                inputLabel={{
                  label: trans(keys.field.updatedAt),
                  required: false,
                }}
                disabled
                variant="outlined"
                value={inventoryBranchDataValue?.formattedUpdatedAt}
                onChange={(e) => {
                  setInventoryBranchDataValue((prev) => ({
                    ...prev,
                    formattedUpdatedAt: e.target.value,
                  }))
                }}
              />
              <Input
                id={'updatedBy'}
                type={'text'}
                name={'updatedBy'}
                inputLabel={{
                  label: trans(keys.field.updatedBy),
                  required: false,
                }}
                disabled
                variant="outlined"
                value={inventoryBranchDataValue?.updatedBy}
                onChange={(e) => {
                  setInventoryBranchDataValue((prev) => ({
                    ...prev,
                    updatedBy: e.target.value,
                  }))
                }}
              />
            </div>
          </div>
          <div className="flex justify-end my-[10px]">
            <ButtonForm
              classNames="!w-[120px] !h-[40px] !w-[100%] !normal-case"
              label={trans(tkeys.common.button.update)}
              color={'primary'}
              variant="contained"
              disabled={
                !inventoryBranchDataValue?.id || !inventoryBranchDataValue?.name
              }
              onClick={() => {
                if (
                  inventoryBranchDataValue?.id &&
                  inventoryBranchDataValue?.name
                ) {
                  updateBranchHandle({
                    id: inventoryBranchDataValue.id,
                    description: inventoryBranchDataValue?.description,
                    name: inventoryBranchDataValue.name,
                  })
                }
                setValueMode('view')
              }}
            />
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className="mt-[10px] h-[350px] overflow-y-auto">
      <></>
    </div>
  )
}

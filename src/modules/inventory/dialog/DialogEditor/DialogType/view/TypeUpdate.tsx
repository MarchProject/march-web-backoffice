import ButtonForm from '@/components/common/Button/button'
import { Input } from '@/components/common/Input'
import { InventoryType } from '@/core/model/inventory'
import { defaultGet } from '@/utils/common/utils'
import React, { useEffect, useState } from 'react'

interface ITypeObjUpdate {
  inventoryTypeData: InventoryType
  updateTypeHandle: (data: {
    id: string
    name: string
    description?: string
  }) => void
  setValueMode: (value: string) => void
}

export const TypeObjUpdate = ({
  inventoryTypeData,
  updateTypeHandle,
  setValueMode,
}: ITypeObjUpdate) => {
  const [inventoryTypeDataValue, setInventoryTypeDataValue] = useState({
    id: null,
    name: null,
    description: null,
    formattedUpdatedAt: null,
    formattedCreatedAt: null,
    createdBy: null,
    updatedBy: null,
  })

  useEffect(() => {
    if (inventoryTypeData) {
      setInventoryTypeDataValue({
        id: defaultGet(inventoryTypeData, 'id', ''),
        name: defaultGet(inventoryTypeData, 'name', ''),
        description: defaultGet(inventoryTypeData, 'description', ''),
        formattedCreatedAt: defaultGet(
          inventoryTypeData,
          'formattedCreatedAt',
          '',
        ),
        formattedUpdatedAt: defaultGet(
          inventoryTypeData,
          'formattedUpdatedAt',
          '',
        ),
        createdBy: defaultGet(inventoryTypeData, 'createdBy', ''),
        updatedBy: defaultGet(inventoryTypeData, 'updatedBy', ''),
      })
    }
  }, [inventoryTypeData])

  if (inventoryTypeData) {
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
                  label: 'Name',
                  required: true,
                }}
                variant="outlined"
                value={inventoryTypeDataValue?.name}
                onChange={(e) => {
                  setInventoryTypeDataValue((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }}
              />
              <Input
                id={'description'}
                type={'text'}
                name={'description'}
                inputLabel={{
                  label: 'Description',
                  required: false,
                }}
                rows={6}
                multiline
                variant="outlined"
                value={inventoryTypeDataValue?.description}
                onChange={(e) => {
                  setInventoryTypeDataValue((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }}
              />
              <Input
                id={'formattedCreatedAt'}
                type={'text'}
                name={'formattedCreatedAt'}
                inputLabel={{
                  label: 'Created At',
                  required: false,
                }}
                disabled
                variant="outlined"
                value={inventoryTypeDataValue?.formattedCreatedAt}
                onChange={(e) => {
                  setInventoryTypeDataValue((prev) => ({
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
                  label: 'Created By',
                  required: false,
                }}
                disabled
                variant="outlined"
                value={inventoryTypeDataValue?.createdBy}
                onChange={(e) => {
                  setInventoryTypeDataValue((prev) => ({
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
                  label: 'Updated At',
                  required: false,
                }}
                disabled
                variant="outlined"
                value={inventoryTypeDataValue?.formattedUpdatedAt}
                onChange={(e) => {
                  setInventoryTypeDataValue((prev) => ({
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
                  label: 'Updated By',
                  required: false,
                }}
                disabled
                variant="outlined"
                value={inventoryTypeDataValue?.updatedBy}
                onChange={(e) => {
                  setInventoryTypeDataValue((prev) => ({
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
              label={'Update'}
              color={'primary'}
              variant="contained"
              disabled={
                !inventoryTypeDataValue?.id || !inventoryTypeDataValue?.name
              }
              onClick={() => {
                if (
                  inventoryTypeDataValue?.id &&
                  inventoryTypeDataValue?.name
                ) {
                  updateTypeHandle({
                    id: inventoryTypeDataValue.id,
                    description: inventoryTypeDataValue?.description,
                    name: inventoryTypeDataValue.name,
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

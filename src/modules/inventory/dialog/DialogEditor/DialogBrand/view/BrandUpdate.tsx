import ButtonForm from '@/components/common/Button/button'
import { Input } from '@/components/common/Input'
import { BrandType } from '@/core/model/inventory'
import { max } from '@/utils/common/normalizeInput'
import { defaultGet } from '@/utils/common/utils'
import React, { useEffect, useState } from 'react'

interface IBrandObjUpdate {
  inventoryBrandData: BrandType
  updateBrandHandle: (data: {
    id: string
    name: string
    description?: string
  }) => void
  setValueMode: (value: string) => void
}

export const BrandObjUpdate = ({
  inventoryBrandData,
  updateBrandHandle,
  setValueMode,
}: IBrandObjUpdate) => {
  const [inventoryBrandDataValue, setInventoryBrandDataValue] = useState({
    id: null,
    name: null,
    description: null,
    formattedUpdatedAt: null,
    formattedCreatedAt: null,
    createdBy: null,
    updatedBy: null,
  })

  useEffect(() => {
    if (inventoryBrandData) {
      setInventoryBrandDataValue({
        id: defaultGet(inventoryBrandData, 'id', ''),
        name: defaultGet(inventoryBrandData, 'name', ''),
        description: defaultGet(inventoryBrandData, 'description', ''),
        formattedCreatedAt: defaultGet(
          inventoryBrandData,
          'formattedCreatedAt',
          '',
        ),
        formattedUpdatedAt: defaultGet(
          inventoryBrandData,
          'formattedUpdatedAt',
          '',
        ),
        createdBy: defaultGet(inventoryBrandData, 'createdBy', ''),
        updatedBy: defaultGet(inventoryBrandData, 'updatedBy', ''),
      })
    }
  }, [inventoryBrandData])

  if (inventoryBrandData) {
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
                value={inventoryBrandDataValue?.name}
                onChange={(e) => {
                  setInventoryBrandDataValue((prev) => ({
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
                  label: 'Description',
                  required: false,
                }}
                rows={6}
                multiline
                variant="outlined"
                value={inventoryBrandDataValue?.description}
                onChange={(e) => {
                  setInventoryBrandDataValue((prev) => ({
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
                  label: 'Created At',
                  required: false,
                }}
                disabled
                variant="outlined"
                value={inventoryBrandDataValue?.formattedCreatedAt}
                onChange={(e) => {
                  setInventoryBrandDataValue((prev) => ({
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
                value={inventoryBrandDataValue?.createdBy}
                onChange={(e) => {
                  setInventoryBrandDataValue((prev) => ({
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
                value={inventoryBrandDataValue?.formattedUpdatedAt}
                onChange={(e) => {
                  setInventoryBrandDataValue((prev) => ({
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
                value={inventoryBrandDataValue?.updatedBy}
                onChange={(e) => {
                  setInventoryBrandDataValue((prev) => ({
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
                !inventoryBrandDataValue?.id || !inventoryBrandDataValue?.name
              }
              onClick={() => {
                if (
                  inventoryBrandDataValue?.id &&
                  inventoryBrandDataValue?.name
                ) {
                  updateBrandHandle({
                    id: inventoryBrandDataValue.id,
                    description: inventoryBrandDataValue?.description,
                    name: inventoryBrandDataValue.name,
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

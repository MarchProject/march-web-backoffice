import ButtonForm from '@/components/common/Button/button'
import { Input } from '@/components/common/Input'
import { max } from '@/utils/common/normalizeInput'
import React, { useState } from 'react'

interface IBrandObjUpdate {
  updateBrandHandle: (data: {
    id: string
    name: string
    description?: string
  }) => void
  setValueMode: (value: string) => void
}

export const BrandObjCreate = ({
  setValueMode,
  updateBrandHandle,
}: IBrandObjUpdate) => {
  const [inventoryBrandDataValue, setInventoryBrandDataValue] = useState({
    id: null,
    name: null,
    description: null,
  })

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
              rows={6}
              multiline
              inputLabel={{
                label: 'Description',
                required: false,
              }}
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
          </div>
        </div>
        <div className="flex justify-end gap-[10px] my[10px]">
          <ButtonForm
            classNames="!w-[120px] !h-[40px] !w-[100%] !normal-case"
            label={'Back'}
            color={'secondary'}
            variant="outlined"
            onClick={() => {
              setValueMode('view')
            }}
          />
          <ButtonForm
            classNames="!w-[120px] !h-[40px] !w-[100%] !normal-case"
            label={'Create'}
            color={'primary'}
            variant="contained"
            disabled={!inventoryBrandDataValue?.name}
            onClick={() => {
              updateBrandHandle({
                id: undefined,
                description: inventoryBrandDataValue?.description,
                name: inventoryBrandDataValue?.name,
              })
              setValueMode('view')
            }}
          />
        </div>
      </div>
    </div>
  )
}

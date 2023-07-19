import { DialogM } from '@/components/common/Dialog/DialogM'

import React, { useEffect, useRef } from 'react'
import { TypeViewMain } from './view/Container'
import { InventoryType } from '@/core/model/inventory'
import { Input } from '@/components/common/Input'
import InputAdornment from '@mui/material/InputAdornment'
import { RiSearchLine } from 'react-icons/ri'
import { debounce } from 'lodash'
import { AutocompleteInputChangeReason } from '@mui/material'
import { useLoadingContext } from '@/context/loading'

interface IDialogTypeProps {
  open: boolean
  handleClose: () => void
  inventoriesTypeData: InventoryType[]
  deleteTypeHandle: (id: string) => void
  updateTypeHandle: (data: any) => void
  handleSearchInventoryType: (
    event: React.SyntheticEvent,
    value: string,
    reason: AutocompleteInputChangeReason,
  ) => void
}

export const DialogType = ({
  open,
  handleClose,
  inventoriesTypeData,
  deleteTypeHandle,
  updateTypeHandle,
  handleSearchInventoryType,
}: IDialogTypeProps) => {
  const searchFieldRef = useRef(null)
  const { zIndexLoading } = useLoadingContext()
  const handleReset = () => {
    if (searchFieldRef.current) {
      searchFieldRef.current.value = ''
    }
  }

  useEffect(() => {
    return () => {
      handleReset()
    }
  }, [])

  const handleFocus = () => {
    zIndexLoading(20)
  }

  const handleBlur = () => {
    zIndexLoading(9999)
  }

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
            <div
              onFocus={handleFocus}
              onBlur={handleBlur}
              className="flex justify-center mb-[10px] w-full mt-[10px]">
              <Input
                inputRef={searchFieldRef}
                classNames="!w-[552px]"
                id="searchItems"
                variant="outlined"
                placeholder="Search Type here"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <RiSearchLine />
                    </InputAdornment>
                  ),
                }}
                onChange={debounce((e) => {
                  handleSearchInventoryType(
                    undefined,
                    e.target.value,
                    undefined,
                  )
                }, 1000)}
                type={'text'}
                name="searchItems"
                size="small"
              />
            </div>
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

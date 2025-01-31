import { DialogM } from '@/components/common/Dialog/DialogM'

import React, { useEffect, useRef, useState } from 'react'
import { BranchViewMain } from './view/Container'
import { InventoryBranch } from '@/core/model/inventory'
import {
  AutocompleteInputChangeReason,
  InputAdornment,
  debounce,
} from '@mui/material'
import { RiSearchLine } from 'react-icons/ri'
import { Input } from '@/components/common/Input'
import { useLoadingContext } from '@/context/loading'
import { useTranslation } from 'react-i18next'
import { tkeys } from '@/translations/i18n'

interface IDialogBrandProps {
  open: boolean
  handleClose: () => void
  inventoriesBranchData: InventoryBranch[]
  deleteBranchHandle: (id: string) => void
  updateBranchHandle: (data: any) => void
  handleSearchInventoryBranch: (
    event: React.SyntheticEvent,
    value: string,
    reason: AutocompleteInputChangeReason,
  ) => void
  isEditPage?: boolean
}

export const DialogBranch = ({
  open,
  handleClose,
  inventoriesBranchData,
  deleteBranchHandle,
  updateBranchHandle,
  handleSearchInventoryBranch,
  isEditPage = false,
}: IDialogBrandProps) => {
  const { t: trans }: any = useTranslation()
  const keys = tkeys.Inventory.MainPage.dialog.branch
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

  const [isEdit, setIsEdit] = useState(false)
  return (
    <DialogM
      dialogTitle={trans(keys.header.lable)}
      open={open}
      maxWidth="sm"
      handleClose={handleClose}
      dialogContentTextRender={() => {
        return (
          <div className="px-5">
            <p className="text-secondary m-0 px-[4px] text-base">
              {trans(keys.header.sub)}
            </p>
            <div
              onFocus={handleFocus}
              onBlur={handleBlur}
              className="flex justify-center mb-[10px] w-full mt-[10px]">
              {!isEdit && (
                <Input
                  inputRef={searchFieldRef}
                  classNames=""
                  id="searchItems"
                  variant="outlined"
                  placeholder={trans(keys.search)}
                  inputLabel={{
                    classNames: '!w-full',
                    label: '',
                    required: false,
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <RiSearchLine />
                      </InputAdornment>
                    ),
                  }}
                  onChange={debounce((e) => {
                    handleSearchInventoryBranch(
                      undefined,
                      e.target.value,
                      undefined,
                    )
                  }, 1000)}
                  type={'text'}
                  name="searchItems"
                  size="small"
                />
              )}
            </div>
          </div>
        )
      }}
      contentRender={() => {
        return (
          <>
            <BranchViewMain
              inventoriesBranchData={inventoriesBranchData}
              deleteBranchHandle={deleteBranchHandle}
              updateBranchHandle={updateBranchHandle}
              setIsEdit={setIsEdit}
              isEditPage={isEditPage}
              handleClose={handleClose}
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

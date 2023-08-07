import { DialogM } from '@/components/common/Dialog/DialogM'

import React, { useEffect, useRef } from 'react'
import { BrandViewMain } from './view/Container'
import { BrandType } from '@/core/model/inventory'
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
  inventoriesBrandData: BrandType[]
  deleteBrandHandle: (id: string) => void
  updateBrandHandle: (data: any) => void
  handleSearchInventoryBrand: (
    event: React.SyntheticEvent,
    value: string,
    reason: AutocompleteInputChangeReason,
  ) => void
}

export const DialogBrand = ({
  open,
  handleClose,
  inventoriesBrandData,
  deleteBrandHandle,
  updateBrandHandle,
  handleSearchInventoryBrand,
}: IDialogBrandProps) => {
  const { t: trans }: any = useTranslation()
  const keys = tkeys.Inventory.MainPage.dialog.brand
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
            <div
              onFocus={handleFocus}
              onBlur={handleBlur}
              className="flex justify-center mb-[10px] w-full mt-[10px]">
              <Input
                inputRef={searchFieldRef}
                classNames="!w-[552px]"
                id="searchItems"
                variant="outlined"
                placeholder={trans(keys.search)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <RiSearchLine />
                    </InputAdornment>
                  ),
                }}
                onChange={debounce((e) => {
                  handleSearchInventoryBrand(
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
            <BrandViewMain
              inventoriesBrandData={inventoriesBrandData}
              deleteBrandHandle={deleteBrandHandle}
              updateBrandHandle={updateBrandHandle}
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
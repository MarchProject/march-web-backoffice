import { Input } from '@/components/common/Input'
import { IFavoriteStatus } from '@/core/gql/inventory/inventory'
import { styleIconMarch } from '@/utils/style/utill'
import { AutocompleteInputChangeReason, InputAdornment } from '@mui/material'
import { debounce } from 'lodash'
import React, { useRef, useState } from 'react'
import { BsBoxSeam } from 'react-icons/bs'
import { RiSearchLine } from 'react-icons/ri'
import {
  BrandType,
  InventoryNamesClass,
  InventoryTrash,
  InventoryType,
} from '@/core/model/inventory'
import { BiCaretDown } from 'react-icons/bi'
import ButtonForm from '@/components/common/Button/button'
import { AutocompleteSelectAsync } from '@/components/common/Autocomplete/AutocompleteSelect'
import { DialogM } from '@/components/common/Dialog/DialogM'
import { ButtonMenu } from './ButtonMenu'
import { FcLike, FcLikePlaceholder } from 'react-icons/fc'
import { useLoadingContext } from '@/context/loading'
import { max } from '@/utils/common/normalizeInput'
import { useTranslation } from 'react-i18next'
import { tkeys } from '@/translations/i18n'

type InventoryManagementProps = {
  setSearch: (value: string) => void
  handleClearChange: () => void
  inventorySearch: string
  inventoryBrandValue: BrandType[]
  inventoryTypeValue: InventoryType[]
  handleTypeChange: (event, value, reason) => void
  handleBrandChange: (event, value, reason) => void
  inventoryType: {
    setInventoryType?: (value: string) => void
    inventoriesTypeData: InventoryType[]
    inventoriesTypeLoading: boolean
    handleSearchInventoryType: (
      event: React.SyntheticEvent,
      value: string,
      reason: AutocompleteInputChangeReason,
    ) => void
  }
  inventoryBrand: {
    setInventoryBrand?: (value: string) => void
    inventoriesBrandData: BrandType[]
    inventoriesBrandLoading: boolean
    handleSearchInventoryBrand: (
      event: React.SyntheticEvent,
      value: string,
      reason: AutocompleteInputChangeReason,
    ) => void
  }
  setTriggerType: (value: boolean) => void
  setTriggerGetInventoryNames: (value: boolean) => void
  setTriggerBrand: (value: boolean) => void
  setTriggerInventory: (value: boolean) => void
  handleFavoriteChange: () => void
  favorite: IFavoriteStatus
  inventoryNamesData: InventoryNamesClass[]
  trash: {
    trashData: InventoryTrash
    setTriggerTrash: (value: boolean) => void
  }
}

export const InventoryManagement = ({
  setSearch,
  inventoryBrandValue,
  inventoryTypeValue,
  handleTypeChange,
  handleClearChange,
  handleBrandChange,
  setTriggerGetInventoryNames,
  inventoryType: {
    inventoriesTypeData,
    inventoriesTypeLoading,
    handleSearchInventoryType,
  },
  inventoryBrand: {
    inventoriesBrandData,
    inventoriesBrandLoading,
    handleSearchInventoryBrand,
  },
  setTriggerType,
  setTriggerBrand,
  setTriggerInventory,
  handleFavoriteChange,
  favorite,
  inventoryNamesData,
  trash: { trashData, setTriggerTrash },
}: InventoryManagementProps) => {
  const searchFieldRef = useRef(null)
  const typeFieldRef = useRef(null)
  const brandFieldRef = useRef(null)
  const { zIndexLoading } = useLoadingContext()
  const handleReset = () => {
    handleClearChange()
    searchFieldRef.current.value = ''
    typeFieldRef.current.value = ''
    brandFieldRef.current.value = ''
  }
  const { t: trans } = useTranslation()
  const [open, setOpen] = useState(false)
  const handleClickOpen = () => {
    zIndexLoading(20)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    zIndexLoading(9999)
  }

  return (
    <>
      <DialogM
        dialogTitle={trans(tkeys.Inventory.MainPage.filter.label)}
        open={open}
        handleClose={handleClose}
        contentRender={() => {
          return (
            <div className="mx-auto w-full pb-[20px]">
              <AutocompleteSelectAsync
                inputRef={brandFieldRef}
                value={inventoryBrandValue}
                classNames="max-w-[380px] mx-auto p-2"
                id="brandFilter"
                labelIndex="name"
                valueIndex={'id'}
                multiple={true}
                options={inventoriesBrandData}
                InputProps={{
                  label: trans(tkeys.Inventory.MainPage.filter.brand),
                  placeholder: trans(tkeys.Inventory.MainPage.filter.brand),
                }}
                onChange={handleBrandChange}
                loading={inventoriesBrandLoading}
                onInputChange={handleSearchInventoryBrand}
              />
              <AutocompleteSelectAsync
                inputRef={typeFieldRef}
                id="typeFilter"
                classNames="max-w-[380px] mx-auto mt-[10px]"
                labelIndex="name"
                valueIndex={'id'}
                multiple={true}
                options={inventoriesTypeData}
                InputProps={{
                  label: trans(tkeys.Inventory.MainPage.filter.type),
                  placeholder: trans(tkeys.Inventory.MainPage.filter.type),
                }}
                value={inventoryTypeValue}
                onChange={handleTypeChange}
                loading={inventoriesTypeLoading}
                onInputChange={handleSearchInventoryType}
              />
              <div className="!mx-[30px] mt-[20px]">
                <div className="flex gap-[10px] justify-start max-w-[380px]">
                  <ButtonForm
                    classNames="!w-[150px] !h-[40px] !normal-case"
                    label={trans(tkeys.button.favorite)}
                    variant="outlined"
                    color="error"
                    endIcon={
                      favorite === 'DEFAULT' ? (
                        <FcLikePlaceholder
                          className="cursor-pointer text-secondary my-auto"
                          size={18}
                        />
                      ) : (
                        <FcLike
                          className="cursor-pointer text-secondary my-auto"
                          size={18}
                        />
                      )
                    }
                    onClick={() => {
                      handleFavoriteChange()
                    }}
                  />
                </div>
              </div>
            </div>
          )
        }}
        actionRender={() => {
          return (
            <div className="px-[24px] flex gap-2">
              <ButtonForm
                classNames="!w-[80px] !h-[40px] !w-[100%] !normal-case"
                label={trans(tkeys.button.clear)}
                color={'primary'}
                variant="outlined"
                onClick={handleReset}
              />
              <ButtonForm
                classNames="!w-[80px] !h-[40px] !w-[100%] !normal-case"
                label={trans(tkeys.button.close)}
                color={'primary'}
                variant="contained"
                onClick={handleClose}
              />
            </div>
          )
        }}
      />

      <div id="navbar-inventory" className="flex justify-between w-[100%]">
        <div className="flex gap-[15px] my-auto w-[25%]">
          <BsBoxSeam style={styleIconMarch} />
          <p className="text-base text-primary font-medium">
            {trans(tkeys.Inventory.MainPage.HeadText)}
          </p>
        </div>
        <div className="w-[75%] my-auto flex gap-[12px] justify-end">
          <div className="max-w-[220px] w-[100%] min-w-[220px] my-auto ">
            <Input
              inputRef={searchFieldRef}
              classNames="max-w-[220px] w-[100%] min-w-[220px]"
              id="searchItems"
              variant="outlined"
              placeholder={trans(tkeys.Inventory.MainPage.searchText)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <RiSearchLine />
                  </InputAdornment>
                ),
              }}
              onChange={debounce(setSearch, 1000)}
              type={'text'}
              name="searchItems"
              size="small"
              normalizes={[max(60)]}
            />
          </div>
          <div className="flex my-auto gap-[12px]">
            <ButtonForm
              classNames="!w-[120px] !h-[40px] !w-[100%] !normal-case"
              label={trans(tkeys.button.filter)}
              color={'primary'}
              endIcon={<BiCaretDown size={15} />}
              onClick={handleClickOpen}
            />
            <ButtonMenu
              setTriggerType={setTriggerType}
              inventoriesTypeData={inventoriesTypeData}
              setTriggerBrand={setTriggerBrand}
              setTriggerInventory={setTriggerInventory}
              inventoriesBrandData={inventoriesBrandData}
              inventoryNamesData={inventoryNamesData}
              setTriggerGetInventoryNames={setTriggerGetInventoryNames}
              handleSearchInventoryType={handleSearchInventoryType}
              handleSearchInventoryBrand={handleSearchInventoryBrand}
              trashData={trashData}
              setTriggerTrash={setTriggerTrash}
            />
          </div>
        </div>
      </div>
    </>
  )
}

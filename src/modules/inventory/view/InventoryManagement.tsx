import { Input } from '@/components/common/Input'
import { GetInventoryTypes } from '@/core/gql/inventory'
import { styleIconMarch } from '@/utils/style/utill'
import {
  AutocompleteInputChangeReason,
  InputAdornment,
} from '@mui/material'
import { debounce } from 'lodash'
import React, { useRef } from 'react'
import { BsBoxSeam } from 'react-icons/bs'
import { RiSearchLine } from 'react-icons/ri'
import { BrandType, InventoryType } from '@/core/model/inventory'
import { BiCaretDown } from 'react-icons/bi'
import ButtonForm from '@/components/common/Button/button'
import { AutocompleteSelectAsync } from '@/components/common/Autocomplete/AutocompleteSelect'
import { DialogM } from '@/components/common/Dialog/DialogM'
import { ButtonMenu } from './ButtonMenu'
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
    inventoriesTypeData: GetInventoryTypes[]
    inventoriesTypeLoading: boolean
    handleSearchInventoryType: (
      event: React.SyntheticEvent,
      value: string,
      reason: AutocompleteInputChangeReason,
    ) => void
  }
  inventoryBrand: {
    setInventoryBrand?: (value: string) => void
    inventoriesBrandData: GetInventoryTypes[]
    inventoriesBrandLoading: boolean
    handleSearchInventoryBrand: (
      event: React.SyntheticEvent,
      value: string,
      reason: AutocompleteInputChangeReason,
    ) => void
  }
  setTriggerType: (value: boolean) => void
}
export const InventoryManagement = ({
  setSearch,
  inventoryBrandValue,
  inventoryTypeValue,
  handleTypeChange,
  handleClearChange,
  handleBrandChange,
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
}: InventoryManagementProps) => {
  const searchFieldRef = useRef(null)
  const typeFieldRef = useRef(null)
  const brandFieldRef = useRef(null)

  const handleReset = () => {
    handleClearChange()
    searchFieldRef.current.value = ''
    typeFieldRef.current.value = ''
    brandFieldRef.current.value = ''
  }

  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <DialogM
        dialogTitle="Filter"
        open={open}
        handleClose={handleClose}
        contentRender={() => {
          return (
            <div className="mx-auto">
              <AutocompleteSelectAsync
                inputRef={brandFieldRef}
                value={inventoryBrandValue}
                classNames="max-w-[250px] mx-auto p-2"
                id="brandFilter"
                labelIndex="name"
                valueIndex={'id'}
                multiple={true}
                options={inventoriesBrandData}
                InputProps={{ label: 'Brand Filter', placeholder: 'Brand' }}
                onChange={handleBrandChange}
                loading={inventoriesBrandLoading}
                onInputChange={handleSearchInventoryBrand}
              />
              <AutocompleteSelectAsync
                inputRef={typeFieldRef}
                id="typeFilter"
                classNames="max-w-[250px] mx-auto mt-[10px]"
                labelIndex="name"
                valueIndex={'id'}
                multiple={true}
                options={inventoriesTypeData}
                InputProps={{ label: 'Type Filter', placeholder: 'Type' }}
                value={inventoryTypeValue}
                onChange={handleTypeChange}
                loading={inventoriesTypeLoading}
                onInputChange={handleSearchInventoryType}
              />
            </div>
          )
        }}
        actionRender={() => {
          return (
            <>
              <ButtonForm
                classNames="!w-[60px] !h-[40px] !w-[100%] !normal-case"
                label={'Clear'}
                color={'primary'}
                variant="text"
                onClick={handleReset}
              />
              <ButtonForm
                classNames="!w-[60px] !h-[40px] !w-[100%] !normal-case"
                label={'Close'}
                color={'primary'}
                variant="text"
                onClick={handleClose}
              />
            </>
          )
        }}
      />
      <div id="navbar-inventory" className="flex justify-between">
        <div className="flex gap-[15px] my-auto w-[100%]">
          <BsBoxSeam style={styleIconMarch} />
          <p className="text-base text-primary">Inventory Management</p>
        </div>
        <div className="w-[100%] max-w-[950px] my-auto flex gap-[12px] justify-end">
          <Input
            inputRef={searchFieldRef}
            classNames="max-w-[220px] w-[100%] min-w-[220px]"
            id="searchItems"
            variant="outlined"
            placeholder="Search item here"
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
          />
          <div className="flex my-auto gap-[12px]">
            <ButtonForm
              classNames="!w-[120px] !h-[40px] !w-[100%] !normal-case"
              label={'Filter'}
              color={'primary'}
              endIcon={<BiCaretDown size={15} />}
              onClick={handleClickOpen}
            />
            <ButtonMenu
              setTriggerType={setTriggerType}
              inventoriesTypeData={inventoriesTypeData}
            />
          </div>
        </div>
      </div>
    </>
  )
}

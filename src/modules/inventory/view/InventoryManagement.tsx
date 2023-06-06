import { Input } from '@/components/common/Input'
import { GetInventoryTypes } from '@/core/gql/inventory'
import { styleIconMarch } from '@/utils/style/utill'
import {
  AutocompleteInputChangeReason,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputAdornment,
} from '@mui/material'
import { debounce } from 'lodash'
import React, { useRef } from 'react'
import { BsBoxSeam } from 'react-icons/bs'
import { RiSearchLine } from 'react-icons/ri'
import { BrandType, InventoryType } from '@/core/model/inventory'
import { BiCaretDown } from 'react-icons/bi'
import ButtonForm from '@/components/common/Button/button'
import { RiAddLine } from 'react-icons/ri'
import router from 'next/router'
import { inventoryCreateRoute } from '@/router/inventory'
import { AutocompleteSelectAsync } from '@/components/common/Autocomplete/AutocompleteSelect'
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
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          '& .MuiPaper-root': {
            maxWidth: '440px',
            width: '100%',
            borderRadius: '10px',
          },
        }}>
        <DialogTitle id="alert-dialog-title">{'Filter'}</DialogTitle>
        <DialogContent>
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
              classLogic={
                {
                  // classLogicFalse: 'max-w-[250px]',
                  // classLogicTrue: 'absolute max-w-[250px] mr-[430px]',
                }
              }
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
              classLogic={
                {
                  // classLogicFalse: 'max-w-[250px]',
                  // classLogicTrue: 'absolute max-w-[250px] mr-[230px]',
                }
              }
              value={inventoryTypeValue}
              onChange={handleTypeChange}
              loading={inventoriesTypeLoading}
              onInputChange={handleSearchInventoryType}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleReset} autoFocus>
            Clear
          </Button>
          <Button onClick={handleClose} autoFocus>
            close
          </Button>
        </DialogActions>
      </Dialog>
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
            <ButtonForm
              classNames="!w-[150px] !h-[40px] !normal-case"
              label={'Add Item'}
              color={'primary'}
              endIcon={<RiAddLine size={15} />}
              onClick={() => {
                router.push({ pathname: inventoryCreateRoute.path })
              }}
            />
          </div>
        </div>
      </div>
    </>
  )
}

import AutocompleteSelectAsync from '@/components/common/Autocomplete/AutocompleteSelect'
import { Input } from '@/components/common/Input'
import { GetInventoriesTypeData, GetInventoryTypes } from '@/core/gql/inventory'
import { styleIconMarch } from '@/utils/style/utill'
import { InputAdornment, TextField } from '@mui/material'
import { debounce } from 'lodash'
import React, { useState } from 'react'
import { BsBoxSeam } from 'react-icons/bs'
import { RiSearchLine } from 'react-icons/ri'
import { InventoryType } from '@/core/model/inventory'

type InventoryManagementProps = {
  setSearch: (value: string) => void
  handleTypeChange: (event, value, reason) => void
  inventoryType: {
    setInventoryType?: (value: string) => void
    inventoriesTypeData: GetInventoryTypes[]
    inventoriesTypeLoading: boolean
  }
}
export const InventoryManagement = ({
  setSearch,
  handleTypeChange,
  inventoryType: {
    setInventoryType,
    inventoriesTypeData,
    inventoriesTypeLoading,
  },
}: InventoryManagementProps) => {
  const handleTypingSearch = debounce((inputValue) => {
    setSearch(inputValue.target.value)
  }, 1000)

  return (
    <div className="flex justify-between">
      <div className="flex gap-[15px] my-auto">
        <BsBoxSeam style={styleIconMarch} />
        <p className="text-base">Inventory Management</p>
      </div>
      <div className="w-[100%] max-w-[800px] my-auto flex gap-[15px] justify-end">
        <AutocompleteSelectAsync
          id="typeFilter"
          labelIndex="name"
          valueIndex={'id'}
          multiple={true}
          options={inventoriesTypeData}
          classLogic={{
            classLogicFalse: 'max-w-[220px]',
            classLogicTrue: 'absolute max-w-[220px] mr-[230px]',
          }}
          onChange={handleTypeChange}
          loading={inventoriesTypeLoading}
          // value={value}
        />
        {/* <AutocompleteSelectAsync id="" /> */}
        <Input
          classNames="max-w-[220px] w-[100%]"
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
          onChange={handleTypingSearch}
          type={'text'}
          name="searchItems"
          size="small"
        />
        {/* <TextField
          id="searchItems"
          name="searchItems"
          variant="outlined"
          fullWidth
          placeholder="Search item here"
          size="small"
          className="max-w-[220px] w-[100%]"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <RiSearchLine />
              </InputAdornment>
            ),
          }}
          type={'text'}
          onChange={(e) => {
            handleTyping(e.target.value)
          }}
        /> */}
      </div>
    </div>
  )
}

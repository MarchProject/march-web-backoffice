import { styleIconMarch } from '@/utils/style/utill'
import { InputAdornment, TextField } from '@mui/material'
import { debounce } from 'lodash'
import React from 'react'
import { BsBoxSeam } from 'react-icons/bs'
import { RiSearchLine } from 'react-icons/ri'

type InventoryManagementProps = {
  setSearch: (value: string) => void
}
export const InventoryManagement = ({
  setSearch,
}: InventoryManagementProps) => {
  const handleTyping = debounce((inputValue) => {
    setSearch(inputValue)
  }, 1000)

  return (
    <div className="flex justify-between">
      <div className="flex gap-[15px]">
        <BsBoxSeam style={styleIconMarch} />
        <p className="text-base">Inventory Management</p>
      </div>
      <div className="max-w-[220px] my-auto">
        <TextField
          id="searchItems"
          name="searchItems"
          variant="outlined"
          fullWidth
          placeholder="Search item here"
          size="small"
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
        />
      </div>
    </div>
  )
}

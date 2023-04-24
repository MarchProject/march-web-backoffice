import { InputAdornment, TextField } from '@mui/material'
import React from 'react'
import SearchIcon from '@mui/icons-material/Search'

const EditorInventory = () => {
  return (
    <>
      <div className="flex gap-[15px]">
        <div className="w-full px-[10px] max-w-[270px]">
          <h3 className="text-primary my-[10px] font-normal">
            Search For Inventories
          </h3>
          <h5 className="text-secondary m-0 text-sm font-normal">
            Type name of items
          </h5>
          <div className="mt-[30px]">
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
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              type={'text'}
            />
          </div>
        </div>
        <div className="w-full max-w-[100%]">
          <h2>91</h2>
        </div>
      </div>
    </>
  )
}

export default EditorInventory

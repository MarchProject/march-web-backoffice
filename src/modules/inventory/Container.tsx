import SearchIcon from '@mui/icons-material/Search'
import {
  GetInventoriesData,
  GetInventoriesVariables,
  getInventoriesQuery,
} from '@/core/gql/inventory'
import { useLazyQuery } from '@apollo/client'
import { InputAdornment, TextField } from '@mui/material'
import React, { useEffect } from 'react'
import EnhancedTable from '@/components/inventory/table'

const ContainerInventory = () => {
  const [getInventories, { loading, error, data }] = useLazyQuery<
    GetInventoriesData,
    GetInventoriesVariables
  >(getInventoriesQuery)

  useEffect(() => {
    if (data) {
      console.log({ data })
    }
  }, [data])

  return (
    <div
      className="flex gap-[15px] w-full"
      style={{ backgroundColor: '#F5F3F7' }}>
      {/* <div className="w-full px-[10px] max-w-[270px]">
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
      <div className="w-full">
        <div className="w-full sm:flex sm:flex-wrap">
          <div className="sm:w-1/4" style={{ backgroundColor: 'blue' }}>
            1
          </div>
          <div className="sm:w-1/4" style={{ backgroundColor: 'red' }}>
            2
          </div>
          <div className="sm:w-1/4" style={{ backgroundColor: 'red' }}>
            3
          </div>
          <div className="sm:w-1/4" style={{ backgroundColor: 'red' }}>
            4
          </div>
        </div>
      </div> */}
      <div className="w-full">
        <div className='p-10 flex justify-center'>
          <EnhancedTable />
        </div>
      </div>
    </div>
  )
}

export default ContainerInventory

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
    <div className="flex gap-[15px] w-full mainBg">
      <div className="w-full bg-white">
        <div className=" flex justify-center">
          <EnhancedTable />
        </div>
      </div>
    </div>
  )
}

export default ContainerInventory

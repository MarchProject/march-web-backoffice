import {
  GetInventoriesData,
  GetInventoriesVariables,
  getInventoriesQuery,
} from '@/core/gql/inventory'
import { useLazyQuery } from '@apollo/client'
import React, { useEffect } from 'react'
import { InventoryManagement } from './view/InventoryManagement'
import DataTableMarch from '@/components/common/Table/table'
import { columns } from './view/column'

const ContainerInventory = () => {
  const [getInventories, { data }] = useLazyQuery<
    GetInventoriesData,
    GetInventoriesVariables
  >(getInventoriesQuery)

  useEffect(() => {
    getInventories({
      variables: {
        params: {
          limit: 20,
          offset: 0,
          search: '',
        },
      },
    })
  }, [])

  useEffect(() => {
    if (data) {
      console.log({ data })
    }
  }, [data])

  const onRow = (rows, reason) => {
    console.log({ rows, reason })
  }
  const onPaginationModelChange = (model, reason) => {
    console.log({ model, reason })
  }

  return (
    <div className="w-full mainBg">
      <div className="bg-white m-4 rounded-lg">
        <div className="p-4">
          <InventoryManagement />
          <DataTableMarch
            rows={data?.getInventories || []}
            columns={columns()}
            onRow={onRow}
            onPaginationModelChange={onPaginationModelChange}
          />
        </div>
      </div>
    </div>
  )
}

export default ContainerInventory

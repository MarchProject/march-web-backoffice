import { EnumSeverity, useNotificationContext } from '@/context/notification'
import {
  GetInventoriesData,
  GetInventoriesVariables,
  getInventoriesQuery,
} from '@/core/gql/inventory'
import { useLazyQuery } from '@apollo/client'
import { debounce } from 'lodash'
import { useEffect, useState } from 'react'

const notificationErrorProp = {
  severity: EnumSeverity.error,
  title: 'Inventory',
  message: 'Fetch Error',
}

export const useInventoryController = () => {
  const { notification } = useNotificationContext()
  const { getInventories, inventoryData, inventoryLoading } = useQueryInventory(
    { notification },
  )
  const {
    inventoryPage,
    inventoryLimit,
    inventorySearch,
    onPaginationModelChange,
    onRow,
    handleChangeInventory,
    setPage,
  } = useGlobalInventory({ getInventories, inventoryData })

  return {
    globalState: {
      inventoryPage,
      inventoryLimit,
      inventorySearch,
      onPaginationModelChange,
      onRow,
      handleChangeInventory,
      setPage,
    },
    inventoryData: {
      inventoryData,
      inventoryLoading,
    },
  }
}

const useQueryInventory = ({ notification }) => {
  const [getInventories, { data, loading, error }] = useLazyQuery<
    GetInventoriesData,
    GetInventoriesVariables
  >(getInventoriesQuery)

  useEffect(() => {
    if (error) {
      notification(notificationErrorProp)
    }
  }, [error])

  return {
    getInventories,
    inventoryData: data,
    inventoryLoading: loading,
  }
}
const useGlobalInventory = ({
  getInventories,
  inventoryData,
}: UseGlobalInventoryProps) => {
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(15)
  const [search, setSearch] = useState('')

  const handleSearch = debounce((search) => {
    getInventories({
      variables: {
        params: {
          limit: limit,
          pageNo: page,
          search: search,
          type: '',
          brand: '',
        },
      },
    })
  }, 500)

  const handleChange = (value) => {
    setSearch(value)
    handleSearch(value)
  }

  useEffect(() => {
    handleSearch(search)
  }, [page, limit, search])

  useEffect(() => {
    if (inventoryData?.getInventories?.inventories?.length === 0) {
      setPage(
        inventoryData?.getInventories?.totalPage === 0
          ? 1
          : inventoryData?.getInventories?.totalPage,
      )
    }
  }, [inventoryData?.getInventories?.inventories])

  const onRow = (rows, reason) => {
    console.log({ rows, reason })
  }
  const onPaginationModelChange = (model, _) => {
    setLimit(model.pageSize)
  }

  return {
    inventoryPage: page,
    inventoryLimit: limit,
    inventorySearch: search,
    onPaginationModelChange,
    onRow,
    handleChangeInventory: handleChange,
    setPage,
  }
}

type UseGlobalInventoryProps = {
  getInventories: any
  inventoryData: GetInventoriesData
}

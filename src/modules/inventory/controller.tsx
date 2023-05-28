import { EnumSeverity, useNotificationContext } from '@/context/notification'
import {
  GetInventoriesData,
  GetInventoriesTypeData,
  GetInventoriesTypeVariables,
  GetInventoriesVariables,
  getInventoriesQuery,
  getInventoriesTypeQuery,
} from '@/core/gql/inventory'
import {
  InventoriesResponse,
  Inventory,
  InventoryType,
} from '@/core/model/inventory'
import { LazyQueryExecFunction, useLazyQuery, useQuery } from '@apollo/client'
import {
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
} from '@mui/material'
import { plainToClass, plainToInstance } from 'class-transformer'
import { debounce } from 'lodash'
import { SyntheticEvent, useCallback, useEffect, useState } from 'react'

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
    setType,
    setPage,
  } = useGlobalInventory({ getInventories, inventoryData })
  const {
    inventoriesTypeData,
    inventoriesTypeDataError,
    inventoriesTypeLoading,
  } = useQueryInventoryType()

  const { handleTypeChange } = useHandleInventory({ setType })
  return {
    globalState: {
      inventoryPage,
      inventoryLimit,
      inventorySearch,
      onPaginationModelChange,
      onRow,
      handleChangeInventory,
      setType,
      setPage,
    },
    inventory: {
      inventoryData,
      inventoryLoading,
    },
    inventoriesType: {
      inventoriesTypeData,
      inventoriesTypeDataError,
      inventoriesTypeLoading,
    },
    handleInventory: {
      handleTypeChange,
    },
  }
}

const useQueryInventoryType = () => {
  const [search, setSearch] = useState<string>('')
  const [limit, setLimit] = useState<number>(20)
  const [offset, setOffset] = useState<number>(0)
  const [inventoriesTypeData, setInventoriesTypeData] = useState([])
  const [getInventoryTypes, { data, error, loading }] = useLazyQuery<
    GetInventoriesTypeData,
    GetInventoriesTypeVariables
  >(getInventoriesTypeQuery)

  useEffect(() => {
    if (data) {
      const _inventoriyType = plainToInstance(
        InventoryType,
        data?.getInventoryTypes,
      )
      setInventoriesTypeData(_inventoriyType)
    }
  }, [data])

  const getInventoryTypesHandle = useCallback(() => {
    getInventoryTypes({
      variables: {
        params: {
          search,
          limit,
          offset,
        },
      },
    })
  }, [getInventoryTypes, limit, offset, search])

  useEffect(() => {
    getInventoryTypesHandle()
  }, [getInventoryTypesHandle, search])

  return {
    inventoriesTypeData: inventoriesTypeData,
    inventoriesTypeDataError: error,
    inventoriesTypeLoading: loading,
  }
}

const useQueryInventory = ({ notification }) => {
  const [getInventories, { data, loading, error }] = useLazyQuery<
    GetInventoriesData,
    GetInventoriesVariables
  >(getInventoriesQuery)

  const _inventories = plainToInstance(
    Inventory,
    data?.getInventories?.inventories,
  )

  if (data && _inventories) {
    data.getInventories.inventories = _inventories
  }

  useEffect(() => {
    if (error) {
      notification(notificationErrorProp)
    }
  }, [error, notification])

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
  const [type, setType] = useState<string[]>([])
  const [brand, setBrand] = useState<string[]>([])

  const handleSearch = useCallback(() => {
    getInventories({
      variables: {
        params: {
          limit: limit,
          pageNo: page,
          search: search,
          type: type,
          brand: brand,
        },
      },
    })
  }, [brand, getInventories, limit, page, search, type])

  const handleSearchChange = (value: string) => {
    setSearch(value)
  }

  useEffect(() => {
    handleSearch()
  }, [handleSearch])

  useEffect(() => {
    if (inventoryData?.getInventories?.inventories?.length === 0) {
      setPage(
        inventoryData?.getInventories?.totalPage === 0
          ? 1
          : inventoryData?.getInventories?.totalPage,
      )
    }
  }, [
    inventoryData?.getInventories?.inventories,
    inventoryData?.getInventories?.totalPage,
  ])

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
    handleChangeInventory: handleSearchChange,
    setType,
    setPage,
  }
}

const useHandleInventory = ({ setType }) => {
  const handleTypeChange = (
    event: SyntheticEvent<Element, Event>,
    value: InventoryType[],
    reason: AutocompleteChangeReason,
    // details?: AutocompleteChangeDetails,
  ) => {
    console.log({ event, value, reason })
    const ids: string[] = value.map((e) => {
      return e.id
    })
    console.log({ ids })
    setType(ids)
  }

  return {
    handleTypeChange,
  }
}

type UseGlobalInventoryProps = {
  getInventories: LazyQueryExecFunction<
    GetInventoriesData,
    GetInventoriesVariables
  >
  inventoryData: GetInventoriesData
}

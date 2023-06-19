import { EnumSeverity, useNotificationContext } from '@/context/notification'
import {
  GetInventoriesBrandData,
  GetInventoriesBrandVariables,
  GetInventoriesData,
  GetInventoriesTypeData,
  GetInventoriesTypeVariables,
  GetInventoriesVariables,
  getInventoriesBrandQuery,
  getInventoriesQuery,
  getInventoriesTypeQuery,
} from '@/core/gql/inventory'
import { BrandType, Inventory, InventoryType } from '@/core/model/inventory'
import { useLazyQuery } from '@apollo/client'
import {
  AutocompleteChangeReason,
  AutocompleteInputChangeReason,
} from '@mui/material'
import { plainToInstance } from 'class-transformer'
import { SyntheticEvent, useCallback, useEffect, useState } from 'react'

const notificationErrorProp = {
  severity: EnumSeverity.error,
  title: 'Inventory',
  message: 'Fetch Error',
}

export const useInventoryController = () => {
  const { notification } = useNotificationContext()
  const [triggerType, setTriggerType] = useState(true)
  const [triggerBrand, setTriggerBrand] = useState(true)
  const {
    inventoryData,
    inventoryLoading,
    inventoryPage,
    inventoryLimit,
    inventorySearch,
    onPaginationModelChange,
    onRow,
    handleChangeInventory,
    setType,
    setPage,
    setBrand,
    handleClearChange,
    inventoryTypeValue,
    inventoryBrandValue,
  } = useQueryInventory({ notification, triggerType, triggerBrand })
  // const {} = useGlobalInventory({ getInventories, inventoryData })
  const {
    inventoriesTypeData,
    inventoriesTypeDataError,
    inventoriesTypeLoading,
    handleSearchInventoryType,
  } = useQueryInventoryType(triggerType)

  const {
    inventoriesBrandData,
    inventoriesBrandDataError,
    inventoriesBrandLoading,
    handleSearchInventoryBrand,
  } = useQueryInventoryBrand(triggerBrand)
  const { handleTypeChange, handleBrandChange } = useHandleInventory({
    setType,
    setBrand,
  })
  return {
    globalState: {},
    setTriggerType,
    setTriggerBrand,
    inventory: {
      inventoryData,
      inventoryLoading,
      inventoryPage,
      inventoryLimit,
      inventorySearch,
      handleClearChange,
      onPaginationModelChange,
      onRow,
      handleChangeInventory,
      setType,
      setPage,
      setBrand,
      inventoryTypeValue,
      inventoryBrandValue,
    },
    inventoriesType: {
      inventoriesTypeData,
      inventoriesTypeDataError,
      inventoriesTypeLoading,
      handleSearchInventoryType,
    },
    inventoriesBrand: {
      inventoriesBrandData,
      inventoriesBrandDataError,
      inventoriesBrandLoading,
      handleSearchInventoryBrand,
    },
    handleInventory: {
      handleTypeChange,
      handleBrandChange,
    },
  }
}

export const useQueryInventoryBrand = (trigger: any) => {
  const [search, setSearch] = useState<string>('')
  const [inventoriesBrandData, setInventoriesBrandData] = useState([])
  const [getBrandTypes, { data, error, loading }] = useLazyQuery<
    GetInventoriesBrandData,
    GetInventoriesBrandVariables
  >(getInventoriesBrandQuery)

  const onInputTypeChange = useCallback(
    (
      _: React.SyntheticEvent,
      value: string,
      __: AutocompleteInputChangeReason,
    ) => {
      setSearch(value)
    },
    [setSearch],
  )

  useEffect(() => {
    if (data) {
      const _inventoryBrand = plainToInstance(BrandType, data?.getBrandTypes)
      setInventoriesBrandData(_inventoryBrand)
    }
  }, [data])

  const getInventoryBrandHandle = useCallback(() => {
    getBrandTypes({
      variables: {
        params: {
          search,
          limit: 999,
          offset: 0,
        },
      },
    })
  }, [getBrandTypes, search])

  useEffect(() => {
    getInventoryBrandHandle()
  }, [getInventoryBrandHandle, search, trigger])

  return {
    inventoriesBrandData: inventoriesBrandData,
    inventoriesBrandDataError: error,
    inventoriesBrandLoading: loading,
    handleSearchInventoryBrand: onInputTypeChange,
  }
}

export const useQueryInventoryType = (trigger?: any) => {
  const [search, setSearch] = useState<string>('')
  const [inventoriesTypeData, setInventoriesTypeData] = useState([])
  const [getInventoryTypes, { data, error, loading }] = useLazyQuery<
    GetInventoriesTypeData,
    GetInventoriesTypeVariables
  >(getInventoriesTypeQuery)

  const onInputTypeChange = useCallback(
    (
      _: React.SyntheticEvent,
      value: string,
      reason: AutocompleteInputChangeReason,
    ) => {
      console.log({ reason, value })
      setSearch(value)
    },
    [setSearch],
  )

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
          limit: 999,
          offset: 0,
        },
      },
    })
  }, [getInventoryTypes, search])

  useEffect(() => {
    getInventoryTypesHandle()
  }, [getInventoryTypesHandle, search, trigger])

  return {
    inventoriesTypeData: inventoriesTypeData,
    inventoriesTypeDataError: error,
    inventoriesTypeLoading: loading,
    handleSearchInventoryType: onInputTypeChange,
  }
}

const useQueryInventory = ({ notification, triggerBrand, triggerType }) => {
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(15)
  const [search, setSearch] = useState('')
  const [type, setType] = useState<InventoryType[]>([])
  const [brand, setBrand] = useState<BrandType[]>([])

  const [getInventories, { data, loading, error }] = useLazyQuery<
    GetInventoriesData,
    GetInventoriesVariables
  >(getInventoriesQuery)

  const handleSearch = useCallback(() => {
    getInventories({
      variables: {
        params: {
          limit: limit,
          pageNo: page,
          search: search,
          type: type.map((e: any) => {
            return e.id
          }),
          brand: brand.map((e: any) => {
            return e.id
          }),
        },
      },
    })
  }, [brand, getInventories, limit, page, search, type])

  const handleSearchChange = (value: any) => {
    setSearch(value.target.value)
  }

  const handleClearChange = () => {
    setSearch('')
    setType([])
    setBrand([])
  }

  useEffect(() => {
    handleSearch()
  }, [handleSearch, triggerBrand, triggerType])

  useEffect(() => {
    if (data?.getInventories?.inventories?.length === 0) {
      setPage(
        data?.getInventories?.totalPage === 0
          ? 1
          : data?.getInventories?.totalPage,
      )
    }
  }, [data?.getInventories?.inventories, data?.getInventories?.totalPage])

  const onRow = (rows, reason) => {
    console.log({ rows, reason })
  }
  const onPaginationModelChange = (model, _) => {
    setLimit(model.pageSize)
  }

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
    handleClearChange,
    inventoryPage: page,
    inventoryLimit: limit,
    inventorySearch: search,
    onPaginationModelChange,
    onRow,
    handleChangeInventory: handleSearchChange,
    setType,
    setPage,
    setBrand,
    inventoryTypeValue: type,
    inventoryBrandValue: brand,
  }
}

// const useGlobalInventory = ({}) => {}

const useHandleInventory = ({ setType, setBrand }) => {
  const handleTypeChange = useCallback(
    (
      _: SyntheticEvent<Element, Event>,
      value: InventoryType[],
      reason: AutocompleteChangeReason,
    ) => {
      if (reason === 'selectOption' || reason === 'removeOption') {
        setType(value)
      } else {
        setType([])
      }
    },
    [setType],
  )

  const handleBrandChange = useCallback(
    (
      _: SyntheticEvent<Element, Event>,
      value: BrandType[],
      reason: AutocompleteChangeReason,
    ) => {
      if (reason === 'selectOption' || reason === 'removeOption') {
        setBrand(value)
      } else {
        setBrand([])
      }
    },
    [setBrand],
  )

  return {
    handleTypeChange,
    handleBrandChange,
  }
}

// type UseGlobalInventoryProps = {
//   getInventories: LazyQueryExecFunction<
//     GetInventoriesData,
//     GetInventoriesVariables
//   >
//   inventoryData: GetInventoriesData
// }

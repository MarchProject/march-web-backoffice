import { EnumSeverity, useNotificationContext } from '@/context/notification'
import { useLazyQueryData } from '@/core/adapter/hook/useLazyData'
import { useMutationData } from '@/core/adapter/hook/useMutationData'
import { MutateKey, QueryKey } from '@/core/adapter/interface'
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
  IFavoriteStatus,
  favoriteInventoryMutation,
  FavoriteInventoryData,
  FavoriteInventoryVariables,
  InventoryNames,
  getInventoryNamesQuery,
} from '@/core/gql/inventory'
import {
  BrandType,
  InventoriesResponse,
  InventoryNamesClass,
  InventoryType,
} from '@/core/model/inventory'
import {
  AutocompleteChangeReason,
  AutocompleteInputChangeReason,
} from '@mui/material'
import { SyntheticEvent, useCallback, useEffect, useState } from 'react'

const notificationErrorProp = (message) => {
  return {
    severity: EnumSeverity.error,
    title: 'Inventory',
    message: `Fetch ${message}`,
  }
}

const notificationSuccessFavoriteProp = {
  severity: EnumSeverity.success,
  title: 'Inventory',
  message: 'Favorite Success',
}

export const useInventoryController = () => {
  const { notification } = useNotificationContext()
  const [triggerType, setTriggerType] = useState(true)
  const [triggerBrand, setTriggerBrand] = useState(true)
  const [triggerFavorite, setTriggerFavorite] = useState(true)
  const [triggerGetInventoryNames, setTriggerGetInventoryNames] = useState(true)
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
    setFavorite,
    favorite,
    handleFavoriteChange,
    handleClearChange,
    inventoryTypeValue,
    inventoryBrandValue,
  } = useQueryInventory({
    notification,
    triggerType,
    triggerBrand,
    triggerFavorite,
    triggerGetInventoryNames,
  })

  const {
    inventoriesTypeData,
    inventoriesTypeDataError,
    inventoriesTypeLoading,
    handleSearchInventoryType,
  } = useQueryInventoryType(triggerType, notification)
  const { inventoryNamesData, inventoryNamesError, inventoryNamesLoading } =
    useGetNameItems({ notification, triggerGetInventoryNames })
  const { favoriteInventoryHandle } = useMutationFavorite({
    notification,
    setTriggerFavorite,
  })

  const {
    inventoriesBrandData,
    inventoriesBrandDataError,
    inventoriesBrandLoading,
    handleSearchInventoryBrand,
  } = useQueryInventoryBrand(triggerBrand, notification)
  const { handleTypeChange, handleBrandChange } = useHandleInventory({
    setType,
    setBrand,
  })
  return {
    globalState: {},
    setTriggerType,
    setTriggerBrand,
    setTriggerFavorite,
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
      favorite,
      setFavorite,
      handleFavoriteChange,
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
    favoriteInventoryHandle,
    InventoryNames: {
      inventoryNamesData,
      inventoryNamesError,
      inventoryNamesLoading,
      setTriggerGetInventoryNames,
    },
  }
}

const useGetNameItems = ({ notification, triggerGetInventoryNames }) => {
  const [dataTranform, setDataTranform] = useState<InventoryNamesClass[]>([])

  const { trigger, error, loading } = useLazyQueryData<
    QueryKey.inventory,
    InventoryNames,
    any
  >(
    QueryKey.inventory,
    (tranform, data) => {
      return tranform.inventoryNames(data)
    },
    getInventoryNamesQuery,
    {
      onSuccess: (data) => {
        setDataTranform(data)
      },
      onError: (error) => {
        notification(notificationErrorProp(error))
      },
    },
  )

  useEffect(() => {
    trigger()
  }, [trigger, triggerGetInventoryNames])

  return {
    inventoryNamesData: dataTranform,
    inventoryNamesError: error,
    inventoryNamesLoading: loading,
  }
}

export const useQueryInventoryBrand = (trigger: any, notification) => {
  const [search, setSearch] = useState<string>('')
  const [inventoriesBrandData, setInventoriesBrandData] = useState<BrandType[]>(
    [],
  )
  const {
    trigger: getBrandTypesTrigger,
    error: getBrandTypesError,
    loading: getBrandTypesLoading,
  } = useLazyQueryData<
    QueryKey.inventory,
    GetInventoriesBrandData,
    GetInventoriesBrandVariables
  >(
    QueryKey.inventory,
    (tranform, data) => {
      return tranform.inventoryBrands(data)
    },
    getInventoriesBrandQuery,
    {
      onSuccess: (data) => {
        setInventoriesBrandData(data)
      },
      onError: (error) => {
        notification(notificationErrorProp(error))
      },
    },
  )

  const onInputBrandChange = useCallback(
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
    getBrandTypesTrigger({
      params: {
        search,
        // limit: 999,
        // offset: 0,
      },
    })
  }, [getBrandTypesTrigger, search, trigger])

  return {
    inventoriesBrandData: inventoriesBrandData,
    inventoriesBrandDataError: getBrandTypesError,
    inventoriesBrandLoading: getBrandTypesLoading,
    handleSearchInventoryBrand: onInputBrandChange,
  }
}

export const useQueryInventoryType = (trigger: any, notification: any) => {
  const [search, setSearch] = useState<string>('')
  const [inventoriesTypeData, setInventoriesTypeData] = useState<
    InventoryType[]
  >([])

  const {
    trigger: getInventoryTypesTrigger,
    error: getInventoryTypesError,
    loading: getInventoryTypesLoading,
  } = useLazyQueryData<
    QueryKey.inventory,
    GetInventoriesTypeData,
    GetInventoriesTypeVariables
  >(
    QueryKey.inventory,
    (tranform, data) => {
      return tranform.InventoryType(data)
    },
    getInventoriesTypeQuery,
    {
      onSuccess: (data) => {
        setInventoriesTypeData(data)
      },
      onError: (error) => {
        notification(notificationErrorProp(error))
      },
    },
  )

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
    getInventoryTypesTrigger({
      params: {
        search,
        // limit: 999,
        // offset: 0,
      },
    })
  }, [getInventoryTypesTrigger, search, trigger])

  return {
    inventoriesTypeData: inventoriesTypeData,
    inventoriesTypeDataError: getInventoryTypesError,
    inventoriesTypeLoading: getInventoryTypesLoading,
    handleSearchInventoryType: onInputTypeChange,
  }
}

const useQueryInventory = ({
  notification,
  triggerBrand,
  triggerType,
  triggerFavorite,
  triggerGetInventoryNames,
}) => {
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(15)
  const [search, setSearch] = useState('')
  const [type, setType] = useState<InventoryType[]>([])
  const [brand, setBrand] = useState<BrandType[]>([])
  const [favorite, setFavorite] = useState<IFavoriteStatus>('DEFAULT')
  const [inventoriesData, setInventoriesData] = useState<InventoriesResponse>()

  const {
    trigger: getInventoriesTrigger,
    error: getInventoriesError,
    loading: getInventoriesLoading,
  } = useLazyQueryData<
    QueryKey.inventory,
    GetInventoriesData,
    GetInventoriesVariables
  >(
    QueryKey.inventory,
    (tranform, data) => {
      return tranform.inventories(data)
    },
    getInventoriesQuery,
    {
      onSuccess: (data) => {
        setInventoriesData(data)
      },
      onError: (error) => {
        notification(notificationErrorProp(error))
      },
      globalLoading: true,
    },
  )

  const handleSearchChange = (value: any) => {
    setSearch(value.target.value)
  }

  const handleFavoriteChange = () => {
    setFavorite((prevFavorite) =>
      prevFavorite === 'DEFAULT' ? 'LIKE' : 'DEFAULT',
    )
  }

  const handleClearChange = () => {
    setSearch('')
    setType([])
    setBrand([])
    setFavorite('DEFAULT')
  }

  useEffect(() => {
    getInventoriesTrigger({
      params: {
        limit: limit,
        pageNo: page,
        search: search,
        favorite: favorite,
        type: type.map((e: any) => {
          return e.id
        }),
        brand: brand.map((e: any) => {
          return e.id
        }),
      },
    })
  }, [
    triggerBrand,
    triggerType,
    triggerFavorite,
    triggerGetInventoryNames,
    getInventoriesTrigger,
    limit,
    page,
    search,
    favorite,
    type,
    brand,
  ])

  useEffect(() => {
    if (inventoriesData?.inventories?.length === 0) {
      setPage(inventoriesData?.totalPage === 0 ? 1 : inventoriesData?.totalPage)
    }
  }, [inventoriesData?.inventories, inventoriesData?.totalPage])

  const onRow = (rows, reason) => {
    console.log({ rows, reason })
  }

  const onPaginationModelChange = (model, _) => {
    setLimit(model.pageSize)
  }

  return {
    inventoryData: { getInventories: inventoriesData },
    inventoryLoading: getInventoriesLoading,
    inventoryError: getInventoriesError,
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
    setFavorite,
    favorite,
    handleFavoriteChange,
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

const useMutationFavorite = ({ notification, setTriggerFavorite }) => {
  const { trigger: favoriteInventory } = useMutationData<
    MutateKey.inventory,
    FavoriteInventoryData,
    FavoriteInventoryVariables
  >(MutateKey.inventory, null, favoriteInventoryMutation, {
    onSuccess: () => {
      notification(notificationSuccessFavoriteProp)
      setTriggerFavorite((prev) => !prev)
    },
    onError: (error) => {
      notification(notificationErrorProp(error))
    },
    globalLoading: true,
  })

  const favoriteInventoryHandle = useCallback(
    (id: string) => {
      favoriteInventory({
        id: id,
      })
    },
    [favoriteInventory],
  )

  // useEffect(() => {
  //   if (favoriteInventoryData?.favoriteInventory?.id) {
  //     notification(notificationSuccessFavoriteProp)
  //     setTriggerFavorite((prev) => !prev)
  //   }
  // }, [
  //   favoriteInventoryData?.favoriteInventory?.id,
  //   notification,
  //   setTriggerFavorite,
  // ])

  // useEffect(() => {
  //   if (error) {
  //     notification(notificationErrorProp(''))
  //   }
  // }, [error, notification])

  return {
    favoriteInventoryHandle,
  }
}

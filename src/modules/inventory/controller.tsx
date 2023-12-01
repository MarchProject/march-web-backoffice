import { useNotificationContext } from '@/context/notification'
import { useLazyQueryData } from '@/core/adapter/hook/useLazyData'
import { QueryKey } from '@/core/adapter/interface'
import {
  GetInventoriesData,
  GetInventoriesVariables,
  getInventoriesQuery,
  IFavoriteStatus,
  InventoryNames,
  getInventoryNamesQuery,
} from '@/core/gql/inventory/inventory'
import {
  GetInventoryAllDeletedData,
  getInventoryAllDeletedQuery,
} from '@/core/gql/inventory/inventoryTrash'
import {
  BrandType,
  InventoriesResponse,
  InventoryNamesClass,
  InventoryTrash,
  InventoryType,
} from '@/core/model/inventory'
import { notificationFetchInventoryErrorProp } from '@/core/notification'
import { AutocompleteChangeReason } from '@mui/material'
import { SyntheticEvent, useCallback, useEffect, useState } from 'react'
import { useQueryInventoryBrand } from './fetcher/useQueryInventoryBrand'
import { useQueryInventoryType } from './fetcher/useQueryInventoryType'
import { useMutationFavorite } from './fetcher/useMutationFavorite'

export const useInventoryController = () => {
  const { notification } = useNotificationContext()
  const [triggerType, setTriggerType] = useState(true)
  const [triggerBrand, setTriggerBrand] = useState(true)
  const [triggerFavorite, setTriggerFavorite] = useState(true)
  const [triggerGetInventoryNames, setTriggerGetInventoryNames] = useState(true)
  const [triggerInventory, setTriggerInventory] = useState(true)
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
    triggerInventory,
  })

  const {
    inventoriesTypeData,
    inventoriesTypeDataError,
    inventoriesTypeLoading,
    handleSearchInventoryType,
  } = useQueryInventoryType({ trigger: triggerType })
  const { inventoryNamesData, inventoryNamesError, inventoryNamesLoading } =
    useGetNameItems({ notification, triggerGetInventoryNames })
  const { favoriteInventoryHandle } = useMutationFavorite({
    notification,
    setTriggerFavorite,
  })
  const { setTriggerTrash, trashData } = useQueryTrash({ notification })
  const {
    inventoriesBrandData,
    inventoriesBrandDataError,
    inventoriesBrandLoading,
    handleSearchInventoryBrand,
  } = useQueryInventoryBrand({ trigger: triggerBrand })
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
      setTriggerInventory,
      triggerInventory,
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
    trash: {
      setTriggerTrash,
      trashData,
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
      onError: () => {
        notification(notificationFetchInventoryErrorProp('Names Error'))
      },
      globalLoading: true,
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

const useQueryInventory = ({
  notification,
  triggerBrand,
  triggerType,
  triggerFavorite,
  triggerGetInventoryNames,
  triggerInventory,
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
      onError: () => {
        notification(notificationFetchInventoryErrorProp('Inventories Error'))
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
    triggerInventory,
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

const useQueryTrash = ({ notification }) => {
  const [trashData, setTrashData] = useState<InventoryTrash>(null)
  const [trigger, setTrigger] = useState(true)
  const { trigger: getInventoryAllDeleted } = useLazyQueryData<
    QueryKey.inventory,
    GetInventoryAllDeletedData,
    any
  >(
    QueryKey.inventory,
    (tranform, data) => {
      return tranform.inventoryTrash(data)
    },
    getInventoryAllDeletedQuery,
    {
      onSuccess: (data) => {
        setTrashData(data)
      },
      onError: () => {
        notification(notificationFetchInventoryErrorProp('Trash Error'))
      },
      globalLoading: true,
    },
  )

  const getInventoryTrashHandle = useCallback(() => {
    getInventoryAllDeleted()
  }, [getInventoryAllDeleted])

  useEffect(() => {
    getInventoryTrashHandle()
  }, [getInventoryTrashHandle, trigger])

  return {
    trashData,
    setTriggerTrash: setTrigger,
  }
}

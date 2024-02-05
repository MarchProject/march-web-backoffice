import { useNotificationContext } from '@/context/notification'
import { BrandType, InventoryType } from '@/core/model/inventory'
import { AutocompleteChangeReason } from '@mui/material'
import { SyntheticEvent, useCallback, useState } from 'react'
import { useQueryInventoryBrand } from './fetcher/useQueryInventoryBrand'
import { useQueryInventoryType } from './fetcher/useQueryInventoryType'
import { useMutationFavorite } from './fetcher/useMutationFavorite'
import { useGetInventoryNames } from './fetcher/useGetInventoryNames'
import { useQueryInventories } from './fetcher/useQueryInventories'
import { useQueryTrashHandler } from './fetcher/useQueryTrash'

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
  } = useQueryInventories({
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
    useGetInventoryNames({ triggerGetInventoryNames })
  const { favoriteInventoryHandle } = useMutationFavorite({
    notification,
    setTriggerFavorite,
  })
  const { setTriggerTrash, trashData } = useQueryTrashHandler({ notification })
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

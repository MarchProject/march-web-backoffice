import { useNotificationContext } from '@/context/notification'
import { InventoryBrand, InventoryType } from '@/core/model/inventory'
import { AutocompleteChangeReason } from '@mui/material'
import { SyntheticEvent, useCallback, useState } from 'react'
import { useQueryInventoryBrand } from './fetcher/useQueryInventoryBrand'
import { useQueryInventoryType } from './fetcher/useQueryInventoryType'
import { useMutationFavorite } from './fetcher/useMutationFavorite'
import { useGetInventoryNames } from './fetcher/useGetInventoryNames'
import { useQueryInventories } from './fetcher/useQueryInventories'
import { useQueryTrashHandler } from './fetcher/useQueryTrash'
import { useQueryInventoryBranch } from './fetcher/useQueryInventoryBranch'

export const useInventoryController = () => {
  const { notification } = useNotificationContext()
  const [triggerType, setTriggerType] = useState(true)
  const [triggerBrand, setTriggerBrand] = useState(true)
  const [triggerBranch, setTriggerBranch] = useState(true)
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
    setBranch,
    setFavorite,
    favorite,
    handleFavoriteChange,
    handleClearChange,
    inventoryTypeValue,
    inventoryBrandValue,
    inventoryBranchValue,
  } = useQueryInventories({
    notification,
    triggerType,
    triggerBrand,
    triggerBranch,
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
  const {
    inventoriesBranchData,
    inventoriesBranchDataError,
    inventoriesBranchLoading,
    handleSearchInventoryBranch,
  } = useQueryInventoryBranch({ trigger: triggerBranch })
  const { handleTypeChange, handleBrandChange, handleBranchChange } =
    useHandleInventory({
      setType,
      setBrand,
      setBranch,
    })
  return {
    globalState: {},
    setTriggerType,
    setTriggerBrand,
    setTriggerBranch,
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
      setBranch,
      favorite,
      setFavorite,
      handleFavoriteChange,
      inventoryTypeValue,
      inventoryBrandValue,
      inventoryBranchValue,
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
    inventoriesBranch: {
      inventoriesBranchData,
      inventoriesBranchLoading,
      inventoriesBranchDataError,
      handleSearchInventoryBranch,
    },
    handleInventory: {
      handleTypeChange,
      handleBrandChange,
      handleBranchChange,
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

const useHandleInventory = ({ setType, setBrand, setBranch }) => {
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
      value: InventoryBrand[],
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

  const handleBranchChange = useCallback(
    (
      _: SyntheticEvent<Element, Event>,
      value: InventoryBrand[],
      reason: AutocompleteChangeReason,
    ) => {
      if (reason === 'selectOption' || reason === 'removeOption') {
        setBranch(value)
      } else {
        setBranch([])
      }
    },
    [setBranch],
  )

  return {
    handleTypeChange,
    handleBrandChange,
    handleBranchChange,
  }
}

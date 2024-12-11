import { useNotificationContext } from '@/context/notification'
import { useMutationFavorite } from './apiHandler/useMutationFavorite'
import { useFilterHandler } from './useFilterHandler'
import { useColumnHandler } from './useColumnHandler'
import { useMenuHandler } from './useMenuHandler'
import { useQueryHandler } from './useQueryHandler'
import { useCallback, useState } from 'react'

export const useControllerInventory = () => {
  const { notification, errorNotification } = useNotificationContext()
  const {
    inventory: {
      inventoryData,
      inventoryLoading,
      // inventoryPage,
      // inventoryLimit,
      // inventorySearch,
      onPaginationModelChange,
      handleSearchChange,
      setType,
      setPage,
      setBrand,
      setBranch,
      // setFavorite,
      favorite,
      handleFavoriteChange,
      handleClearChange,
      // inventoryTypeValue,
      inventoryBrandValue,
      inventoryBranchValue,
      setTriggerInventories,
    },
    branch: { inventoriesBranchData },
    brand: { inventoriesBrandData },
    type: { inventoriesTypeData },
  } = useQueryHandler({ notification })

  const { onChange: onChangeFilter } = useFilterHandler({
    setType,
    setBrand,
    setBranch,
  })

  const { favoriteInventoryLoading, favoriteInventoryHandler } =
    useMutationFavorite({
      errorNotification,
      notification,
      setTrigger: setTriggerInventories,
    })

  const { userColumn } = useColumnHandler({
    favoriteInventoryHandler,
  })

  const onChangePagination = (page: number, pageSize: number) => {
    setPage(page)
    onPaginationModelChange(pageSize)
  }

  const filterModal = useFilterModalHandler()
  const { handleButtonClick, menuProps } = useMenuHandler({
    handleOpen: filterModal.handleOpen,
  })

  return {
    table: {
      handleSearchChange,
      userColumn,
      data: {
        inventory: {
          data: inventoryData?.getInventories?.inventories,
          loading: inventoryLoading || favoriteInventoryLoading,
          totalRow: inventoryData?.getInventories?.totalRow,
          onChangePagination,
        },
        branch: {
          inventoryBranchValue,
          inventoryBrandValue,
        },
      },
    },
    menuProps: {
      handleButtonClick,
      menuProps,
      data: {
        inventoriesBranchData,
        inventoriesBrandData,
        inventoriesTypeData,
      },
      filter: {
        onChange: onChangeFilter,
        filterModal,
        favorite,
        handleFavoriteChange,
        handleClearChange,
      },
    },
  }
}

const useFilterModalHandler = () => {
  const [open, setOpen] = useState(false)

  const handleOpen = useCallback(() => {
    setOpen(true)
  }, [])

  const handleOK = useCallback(() => {
    setOpen(false)
  }, [])

  const handleCancel = useCallback(() => {
    setOpen(false)
  }, [])

  return {
    open,
    handleOpen,
    handleOK,
    handleCancel,
  }
}

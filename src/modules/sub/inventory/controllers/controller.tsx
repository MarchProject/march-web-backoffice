import { useNotificationContext } from '@/context/notification'
import { useMutationFavorite } from './apiHandler/useMutationFavorite'
import { useFilterHandler } from './useFilterHandler'
import { useColumnHandler } from './useColumnHandler'
import { useMenuHandler } from './useMenuHandler'
import { useQueryHandler } from './useQueryHandler'
import { useCallback } from 'react'
import { useRecoveryTrashHandler } from './apiHandler/useRecoveryTrash'
import { useModalHandler } from './useModalHandler'
import { useUpsertBranchHandler } from './apiHandler/useUpsertBranch'
import { useDeleteBranchInventoryHandler } from './apiHandler/useDeleteBranch'
import { useDeleteBrandInventoryHandler } from './apiHandler/useDeleteBrand'
import { useDeleteTypeInventoryHandler } from './apiHandler/useDeleteType'
import { useUpsertBrandHandler } from './apiHandler/useUpsertBrand'
import { useUpsertTypeHandler } from './apiHandler/useUpsertType'

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
      inventoryRefetch,
    },
    branch: {
      inventoriesBranchData,
      inventoriesBranchRefetch,
      inventoriesBranchLoading,
    },
    brand: {
      inventoriesBrandData,
      inventoriesBrandRefetch,
      inventoriesBrandLoading,
    },
    type: {
      inventoriesTypeData,
      inventoriesTypeRefetch,
      inventoriesTypeLoading,
    },
    trash: { trashData, trashRefetch },
  } = useQueryHandler({ notification })

  const { onChange: onChangeFilter } = useFilterHandler({
    setType,
    setBrand,
    setBranch,
  })

  const triggerAll = useCallback(() => {
    inventoryRefetch()
    inventoriesBranchRefetch()
    inventoriesBrandRefetch()
    inventoriesTypeRefetch()
    trashRefetch()
  }, [
    inventoriesBranchRefetch,
    inventoriesBrandRefetch,
    inventoriesTypeRefetch,
    inventoryRefetch,
    trashRefetch,
  ])

  const triggerUpsertBranch = useCallback(() => {
    inventoryRefetch()
    inventoriesBranchRefetch()
  }, [inventoriesBranchRefetch, inventoryRefetch])

  const triggerUpsertBrand = useCallback(() => {
    inventoryRefetch()
    inventoriesBrandRefetch()
  }, [inventoriesBrandRefetch, inventoryRefetch])

  const triggerUpsertType = useCallback(() => {
    inventoryRefetch()
    inventoriesTypeRefetch()
  }, [inventoriesTypeRefetch, inventoryRefetch])

  const triggerDeleteBranch = useCallback(() => {
    inventoriesBranchRefetch()
    trashRefetch()
  }, [inventoriesBranchRefetch, trashRefetch])

  const triggerDeleteBrand = useCallback(() => {
    inventoriesBrandRefetch()
    trashRefetch()
  }, [inventoriesBrandRefetch, trashRefetch])

  const triggerDeleteType = useCallback(() => {
    inventoriesTypeRefetch()
    trashRefetch()
  }, [inventoriesTypeRefetch, trashRefetch])

  const { updateBranchHandle, upsertInventoryBranchLoading } =
    useUpsertBranchHandler({
      triggerUpsertBranch,
      notification,
    })

  const { updateBrandHandle, upsertInventoryBrandLoading } =
    useUpsertBrandHandler({
      triggerUpsertBrand,
      notification,
    })

  const { updateTypeHandle, upsertInventoryTypeLoading } = useUpsertTypeHandler(
    {
      triggerUpsertType,
      notification,
    },
  )

  const { deleteBranchHandle, deleteInventoryBranchLoading } =
    useDeleteBranchInventoryHandler({
      triggerDeleteBranch,
      notification,
    })

  const { deleteBrandHandle, deleteInventoryBrandLoading } =
    useDeleteBrandInventoryHandler({
      triggerDeleteBrand,
      notification,
    })

  const { deleteTypeHandle, deleteInventoryTypeLoading } =
    useDeleteTypeInventoryHandler({
      triggerDeleteType,
      notification,
    })

  const { recoveryHardDeletedHandler, recoveryHardDeletedLoading } =
    useRecoveryTrashHandler({
      notification,
      triggerAll,
    })

  const { favoriteInventoryLoading, favoriteInventoryHandler } =
    useMutationFavorite({
      errorNotification,
      notification,
      inventoryRefetch,
    })

  const { userColumn, unUsedColumn, updateTable, mainTableColumns } =
    useColumnHandler({
      favoriteInventoryHandler,
    })

  const onChangePagination = (page: number, pageSize: number) => {
    setPage(page)
    onPaginationModelChange(pageSize)
  }

  const filterModal = useModalHandler()
  const transferModal = useModalHandler()
  const trashModal = useModalHandler()
  const branchModal = useModalHandler()
  const brandModal = useModalHandler()
  const typeModal = useModalHandler()
  const { menuProps } = useMenuHandler({
    handleOpenTransfer: transferModal.handleOpen,
    handleOpenTrash: trashModal.handleOpen,
    handleOpenBranch: branchModal.handleOpen,
    handleOpenBrand: brandModal.handleOpen,
    handleOpenType: typeModal.handleOpen,
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
      menuProps,
      data: {
        inventoriesBranchData,
        inventoriesBrandData,
        inventoriesTypeData,
      },
      loading: {
        inventoriesBranchLoading,
        inventoriesBrandLoading,
        inventoriesTypeLoading,
      },
      filter: {
        onChange: onChangeFilter,
        filterModal,
        favorite,
        handleFavoriteChange,
        handleClearChange,
      },
      transfer: {
        transferModal,
        userColumn,
        unUsedColumn,
        updateTable,
        mainTableColumns,
      },
      trash: {
        trashModal,
        trashData,
        recoveryHardDeletedHandler,
        recoveryHardDeletedLoading,
      },
      branch: {
        branchModal,
        upsertInventoryBranchLoading,
        updateBranchHandle,
        deleteBranchHandle,
        deleteInventoryBranchLoading,
      },
      brand: {
        brandModal,
        upsertInventoryBrandLoading,
        updateBrandHandle,
        deleteBrandHandle,
        deleteInventoryBrandLoading,
      },
      type: {
        typeModal,
        upsertInventoryTypeLoading,
        updateTypeHandle,
        deleteTypeHandle,
        deleteInventoryTypeLoading,
      },
    },
  }
}

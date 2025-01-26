import { useNotificationContext } from '@/context/notification'
// import { useQueryInventoryType } from '../fetcher/useQueryInventoryType'
// import { useQueryInventoryBrand } from '../fetcher/useQueryInventoryBrand'
import { useCallback } from 'react'
// import {
//   useHandleDialogBranch,
//   useHandleDialogBrand,
//   useHandleDialogType,
// } from '../dialog/DialogEditor/controller'
// import { useUpsertBrandHandler } from '../fetcher/useUpsertBrand'
// import { useUpsertTypeHandle } from '../fetcher/useUpsertType'
import { useLoadingHandler } from '@/core/utils/hook/useLoadingHook'
// import { useQueryInventoryBranch } from '../fetcher/useQueryInventoryBranch'
// import { useUpsertBranchHandler } from '../fetcher/useUpsertBranch'
import { useTranslation } from 'react-i18next'
import { useFormHandler } from './useFormHandler'
import { useQueryHandler } from './useQueryHandler'
import { useSubmitForm } from './useSubmitForm'
import { useQueryInventoryType } from '../../../controllers/apiHandler/useQueryInventoryType'
import { useQueryInventoryBrand } from '../../../controllers/apiHandler/useQueryInventoryBrand'
import { useQueryInventoryBranch } from '../../../controllers/apiHandler/useQueryInventoryBranch'
import { useModalHandler } from '../../../controllers/useModalHandler'
import { useUpsertBranchHandler } from '../../../controllers/apiHandler/useUpsertBranch'
import { useUpsertBrandHandler } from '../../../controllers/apiHandler/useUpsertBrand'
import { useDeleteBranchInventoryHandler } from '../../../controllers/apiHandler/useDeleteBranch'
import { useDeleteBrandInventoryHandler } from '../../../controllers/apiHandler/useDeleteBrand'
import { useDeleteTypeInventoryHandler } from '../../../controllers/apiHandler/useDeleteType'
import { useUpsertTypeHandler } from '../../../controllers/apiHandler/useUpsertType'

export const useEditorInventoryController = ({ idInventory }) => {
  const { notification } = useNotificationContext()
  const { t: trans }: any = useTranslation()

  const branchModal = useModalHandler()
  const brandModal = useModalHandler()
  const typeModal = useModalHandler()

  const {
    register,
    errors,
    onSubmit,
    control,
    reset,
    setError,
    clearErrors,
    setValue,
  } = useFormHandler()

  const {
    inventoriesBranchData,
    inventoriesBranchDataError,
    inventoriesBranchLoading,
    handleSearchInventoryBranch,
    inventoriesBranchRefetch,
  } = useQueryInventoryBranch({
    trigger: true,
  })
  const {
    inventoriesBrandData,
    inventoriesBrandDataError,
    inventoriesBrandLoading,
    handleSearchInventoryBrand,
    inventoriesBrandRefetch,
  } = useQueryInventoryBrand({
    trigger: true,
  })
  const {
    inventoriesTypeLoading,
    inventoriesTypeData,
    inventoriesTypeDataError,
    handleSearchInventoryType,
    inventoriesTypeRefetch,
  } = useQueryInventoryType({
    trigger: true,
  })

  const { mainLoading, upsertInventory, deleteInventory } = useQueryHandler({
    getInventoryProps: { reset, idInventory },
    upsertInventoryProps: {
      reset,
      idInventory,
    },
    deleteInventoryProps: {
      id: idInventory,
    },
  })

  const triggerUpsertBranch = useCallback(() => {
    inventoriesBranchRefetch()
  }, [inventoriesBranchRefetch])

  const triggerUpsertBrand = useCallback(() => {
    inventoriesBrandRefetch()
  }, [inventoriesBrandRefetch])

  const triggerUpsertType = useCallback(() => {
    inventoriesTypeRefetch()
  }, [inventoriesTypeRefetch])

  const triggerDeleteBranch = useCallback(() => {
    inventoriesBranchRefetch()
  }, [inventoriesBranchRefetch])

  const triggerDeleteBrand = useCallback(() => {
    inventoriesBrandRefetch()
  }, [inventoriesBrandRefetch])

  const triggerDeleteType = useCallback(() => {
    inventoriesTypeRefetch()
  }, [inventoriesTypeRefetch])

  useLoadingHandler(
    mainLoading ||
      inventoriesBrandLoading ||
      inventoriesTypeLoading ||
      inventoriesBranchLoading,
  )

  const { onError, onSubmit: onSubmitCallback } = useSubmitForm({
    notification,
    idInventory,
    upsertInventory: upsertInventory.upsertInventory,
    trans,
  })

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

  // const {
  //   upsertInventoryType,
  //   upsertInventoryTypeData,
  //   upsertInventoryTypeLoading,
  //   updateTypeHandle,
  // } = useUpsertTypeHandle({
  //   triggerType: triggerTypeCB,
  // })

  // const {
  //   upsertInventoryBrand,
  //   updateBrandHandle,
  //   upsertInventoryBrandLoading,
  //   upsertInventoryBrandData,
  // } = useUpsertBrandHandler({
  //   triggerBrand: triggerBrandCB,
  // })

  // const {
  //   upsertInventoryBranch,
  //   updateBranchHandle,
  //   upsertInventoryBranchLoading,
  //   upsertInventoryBranchData,
  // } = useUpsertBranchHandler({
  //   triggerBranch: triggerBranchCB,
  // })

  return {
    formHandler: {
      register,
      errors,
      setError,
      onSubmit: onSubmit(onSubmitCallback, onError),
      control,
      clearErrors,
      setValue,
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
      inventoriesBranchDataError,
      inventoriesBranchLoading,
      handleSearchInventoryBranch,
    },
    inventory: {
      deleteInventoryHandle: deleteInventory.deleteInventoryHandle,
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
    // upsertTypeHandle: {
    //   upsertInventoryType,
    //   updateTypeHandle,
    //   upsertInventoryTypeData,
    //   upsertInventoryTypeLoading,
    // },
    // upsertBrandHandle: {
    //   upsertInventoryBrand,
    //   updateBrandHandle,
    //   upsertInventoryBrandLoading,
    //   upsertInventoryBrandData,
    // },
    // upsertBranchHandle: {
    //   upsertInventoryBranch,
    //   updateBranchHandle,
    //   upsertInventoryBranchLoading,
    //   upsertInventoryBranchData,
    // },
    // dialogType: { openDialogType, handleCloseType, handleOpenType },
    // dialogBrand: {
    //   openDialogBrand,
    //   handleCloseBrand,
    //   handleOpenBrand,
    // },
    // dialogBranch: {
    //   openDialogBranch,
    //   handleCloseBranch,
    //   handleOpenBranch,
    // },
  }
}

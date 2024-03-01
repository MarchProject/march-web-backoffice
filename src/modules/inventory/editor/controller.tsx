import { useNotificationContext } from '@/context/notification'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { IInventoryForm, IUseQueryHandlerProps } from './interface'
import { schema } from './schema'
import { useQueryInventoryType } from '../fetcher/useQueryInventoryType'
import { useQueryInventoryBrand } from '../fetcher/useQueryInventoryBrand'
import { useCallback, useState } from 'react'
import { tranFromUpsertInventoryDto } from '../dto/upsert.dto'
import {
  notificationEditorErrorProp,
  notificationEditorValidErrorProp,
} from '@/core/notification'
import {
  useHandleDialogBranch,
  useHandleDialogBrand,
  useHandleDialogType,
} from '../dialog/DialogEditor/controller'
import { useUpsertBrandHandler } from '../fetcher/useUpsertBrand'
import { useUpsertTypeHandle } from '../fetcher/useUpsertType'
import { useQueryInventory } from '../fetcher/useQueryInventory'
import { useUpsertInventory } from '../fetcher/useUpsertInventory'
import { useDeleteInventory } from '../fetcher/useDeleteInventory'
import { useLoadingHandler } from '@/core/utils/hook/useLoadingHook'
import { useQueryInventoryBranch } from '../fetcher/useQueryInventoryBranch'
import { useUpsertBranchHandler } from '../fetcher/useUpsertBranch'

export const useEditorInventoryController = ({ idInventory }) => {
  const { notification } = useNotificationContext()
  const [triggerType, setTriggerType] = useState(true)
  const [triggerBrand, setTriggerBrand] = useState(true)
  const [triggerBranch, setTriggerBranch] = useState(true)

  const triggerTypeCB = useCallback(() => {
    setTriggerType((e: boolean) => !e)
  }, [setTriggerType])

  const triggerBrandCB = useCallback(() => {
    setTriggerBrand((e: boolean) => !e)
  }, [setTriggerBrand])

  const triggerBranchCB = useCallback(() => {
    setTriggerBranch((e: boolean) => !e)
  }, [setTriggerBranch])

  const { openDialogType, handleCloseType, handleOpenType } =
    useHandleDialogType()

  const { openDialogBrand, handleCloseBrand, handleOpenBrand } =
    useHandleDialogBrand()

  const { openDialogBranch, handleCloseBranch, handleOpenBranch } =
    useHandleDialogBranch()

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
    inventoriesTypeData,
    inventoriesTypeDataError,
    inventoriesTypeLoading,
    handleSearchInventoryType,
  } = useQueryInventoryType({ trigger: triggerType })

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

  const { inventory, mainLoading, upsertInventory, deleteInventory } =
    useQueryHandler({
      getInventoryProps: { reset, idInventory },
      upsertInventoryProps: {
        reset,
        idInventory,
      },
      deleteInventoryProps: {
        id: idInventory,
      },
    })

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
  })

  const {
    upsertInventoryType,
    upsertInventoryTypeData,
    upsertInventoryTypeLoading,
    updateTypeHandle,
  } = useUpsertTypeHandle({
    triggerType: triggerTypeCB,
  })

  const {
    upsertInventoryBrand,
    updateBrandHandle,
    upsertInventoryBrandLoading,
    upsertInventoryBrandData,
  } = useUpsertBrandHandler({
    triggerBrand: triggerBrandCB,
  })

  const {
    upsertInventoryBranch,
    updateBranchHandle,
    upsertInventoryBranchLoading,
    upsertInventoryBranchData,
  } = useUpsertBranchHandler({
    triggerBranch: triggerBranchCB,
  })

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
      inventory,
      deleteInventoryHandle: deleteInventory.deleteInventoryHandle,
    },
    upsertTypeHandle: {
      upsertInventoryType,
      updateTypeHandle,
      upsertInventoryTypeData,
      upsertInventoryTypeLoading,
    },
    upsertBrandHandle: {
      upsertInventoryBrand,
      updateBrandHandle,
      upsertInventoryBrandLoading,
      upsertInventoryBrandData,
    },
    upsertBranchHandle: {
      upsertInventoryBranch,
      updateBranchHandle,
      upsertInventoryBranchLoading,
      upsertInventoryBranchData,
    },
    setTriggerType: setTriggerType,
    setTriggerBrand: setTriggerBrand,
    setTriggerBranch: setTriggerBranch,
    dialogType: { openDialogType, handleCloseType, handleOpenType },
    dialogBrand: {
      openDialogBrand,
      handleCloseBrand,
      handleOpenBrand,
    },
    dialogBranch: {
      openDialogBranch,
      handleCloseBranch,
      handleOpenBranch,
    },
  }
}

const useFormHandler = () => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    getValues,
    setError,
    clearErrors,
    setValue,
    formState: { errors },
    reset,
  } = useForm<IInventoryForm>({
    defaultValues: {
      name: '',
      description: '',
      expiryDate: null,
      type: null,
      brand: null,
      branch: null,
      quantity: 0,
      sku: '',
      serialNumber: '',
      reorder: 0,
      weight: '',
      width: '',
      length: '',
      height: '',
      price: 0,
      memberPrice: 0,
    },
    resolver: yupResolver(schema),
    reValidateMode: 'onChange',
    mode: 'all',
  })

  return {
    register,
    onSubmit: handleSubmit,
    errors,
    control,
    reset,
    watch,
    getValues,
    setError,
    clearErrors,
    setValue,
  } as any
}

const useSubmitForm = ({ notification, idInventory, upsertInventory }) => {
  const onSubmit: SubmitHandler<IInventoryForm> = (data) => {
    try {
      const InventoryInput = tranFromUpsertInventoryDto(data, idInventory)
      upsertInventory({
        variables: {
          ...InventoryInput,
        },
      })
    } catch (error) {
      notification(notificationEditorErrorProp('Server', error?.message))
    }
  }
  const onError = () => {
    notification(notificationEditorValidErrorProp)
  }

  return {
    onSubmit,
    onError,
  }
}

const useQueryHandler = ({
  getInventoryProps,
  upsertInventoryProps,
  deleteInventoryProps,
}: IUseQueryHandlerProps) => {
  const { inventory, inventoryLoading } = useQueryInventory({
    ...getInventoryProps,
  })
  const { upsertInventory, upsertInventoryLoading } = useUpsertInventory({
    ...upsertInventoryProps,
  })
  const { deleteInventoryHandle, deleteInventoryLoading } = useDeleteInventory({
    ...deleteInventoryProps,
  })
  return {
    inventory: { inventory },
    upsertInventory: {
      upsertInventory,
    },
    deleteInventory: {
      deleteInventoryHandle,
    },
    mainLoading:
      inventoryLoading || upsertInventoryLoading || deleteInventoryLoading,
  }
}

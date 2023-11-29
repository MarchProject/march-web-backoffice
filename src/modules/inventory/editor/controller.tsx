import { useNotificationContext } from '@/context/notification'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { IInventoryForm, IUseQueryHandlerProps } from './interface'
import { schema } from './schema'
import { useQueryInventoryBrand, useQueryInventoryType } from '../controller'
import { useCallback, useState } from 'react'
import {
  DeleteInventoryData,
  DeleteTypeDataVariables,
  deleteInventoryMutation,
} from '@/core/gql/inventory/inventory'
import { tranFromUpsertInventoryDto } from '../dto/upsert.dto'
import router from 'next/router'
import { inventoryRoute } from '@/router/inventory'
import { useMutationData } from '@/core/adapter/hook/useMutationData'
import { MutateKey } from '@/core/adapter/interface'
import {
  notificationEditorDeleteErrorProp,
  notificationEditorErrorProp,
  notificationEditorSuccessProp,
  notificationEditorValidErrorProp,
} from '@/core/notification'
import {
  useHandleDialogBrand,
  useHandleDialogType,
  useUpdateBransHandle,
  useUpdateTypeHandle,
} from '../dialog/DialogEditor/controller'
import { useQueryInventory } from '../fetcher/useQueryInventory'
import { useUpsertInventory } from '../fetcher/useUpsertInventory'

export const useEditorInventoryController = ({ idInventory }) => {
  const { notification } = useNotificationContext()
  const [triggerType, setTriggerType] = useState(true)
  const [triggerBrand, setTriggerBrand] = useState(true)

  const triggerTypeCB = useCallback(() => {
    setTriggerType((e: boolean) => !e)
  }, [setTriggerType])

  const triggerBrandCB = useCallback(() => {
    setTriggerBrand((e: boolean) => !e)
  }, [setTriggerBrand])

  const { openDialogType, handleCloseType, handleOpenType } =
    useHandleDialogType()

  const { openDialogBrand, handleCloseBrand, handleOpenBrand } =
    useHandleDialogBrand()
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

  const { inventory, mainLoading, upsertInventory } = useQueryHandler({
    getInventoryProps: { reset, idInventory },
    upsertInventoryProps: {
      reset,
      idInventory,
    },
  })
  const { onError, onSubmit: onSubmitCallback } = useSubmitForm({
    notification,
    idInventory,
    upsertInventory: upsertInventory.upsertInventory,
  })
  const {
    inventoriesTypeData,
    inventoriesTypeDataError,
    inventoriesTypeLoading,
    handleSearchInventoryType,
  } = useQueryInventoryType(triggerType, notification)

  const {
    inventoriesBrandData,
    inventoriesBrandDataError,
    inventoriesBrandLoading,
    handleSearchInventoryBrand,
  } = useQueryInventoryBrand(triggerBrand, notification)

  const { deleteInventoryHandle } = useDeleteInventory({
    notification,
    id: idInventory,
  })

  const {
    upsertInventoryType,
    upsertInventoryTypeData,
    upsertInventoryTypeLoading,
    updateTypeHandle,
  } = useUpdateTypeHandle({
    notification,
    triggerType: triggerTypeCB,
  })

  const {
    upsertBrandType,
    updateBrandHandle,
    upsertInventoryBrandLoading,
    upsertInventoryBrandData,
  } = useUpdateBransHandle({
    notification,
    triggerBrand: triggerBrandCB,
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
    inventory: {
      inventory,
      deleteInventoryHandle,
    },
    upsertTypeHandle: {
      upsertInventoryType,
      updateTypeHandle,
      upsertInventoryTypeData,
      upsertInventoryTypeLoading,
    },
    upsertBrandHandle: {
      upsertBrandType,
      updateBrandHandle,
      upsertInventoryBrandLoading,
      upsertInventoryBrandData,
    },
    setTriggerType: setTriggerType,
    setTriggerBrand: setTriggerBrand,
    dialogType: { openDialogType, handleCloseType, handleOpenType },
    dialogBrand: {
      openDialogBrand,
      handleCloseBrand,
      handleOpenBrand,
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
      quantity: 0,
      sku: '',
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
  }
}

const useDeleteInventory = ({ notification, id }) => {
  const { trigger: deleteInventory } = useMutationData<
    MutateKey.inventory,
    DeleteInventoryData,
    DeleteTypeDataVariables
  >(MutateKey.inventory, null, deleteInventoryMutation, {
    onSuccess: () => {
      notification(notificationEditorSuccessProp('Delete'))
      router.push({
        pathname: inventoryRoute.path,
      })
    },
    onError: (error) => {
      notification(notificationEditorDeleteErrorProp(error))
    },
    globalLoading: true,
  })

  const deleteInventoryHandle = useCallback(() => {
    deleteInventory({
      id: id,
    })
  }, [deleteInventory, id])

  return {
    deleteInventoryHandle,
  }
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
}: IUseQueryHandlerProps) => {
  const { inventory, inventoryLoading } = useQueryInventory({
    ...getInventoryProps,
  })
  const { upsertInventory, upsertInventoryLoading } = useUpsertInventory({
    ...upsertInventoryProps,
  })

  return {
    inventory: { inventory },
    upsertInventory: {
      upsertInventory,
    },
    mainLoading: inventoryLoading || upsertInventoryLoading,
  }
}

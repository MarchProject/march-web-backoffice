import { EnumSeverity, useNotificationContext } from '@/context/notification'
import { SubmitHandler, UseFormReset, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { IInventoryForm } from './interface'
import { schema } from './schema'
import { useQueryInventoryBrand, useQueryInventoryType } from '../controller'
import { useCallback, useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import {
  DeleteInventoryData,
  DeleteTypeDataVariables,
  UpsertInventoryTypeData,
  UpsertInventoryTypeVariables,
  deleteInventoryMutation,
  getInventoryQuery,
  upsertInventoryMutation,
} from '@/core/gql/inventory/inventory'
import { tranFromUpsertInventoryDto } from '../dto/upsert.dto'
import router from 'next/router'
import { inventoryRoute } from '@/router/inventory'
import { plainToInstance } from 'class-transformer'
import { Inventory } from '@/core/model/inventory'
import { transfromInventory } from '../dto/inventory.dto'
import { useMutationData } from '@/core/adapter/hook/useMutationData'
import { MutateKey } from '@/core/adapter/interface'

const notificationSuccessProp = (message) => {
  return {
    severity: EnumSeverity.success,
    title: 'Inventory',
    message: `${message} Success`,
  }
}
const notificationErrorProp = (message: string) => {
  return {
    severity: EnumSeverity.error,
    title: 'Inventory',
    message: `Create ${message}`,
  }
}
const notificationValidErrorProp = {
  severity: EnumSeverity.error,
  title: 'Inventory',
  message: 'Validate Fail',
}

export const useEditorInventoryController = ({ idInventory }) => {
  const { notification } = useNotificationContext()
  const [triggerType, setTriggerType] = useState(true)
  const [triggerBrand, setTriggerBrand] = useState(true)
  const {
    register,
    errors,
    onSubmit,
    control,
    reset,
    setError,
    clearErrors,
    setValue,
  }: any = useFormHandler()

  const { onError, onSubmit: onSubmitCallback } = useSubmitForm({
    notification,
    reset,
    idInventory,
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

  const { inventory } = useQueryInventory(idInventory, reset)
  const { deleteInventoryHandle } = useDeleteInventory({
    notification,
    id: idInventory,
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
    setTriggerType: setTriggerType,
    setTriggerBrand: setTriggerBrand,
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

const useQueryInventory = (
  idInventory: string,
  reset: UseFormReset<IInventoryForm>,
) => {
  const [inventory, setInventory] = useState<Inventory>(null)
  if (idInventory) {
    const getInventory = useQuery(getInventoryQuery, {
      variables: { id: idInventory },
    })
    useEffect(() => {
      if (getInventory?.data?.getInventory) {
        const _inventory = plainToInstance(
          Inventory,
          getInventory.data.getInventory,
        )
        reset(transfromInventory(_inventory))
        setInventory(_inventory)
      }
    }, [getInventory.data, reset])
  }

  return {
    inventory,
  }
}

const useDeleteInventory = ({ notification, id }) => {
  const { trigger: deleteInventory } = useMutationData<
    MutateKey.inventory,
    DeleteInventoryData,
    DeleteTypeDataVariables
  >(MutateKey.inventory, null, deleteInventoryMutation, {
    onSuccess: () => {
      notification(notificationSuccessProp('Delete'))
      router.push({
        pathname: inventoryRoute.path,
      })
    },
    onError: (error) => {
      notification(notificationErrorProp(error))
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

const useSubmitForm = ({ notification, reset, idInventory }) => {
  const { trigger: upsertInventory } = useMutationData<
    MutateKey.inventory,
    UpsertInventoryTypeData,
    UpsertInventoryTypeVariables
  >(MutateKey.inventory, null, upsertInventoryMutation, {
    onSuccess: () => {
      notification(notificationSuccessProp(idInventory ? 'Update' : 'Create'))
      reset()
      router.push({
        pathname: inventoryRoute.path,
      })
    },
    onError: (error) => {
      notification(notificationErrorProp(error))
    },
    globalLoading: true,
  })

  const onSubmit: SubmitHandler<IInventoryForm> = (data) => {
    try {
      const InventoryInput = tranFromUpsertInventoryDto(data, idInventory)
      upsertInventory({
        ...InventoryInput,
      })
    } catch (error) {
      notification(notificationErrorProp(error?.message))
    }
  }
  const onError = () => {
    notification(notificationValidErrorProp)
  }

  return {
    onSubmit,
    onError,
  }
}

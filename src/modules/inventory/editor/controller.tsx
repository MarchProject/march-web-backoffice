import { EnumSeverity, useNotificationContext } from '@/context/notification'
import { SubmitHandler, UseFormReset, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { IInventoryForm } from './interface'
import { schema } from './schema'
import { useQueryInventoryBrand, useQueryInventoryType } from '../controller'
import { useCallback, useEffect, useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import {
  DeleteInventoryData,
  DeleteTypeDataVariables,
  UpsertInventoryTypeData,
  UpsertInventoryTypeVariables,
  deleteInventoryMutation,
  getInventoryQuery,
  upsertInventoryMutation,
} from '@/core/gql/inventory'
import { tranFromUpsertInventoryDto } from '../dto/upsert.dto'
import router from 'next/router'
import { inventoryRoute } from '@/router/inventory'
import { plainToInstance } from 'class-transformer'
import { Inventory } from '@/core/model/inventory'
import { transfromInventory } from '../dto/inventory.dto'

const notificationSuccessProp = {
  severity: EnumSeverity.success,
  title: 'Inventory',
  message: 'Create Success',
}

const notificationErrorProp = {
  severity: EnumSeverity.error,
  title: 'Inventory',
  message: 'Create Error',
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
  } = useQueryInventoryType(triggerType)

  const {
    inventoriesBrandData,
    inventoriesBrandDataError,
    inventoriesBrandLoading,
    handleSearchInventoryBrand,
  } = useQueryInventoryBrand(triggerBrand)

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
      height:'',
      price: 0,
      memberPrice: 0,
    },
    resolver: yupResolver(schema),
    reValidateMode: 'onChange',
    mode: 'all'
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
  const [
    deleteInventory,
    { loading: _loading, error, data: deleteInventoryData },
  ] = useMutation<DeleteInventoryData, DeleteTypeDataVariables>(
    deleteInventoryMutation,
  )

  const deleteInventoryHandle = useCallback(() => {
    deleteInventory({
      variables: {
        id: id,
      },
    })
  }, [deleteInventory, id])

  useEffect(() => {
    if (deleteInventoryData?.deleteInventory?.id) {
      notification(notificationSuccessProp)
      router.push({
        pathname: inventoryRoute.path,
      })
    }
  }, [notification, deleteInventoryData])

  useEffect(() => {
    if (error) {
      notification(notificationErrorProp)
    }
  }, [error, notification])

  return {
    deleteInventoryHandle,
  }
}

const useSubmitForm = ({ notification, reset, idInventory }) => {
  const [
    upsertInventory,
    { loading: _loading, error, data: upsertInventoryData },
  ] = useMutation<UpsertInventoryTypeData, UpsertInventoryTypeVariables>(
    upsertInventoryMutation,
  )

  const onSubmit: SubmitHandler<IInventoryForm> = (data) => {
    try {
      const InventoryInput = tranFromUpsertInventoryDto(data, idInventory)
      upsertInventory({
        variables: {
          ...InventoryInput,
        },
      })
    } catch (error) {
      notification(notificationErrorProp)
    }
  }
  const onError = () => {
    notification(notificationValidErrorProp)
  }

  useEffect(() => {
    if (upsertInventoryData?.upsertInventory?.id) {
      notification(notificationSuccessProp)
      reset()
      router.push({
        pathname: inventoryRoute.path,
      })
    }
  }, [notification, reset, upsertInventoryData])

  useEffect(() => {
    if (error) {
      notification(notificationErrorProp)
    }
  }, [error, notification])

  return {
    onSubmit,
    onError,
  }
}

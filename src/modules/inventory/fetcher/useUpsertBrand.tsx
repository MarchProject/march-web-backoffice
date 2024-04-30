import {
  UpsertBrandInventoryResponse,
  UpsertBrandInventoryVariables,
} from '@/core/gql/inventory/upsertBrandInventoryMutation'
import { upsertInventoryBrandMutation } from '@/core/gql/inventory/upsertBrandInventoryMutation'
import { useCallback, useState } from 'react'
import {
  notificationUpdateErrorProp,
  notificationUpdateSuccessProp,
} from '@/core/notification'
import { useMutation } from '@apollo/client'
import { StatusCode } from '@/types/response'
import { useNotificationContext } from '@/context/notification'

interface IUseUpsertBrandHandlerProps {
  triggerBrand: () => void
}

export const useUpsertBrandHandler = ({
  triggerBrand,
}: IUseUpsertBrandHandlerProps) => {
  const { notification } = useNotificationContext()
  const [flagCreate, setFlagCreate] = useState(true)

  const [upsertBrandInventory, { loading, data: upsertInventoryBrandData }] =
    useMutation<UpsertBrandInventoryResponse, UpsertBrandInventoryVariables>(
      upsertInventoryBrandMutation,
      {
        onCompleted: (data) => {
          if (data?.upsertInventoryBrand?.status?.code === StatusCode.SUCCESS) {
            notification(notificationUpdateSuccessProp('brand', flagCreate))
            triggerBrand()
          } else {
            notification(
              notificationUpdateErrorProp(
                'brand',
                flagCreate,
                data?.upsertInventoryBrand?.status?.message,
              ),
            )
          }
        },
        onError: (error) => {
          notification(
            notificationUpdateErrorProp('brand', flagCreate, error?.message),
          )
        },
      },
    )

  const updateBrandHandle = useCallback(
    (data) => {
      if (data?.id) {
        setFlagCreate(false)
      } else {
        setFlagCreate(true)
      }
      upsertBrandInventory({
        variables: {
          input: {
            id: data?.id,
            name: data?.name?.trim(),
            description: data?.description?.trim(),
          },
        },
      })
    },
    [upsertBrandInventory],
  )

  return {
    upsertInventoryBrand: upsertBrandInventory,
    updateBrandHandle,
    upsertInventoryBrandLoading: loading,
    upsertInventoryBrandData:
      upsertInventoryBrandData?.upsertInventoryBrand?.data,
  }
}
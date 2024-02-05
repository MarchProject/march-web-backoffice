import { UpsertTypeInventoryVariables } from '@/core/gql/inventory/upsertTypeInventoryMutation'
import { UpsertTypeInventoryResponse } from '@/core/gql/inventory/upsertTypeInventoryMutation'
import { upsertTypeInventoryMutation } from '@/core/gql/inventory/upsertTypeInventoryMutation'
import { useCallback, useState } from 'react'
import {
  notificationUpdateErrorProp,
  notificationUpdateSuccessProp,
} from '@/core/notification'
import { useMutation } from '@apollo/client'
import { StatusCode } from '@/types/response'
import { useNotificationContext } from '@/context/notification'

interface IUseUpsertTypeHandleProps {
  triggerType: () => void
}

export const useUpsertTypeHandle = ({
  triggerType,
}: IUseUpsertTypeHandleProps) => {
  const { notification } = useNotificationContext()
  const [flagCreate, setFlagCreate] = useState(true)

  const [upsertTypeInventory, { data: upsertInventoryTypeData, loading }] =
    useMutation<UpsertTypeInventoryResponse, UpsertTypeInventoryVariables>(
      upsertTypeInventoryMutation,
      {
        onCompleted: (data) => {
          if (data?.upsertTypeInventory?.status?.code === StatusCode.SUCCESS) {
            notification(notificationUpdateSuccessProp('type', flagCreate))
            triggerType()
          } else {
            notification(
              notificationUpdateErrorProp(
                'type',
                flagCreate,
                data?.upsertTypeInventory?.status?.message,
              ),
            )
          }
        },
        onError: (error) => {
          notification(
            notificationUpdateErrorProp('type', flagCreate, error?.message),
          )
        },
      },
    )

  const updateTypeHandle = useCallback(
    (data) => {
      if (data?.id) {
        setFlagCreate(false)
      } else {
        setFlagCreate(true)
      }
      upsertTypeInventory({
        variables: {
          input: {
            id: data?.id,
            name: data?.name?.trim(),
            description: data?.description?.trim(),
          },
        },
      })
    },
    [upsertTypeInventory],
  )

  return {
    upsertInventoryType: upsertTypeInventory,
    updateTypeHandle,
    upsertInventoryTypeLoading: loading,
    upsertInventoryTypeData: upsertInventoryTypeData?.upsertTypeInventory?.data,
  }
}

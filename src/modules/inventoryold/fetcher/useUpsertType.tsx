import { UpsertTypeInventoryVariables } from '@/core/gql/inventory/upsertTypeInventoryMutation'
import { UpsertTypeInventoryResponse } from '@/core/gql/inventory/upsertTypeInventoryMutation'
import { upsertInventoryTypeMutation } from '@/core/gql/inventory/upsertTypeInventoryMutation'
import { useCallback } from 'react'
import {
  notificationInternalErrorProp,
  notificationMutationProp,
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

  const [upsertTypeInventory, { data: upsertInventoryTypeData, loading }] =
    useMutation<UpsertTypeInventoryResponse, UpsertTypeInventoryVariables>(
      upsertInventoryTypeMutation,
      {
        onCompleted: (data) => {
          if (data?.upsertInventoryType?.status?.code === StatusCode.SUCCESS) {
            notification(
              notificationMutationProp(
                data?.upsertInventoryType?.status.message,
                'success',
              ),
            )
            triggerType()
          } else {
            notification(
              notificationMutationProp(
                data?.upsertInventoryType?.status.message,
                'error',
              ),
            )
          }
        },
        onError: (error) => {
          if (error.message === 'Unauthorized Role') {
            notification(notificationInternalErrorProp('Permission.', 'Server'))
          } else {
            notification(notificationInternalErrorProp('Update Failed.'))
          }
        },
      },
    )

  const updateTypeHandle = useCallback(
    (data) => {
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
    upsertInventoryTypeData: upsertInventoryTypeData?.upsertInventoryType?.data,
  }
}

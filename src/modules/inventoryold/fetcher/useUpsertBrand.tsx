import {
  UpsertBrandInventoryResponse,
  UpsertBrandInventoryVariables,
} from '@/core/gql/inventory/upsertBrandInventoryMutation'
import { upsertInventoryBrandMutation } from '@/core/gql/inventory/upsertBrandInventoryMutation'
import { useCallback } from 'react'
import {
  notificationInternalErrorProp,
  notificationMutationProp,
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

  const [upsertBrandInventory, { loading, data: upsertInventoryBrandData }] =
    useMutation<UpsertBrandInventoryResponse, UpsertBrandInventoryVariables>(
      upsertInventoryBrandMutation,
      {
        onCompleted: (data) => {
          console.log({ data })
          if (data?.upsertInventoryBrand?.status?.code === StatusCode.SUCCESS) {
            notification(
              notificationMutationProp(
                data?.upsertInventoryBrand?.status.message,
                'success',
              ),
            )
            triggerBrand()
          } else {
            notification(
              notificationMutationProp(
                data?.upsertInventoryBrand?.status.message,
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

  const updateBrandHandle = useCallback(
    (data) => {
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

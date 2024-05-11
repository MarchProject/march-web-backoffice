import { EnumSeverity, useNotificationContext } from '@/context/notification'
import { DeleteInventoryData } from '@/core/gql/inventory/deleteInventoryMutation'
import { DeleteInventoryVariables } from '@/core/gql/inventory/deleteInventoryMutation'
import { deleteInventoryMutation } from '@/core/gql/inventory/deleteInventoryMutation'
import { inventoryRoute } from '@/router/inventory'
import { StatusCode } from '@/types/response'
import { useMutation } from '@apollo/client'
import router from 'next/router'
import { useCallback } from 'react'
import { notificationInternalErrorProp, notificationMutationProp } from '@/core/notification'

export interface IUseDeleteInventoryProps {
  id: string
}

export const useDeleteInventory = ({ id }: IUseDeleteInventoryProps) => {
  const { notification } = useNotificationContext()
  const [deleteInventory, { loading }] = useMutation<
    DeleteInventoryData,
    DeleteInventoryVariables
  >(deleteInventoryMutation, {
    onCompleted: (data) => {
      if (data?.deleteInventory?.status?.code === StatusCode.SUCCESS) {
        notification(
          notificationMutationProp(
            data?.deleteInventory?.status.message,
            EnumSeverity.success,
          ),
        )
        router.push({
          pathname: inventoryRoute.path,
        })
      } else {
        notification(
          notificationMutationProp(
            data?.deleteInventory?.status.message,
            EnumSeverity.error,
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
  })

  const deleteInventoryHandle = useCallback(() => {
    deleteInventory({
      variables: {
        id: id,
      },
    })
  }, [deleteInventory, id])

  return {
    deleteInventoryHandle,
    deleteInventoryLoading: loading,
  }
}

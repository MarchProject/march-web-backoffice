import { useNotificationContext } from '@/context/notification'
import { DeleteInventoryData } from '@/core/gql/inventory/deleteInventoryMutation'
import { DeleteInventoryVariables } from '@/core/gql/inventory/deleteInventoryMutation'
import { deleteInventoryMutation } from '@/core/gql/inventory/deleteInventoryMutation'
import {
  notificationEditorDeleteErrorProp,
  notificationEditorSuccessProp,
} from '@/core/notification'
import { inventoryRoute } from '@/router/inventory'
import { StatusCode } from '@/types/response'
import { useMutation } from '@apollo/client'
import router from 'next/router'
import { useCallback } from 'react'

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
        notification(notificationEditorSuccessProp('Delete'))
        router.push({
          pathname: inventoryRoute.path,
        })
      } else {
        notification(
          notificationEditorDeleteErrorProp(
            data?.deleteInventory?.status?.message,
          ),
        )
      }
    },
    onError: (error) => {
      notification(notificationEditorDeleteErrorProp(error?.message))
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

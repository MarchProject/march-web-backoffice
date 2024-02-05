import { DeleteTypeInventoryResponse } from '@/core/gql/inventory/deleteTypeInventoryMutation'
import {
  DeleteTypeInventoryVariables,
  deleteTypeInventoryMutation,
} from '@/core/gql/inventory/deleteTypeInventoryMutation'
import { useCallback } from 'react'
import {
  notificationTypeUsedDeleteErrorProp,
  notificationDeleteErrorProp,
  notificationDeleteSuccessProp,
} from '@/core/notification'
import { useMutation } from '@apollo/client'
import { StatusCode } from '@/types/response'

export const useDeleteTypeInventoryHandler = ({
  notification,
  triggerType,
  triggerTrash,
}) => {
  const [deleteInventoryType, { loading }] = useMutation<
    DeleteTypeInventoryResponse,
    DeleteTypeInventoryVariables
  >(deleteTypeInventoryMutation, {
    onCompleted: (data) => {
      if (data?.deleteTypeInventory?.status?.code === StatusCode.SUCCESS) {
        notification(notificationDeleteSuccessProp('type'))
        triggerType()
        triggerTrash()
      } else if (data?.deleteTypeInventory?.status?.code === StatusCode.ONUSE) {
        notification(notificationTypeUsedDeleteErrorProp('type'))
      } else {
        notification(notificationDeleteErrorProp('type'))
      }
    },
    onError: () => {
      notification(notificationDeleteErrorProp('type'))
    },
  })

  const deleteTypeHandle = useCallback(
    (data) => {
      deleteInventoryType({
        variables: { id: data },
      })
    },
    [deleteInventoryType],
  )

  return {
    deleteInventoryType,
    deleteInventoryTypeLoading: loading,
    deleteTypeHandle,
  }
}

import { DeleteTypeInventoryResponse } from '@/core/gql/inventory/deleteTypeInventoryMutation'
import {
  DeleteTypeInventoryVariables,
  deleteInventoryTypeMutation,
} from '@/core/gql/inventory/deleteTypeInventoryMutation'
import { useCallback } from 'react'
import {
  notificationInternalErrorProp,
  notificationMutationProp,
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
  >(deleteInventoryTypeMutation, {
    onCompleted: (data) => {
      if (data?.deleteInventoryType?.status?.code === StatusCode.SUCCESS) {
        notification(
          notificationMutationProp(
            data?.deleteInventoryType?.status.message,
            'success',
          ),
        )
        triggerType()
        triggerTrash()
      } else {
        notification(
          notificationMutationProp(
            data?.deleteInventoryType?.status.message,
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

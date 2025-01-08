import { useCallback } from 'react'
import {
  notificationInternalErrorProp,
  notificationMutationProp,
} from '@/core/notification'
import { useMutation } from '@apollo/client'
import { useNotificationContext } from '@/context/notification'
import { StatusCode } from '@/types/response'
import {
  DeleteBranchInventoryResponse,
  DeleteBranchInventoryVariables,
  deleteInventoryBranchMutation,
} from '@/core/gql/inventory/deleteBranchInventoryMutation'

interface IUseDeleteBranchHandlerProps {
  triggerBranch: () => void
  triggerTrash: () => void
}

export const useDeleteBranchInventoryHandler = ({
  triggerBranch,
  triggerTrash,
}: IUseDeleteBranchHandlerProps) => {
  const { notification } = useNotificationContext()
  const [deleteInventoryBranch, { loading }] = useMutation<
    DeleteBranchInventoryResponse,
    DeleteBranchInventoryVariables
  >(deleteInventoryBranchMutation, {
    onCompleted: (data) => {
      if (data?.deleteInventoryBranch?.status?.code === StatusCode.SUCCESS) {
        notification(
          notificationMutationProp(
            data?.deleteInventoryBranch?.status.message,
            'success',
          ),
        )
        triggerBranch()
        triggerTrash()
      } else {
        notification(
          notificationMutationProp(
            data?.deleteInventoryBranch?.status.message,
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

  const deleteBranchHandle = useCallback(
    (data) => {
      deleteInventoryBranch({
        variables: { id: data },
      })
    },
    [deleteInventoryBranch],
  )

  return {
    deleteInventoryBranch: deleteInventoryBranch,
    deleteInventoryBranchLoading: loading,
    deleteBranchHandle: deleteBranchHandle,
  }
}

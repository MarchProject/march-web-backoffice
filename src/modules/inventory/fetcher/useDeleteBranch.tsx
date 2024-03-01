import { useCallback } from 'react'
import {
  notificationDeleteErrorProp,
  notificationDeleteSuccessProp,
  notificationTypeUsedDeleteErrorProp,
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
        notification(notificationDeleteSuccessProp('branch'))
        triggerBranch()
        triggerTrash()
      } else if (
        data?.deleteInventoryBranch?.status?.code === StatusCode.ONUSE
      ) {
        notification(notificationTypeUsedDeleteErrorProp('branch'))
      } else {
        notification(notificationDeleteErrorProp('branch'))
      }
    },
    onError: () => {
      notification(notificationDeleteErrorProp('branch'))
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

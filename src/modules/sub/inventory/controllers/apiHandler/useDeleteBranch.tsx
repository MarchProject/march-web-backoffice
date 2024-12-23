import { useCallback } from 'react'
import {
  notificationInternalErrorProp,
  notificationMutationProp,
} from '@/core/notification'
import { useMutation } from '@apollo/client'
import {
  ConfigNotificationPropsType,
} from '@/context/notification'
import { StatusCode } from '@/types/response'
import {
  DeleteBranchInventoryResponse,
  DeleteBranchInventoryVariables,
  deleteInventoryBranchMutation,
} from '@/core/gql/inventory/deleteBranchInventoryMutation'

interface IUseDeleteBranchHandlerProps {
  triggerDeleteBranch: () => void
  notification: (config?: ConfigNotificationPropsType) => void
}

export const useDeleteBranchInventoryHandler = ({
  triggerDeleteBranch,
  notification,
}: IUseDeleteBranchHandlerProps) => {
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
        triggerDeleteBranch()
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
    (id) => {
      deleteInventoryBranch({
        variables: { id },
      })
    },
    [deleteInventoryBranch],
  )

  return {
    deleteInventoryBranch,
    deleteInventoryBranchLoading: loading,
    deleteBranchHandle,
  }
}

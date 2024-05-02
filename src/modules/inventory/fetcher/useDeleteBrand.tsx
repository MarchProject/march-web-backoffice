import {
  DeleteBrandInventoryResponse,
  DeleteBrandInventoryVariables,
} from '@/core/gql/inventory/deleteBrandInventoryMutation'
import { deleteInventoryBrandMutation } from '@/core/gql/inventory/deleteBrandInventoryMutation'
import { useCallback } from 'react'
import {
  notificationInternalErrorProp,
  notificationDeleteSuccessProp,
  notificationTypeUsedDeleteErrorProp,
  notificationMutationProp,
} from '@/core/notification'
import { useMutation } from '@apollo/client'
import { EnumSeverity, useNotificationContext } from '@/context/notification'
import { StatusCode } from '@/types/response'

interface IUseDeleteBrandHandlerProps {
  triggerBrand: () => void
  triggerTrash: () => void
}

export const useDeleteBrandInventoryHandler = ({
  triggerBrand,
  triggerTrash,
}: IUseDeleteBrandHandlerProps) => {
  const { notification } = useNotificationContext()
  const [deleteInventoryBrand, { loading }] = useMutation<
    DeleteBrandInventoryResponse,
    DeleteBrandInventoryVariables
  >(deleteInventoryBrandMutation, {
    onCompleted: (data) => {
      if (data?.deleteInventoryBrand?.status?.code === StatusCode.SUCCESS) {
        notification(
          notificationMutationProp(
            data?.deleteInventoryBrand?.status.message,
            EnumSeverity.success,
          ),
        )
        triggerBrand()
        triggerTrash()
      } else {
        notification(
          notificationMutationProp(
            data?.deleteInventoryBrand?.status.message,
            EnumSeverity.error,
          ),
        )
      }
    },
    onError: () => {
      notification(notificationInternalErrorProp('Delete Failed.'))
    },
  })

  const deleteBrandHandle = useCallback(
    (data) => {
      deleteInventoryBrand({
        variables: { id: data },
      })
    },
    [deleteInventoryBrand],
  )

  return {
    deleteInventoryBrand,
    deleteInventoryBrandLoading: loading,
    deleteBrandHandle,
  }
}

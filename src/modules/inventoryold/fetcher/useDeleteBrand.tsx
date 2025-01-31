import {
  DeleteBrandInventoryResponse,
  DeleteBrandInventoryVariables,
} from '@/core/gql/inventory/deleteBrandInventoryMutation'
import { deleteInventoryBrandMutation } from '@/core/gql/inventory/deleteBrandInventoryMutation'
import { useCallback } from 'react'
import {
  notificationInternalErrorProp,
  notificationMutationProp,
} from '@/core/notification'
import { useMutation } from '@apollo/client'
import { useNotificationContext } from '@/context/notification'
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
            'success',
          ),
        )
        triggerBrand()
        triggerTrash()
      } else {
        notification(
          notificationMutationProp(
            data?.deleteInventoryBrand?.status.message,
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

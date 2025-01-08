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
import {
  ConfigNotificationPropsType,
} from '@/context/notification'
import { StatusCode } from '@/types/response'

interface IUseDeleteBrandHandlerProps {
  triggerDeleteBrand: () => void
  notification: (config?: ConfigNotificationPropsType) => void
}

export const useDeleteBrandInventoryHandler = ({
  triggerDeleteBrand,
  notification,
}: IUseDeleteBrandHandlerProps) => {

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
        triggerDeleteBrand()
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

import {
  DeleteBrandInventoryResponse,
  DeleteBrandInventoryVariables,
} from '@/core/gql/inventory/deleteBrandInventoryMutation'
import { deleteInventoryBrandMutation } from '@/core/gql/inventory/deleteBrandInventoryMutation'
import { useCallback } from 'react'
import {
  notificationDeleteErrorProp,
  notificationDeleteSuccessProp,
  notificationTypeUsedDeleteErrorProp,
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
        notification(notificationDeleteSuccessProp('brand'))
        triggerBrand()
        triggerTrash()
      } else if (
        data?.deleteInventoryBrand?.status?.code === StatusCode.ONUSE
      ) {
        notification(notificationTypeUsedDeleteErrorProp('brand'))
      } else {
        notification(notificationDeleteErrorProp('brand'))
      }
    },
    onError: () => {
      notification(notificationDeleteErrorProp('brand'))
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

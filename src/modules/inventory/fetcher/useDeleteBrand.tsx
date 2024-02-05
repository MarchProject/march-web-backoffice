import {
  DeleteBrandInventoryResponse,
  DeleteBrandInventoryVariables,
} from '@/core/gql/inventory/deleteBrandInventoryMutation'
import { deleteBrandInventoryMutation } from '@/core/gql/inventory/deleteBrandInventoryMutation'
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
  const [deleteBrandType, { loading }] = useMutation<
    DeleteBrandInventoryResponse,
    DeleteBrandInventoryVariables
  >(deleteBrandInventoryMutation, {
    onCompleted: (data) => {
      if (data?.deleteBrandInventory?.status?.code === StatusCode.SUCCESS) {
        notification(notificationDeleteSuccessProp('brand'))
        triggerBrand()
        triggerTrash()
      } else if (
        data?.deleteBrandInventory?.status?.code === StatusCode.ONUSE
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
      deleteBrandType({
        variables: { id: data },
      })
    },
    [deleteBrandType],
  )

  return {
    deleteBrandType,
    deleteInventoryBrandLoading: loading,
    deleteBrandHandle,
  }
}

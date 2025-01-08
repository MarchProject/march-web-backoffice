import { upsertInventoryMutation } from '@/core/gql/inventory/upsertInventory'
import { UpsertInventoryTypeResponse } from '@/core/gql/inventory/upsertInventory'
import { UpsertInventoryTypeVariables } from '@/core/gql/inventory/upsertInventory'
import { inventoryRoute } from '@/router/inventory'
import { useMutation } from '@apollo/client'
import router from 'next/router'
import { UseFormReset } from 'react-hook-form'
import { IInventoryForm } from '../editor/interface'
import { useNotificationContext } from '@/context/notification'
import { StatusCode } from '@/types/response'
import {
  notificationInternalErrorProp,
  notificationMutationProp,
} from '@/core/notification'

export interface IUseUpsertInventoryProps {
  reset: UseFormReset<IInventoryForm>
  idInventory?: string
}

export const useUpsertInventory = ({ reset }: IUseUpsertInventoryProps) => {
  const { notification } = useNotificationContext()
  const [upsertInventory, { loading }] = useMutation<
    UpsertInventoryTypeResponse,
    UpsertInventoryTypeVariables
  >(upsertInventoryMutation, {
    onCompleted: (data) => {
      if (data?.upsertInventory?.status?.code === StatusCode.SUCCESS) {
        notification(
          notificationMutationProp(
            data?.upsertInventory?.status.message,
            'success',
          ),
        )
        reset()
        router.push({
          pathname: inventoryRoute.path,
        })
      } else {
        notification(
          notificationMutationProp(
            data?.upsertInventory?.status.message,
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

  return {
    upsertInventoryLoading: loading,
    upsertInventory,
  }
}

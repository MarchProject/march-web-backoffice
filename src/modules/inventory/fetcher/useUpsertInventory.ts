import { upsertInventoryMutation } from '@/core/gql/inventory/upsertInventory'
import { UpsertInventoryTypeData } from '@/core/gql/inventory/upsertInventory'
import { UpsertInventoryTypeVariables } from '@/core/gql/inventory/upsertInventory'
import {
  notificationEditorErrorProp,
  notificationEditorSuccessProp,
} from '@/core/notification'
import { inventoryRoute } from '@/router/inventory'
import { useMutation } from '@apollo/client'
import router from 'next/router'
import { UseFormReset } from 'react-hook-form'
import { IInventoryForm } from '../editor/interface'
import { useNotificationContext } from '@/context/notification'
import { StatusCode } from '@/types/response'

export interface IUseUpsertInventoryProps {
  reset: UseFormReset<IInventoryForm>
  idInventory?: string
}

export const useUpsertInventory = ({
  reset,
  idInventory,
}: IUseUpsertInventoryProps) => {
  const { notification } = useNotificationContext()
  const [upsertInventory, { loading }] = useMutation<
    UpsertInventoryTypeData,
    UpsertInventoryTypeVariables
  >(upsertInventoryMutation, {
    onCompleted: (data) => {
      if (data.upsertInventory.status.code === StatusCode.SUCCESS) {
        notification(
          notificationEditorSuccessProp(idInventory ? 'Update' : 'Create'),
        )
        reset()
        router.push({
          pathname: inventoryRoute.path,
        })
      } else {
        notification(
          notificationEditorErrorProp(
            idInventory ? 'Update' : 'Create',
            data.upsertInventory.status.message,
          ),
        )
      }
    },
    onError: (error) => {
      notification(
        notificationEditorErrorProp(
          idInventory ? 'Update' : 'Create',
          error.message,
        ),
      )
    },
  })

  return {
    upsertInventoryLoading: loading,
    upsertInventory,
  }
}

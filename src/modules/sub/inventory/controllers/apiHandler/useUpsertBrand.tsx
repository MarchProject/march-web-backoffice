import { UpsertBrandInventoryResponse } from '@/core/gql/inventory/upsertBrandInventoryMutation'
import { useCallback } from 'react'
import {
  notificationInternalErrorProp,
  notificationMutationProp,
} from '@/core/notification'
import { ApolloError } from '@apollo/client'
import { StatusCode } from '@/types/response'
import { ConfigNotificationPropsType } from '@/context/notification'
import { upsertInventoryBrand } from '../fetcher/upsertinventoryBrand'

interface IUseUpsertBrandHandlerProps {
  triggerUpsertBrand: () => void
  notification: (config?: ConfigNotificationPropsType) => void
}

export const useUpsertBrandHandler = ({
  triggerUpsertBrand,
  notification,
}: IUseUpsertBrandHandlerProps) => {
  const onCompleted = (data: UpsertBrandInventoryResponse) => {
    if (data?.upsertInventoryBrand?.status?.code === StatusCode.SUCCESS) {
      notification(
        notificationMutationProp(
          data?.upsertInventoryBrand?.status.message,
          'success',
        ),
      )
      triggerUpsertBrand()
    } else {
      notification(
        notificationMutationProp(
          data?.upsertInventoryBrand?.status.message,
          'error',
        ),
      )
    }
  }

  const onError = (error: ApolloError) => {
    if (error.message === 'Unauthorized Role') {
      notification(notificationInternalErrorProp('Permission.', 'Server'))
    } else {
      notification(notificationInternalErrorProp('Update Failed.'))
    }
  }

  const {
    upsertInventoryBrand: upsertInventoryBranchMutation,
    upsertInventoryBrandLoading,
  } = upsertInventoryBrand({ onCompleted, onError })

  const updateBrandHandle = useCallback(
    (data) => {
      upsertInventoryBranchMutation({
        variables: {
          input: {
            id: data?.id,
            name: data?.name?.trim(),
            description: data?.description?.trim(),
          },
        },
      })
    },
    [upsertInventoryBranchMutation],
  )

  return {
    updateBrandHandle,
    upsertInventoryBrandLoading: upsertInventoryBrandLoading,
  }
}

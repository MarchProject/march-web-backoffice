import { UpsertTypeInventoryResponse } from '@/core/gql/inventory/upsertTypeInventoryMutation'
import { useCallback } from 'react'
import {
  notificationInternalErrorProp,
  notificationMutationProp,
} from '@/core/notification'
import { ApolloError } from '@apollo/client'
import { StatusCode } from '@/types/response'
import { ConfigNotificationPropsType } from '@/context/notification'
import { upsertInventoryType } from '../fetcher/upsertInventoryType'

interface IUseUpsertTypeHandleProps {
  triggerUpsertType: () => void
  notification: (config?: ConfigNotificationPropsType) => void
}

export const useUpsertTypeHandler = ({
  triggerUpsertType,
  notification,
}: IUseUpsertTypeHandleProps) => {
  const onCompleted = (data: UpsertTypeInventoryResponse) => {
    if (data?.upsertInventoryType?.status?.code === StatusCode.SUCCESS) {
      notification(
        notificationMutationProp(
          data?.upsertInventoryType?.status.message,
          'success',
        ),
      )
      triggerUpsertType()
    } else {
      notification(
        notificationMutationProp(
          data?.upsertInventoryType?.status.message,
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
    upsertInventoryType: upsertInventoryTypeMutation,
    upsertInventoryTypeLoading,
  } = upsertInventoryType({ onCompleted, onError })

  const updateTypeHandle = useCallback(
    (data) => {
      upsertInventoryTypeMutation({
        variables: {
          input: {
            id: data?.id,
            name: data?.name?.trim(),
            description: data?.description?.trim(),
          },
        },
      })
    },
    [upsertInventoryTypeMutation],
  )

  return {
    updateTypeHandle,
    upsertInventoryTypeLoading: upsertInventoryTypeLoading,
  }
}

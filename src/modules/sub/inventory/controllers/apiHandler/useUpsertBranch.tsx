import { useCallback } from 'react'
import {
  notificationInternalErrorProp,
  notificationMutationProp,
} from '@/core/notification'
import { StatusCode } from '@/types/response'
import { ConfigNotificationPropsType } from '@/context/notification'
import { upsertInventoryBranch } from '../fetcher/upsertInventoryBranch'

interface IUseUpsertBranchHandlerProps {
  triggerUpsertBranch: () => void
  notification: (config?: ConfigNotificationPropsType) => void
}

export const useUpsertBranchHandler = ({
  triggerUpsertBranch,
  notification,
}: IUseUpsertBranchHandlerProps) => {
  const onCompleted = useCallback(
    (data) => {
      if (data?.upsertInventoryBranch?.status?.code === StatusCode.SUCCESS) {
        notification(
          notificationMutationProp(
            data?.upsertInventoryBranch?.status.message,
            'success',
          ),
        )
        triggerUpsertBranch()
      } else {
        notification(
          notificationMutationProp(
            data?.upsertInventoryBranch?.status.message,
            'error',
          ),
        )
      }
    },
    [notification, triggerUpsertBranch],
  )

  const onError = useCallback(
    (error) => {
      if (error.message === 'Unauthorized Role') {
        notification(notificationInternalErrorProp('Permission.', 'Server'))
      } else {
        notification(notificationInternalErrorProp('Update Failed.'))
      }
    },
    [notification],
  )

  const {
    upsertInventoryBranch: upsertInventoryBranchMutation,
    upsertInventoryBranchLoading,
  } = upsertInventoryBranch({ onCompleted, onError })

  const updateBranchHandle = useCallback(
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
    updateBranchHandle,
    upsertInventoryBranchLoading,
  }
}

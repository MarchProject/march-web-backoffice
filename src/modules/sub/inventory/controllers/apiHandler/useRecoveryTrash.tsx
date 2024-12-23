import { useCallback } from 'react'
import {
  notificationInternalErrorProp,
  notificationMutationProp,
} from '@/core/notification'
import { StatusCode } from '@/types/response'
import { recoveryTrash } from '../fetcher/recoveryHardDeleted'
import { ConfigNotificationPropsType } from '@/context/notification'

type UseRecoveryTrashHandlerPropsType = {
  notification: (config?: ConfigNotificationPropsType) => void
  triggerAll: () => void
}

export const useRecoveryTrashHandler = ({
  notification,
  triggerAll,
}: UseRecoveryTrashHandlerPropsType) => {
  const onCompleted = useCallback(
    (data) => {
      if (data?.recoveryHardDeleted?.status?.code === StatusCode.SUCCESS) {
        notification(
          notificationMutationProp(
            data?.recoveryHardDeleted?.status.message,
            'success',
          ),
        )
        triggerAll()
      } else {
        notification(notificationInternalErrorProp('Trash Failed.'))
      }
    },
    [notification, triggerAll],
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

  const { recoveryHardDeletedHandler, recoveryHardDeletedLoading } =
    recoveryTrash({
      onCompleted,
      onError,
    })

  return {
    recoveryHardDeletedHandler,
    recoveryHardDeletedLoading,
  }
}

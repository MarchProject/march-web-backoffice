import { useCallback } from 'react'
import {
  notificationInternalErrorProp,
  notificationMutationProp,
} from '@/core/notification'
import { useMutation } from '@apollo/client'
import { useNotificationContext } from '@/context/notification'
import { StatusCode } from '@/types/response'
import {
  revokeSubUserMutation,
  RevokeSubUserResponse,
  RevokeSubUserVariables,
} from '@/core/gql/user/revokeSubUser'

interface IUseRevokeSubUserHandlerProps {
  triggerPermissionHandler: () => void
}

export const useRevokeSubUserHandler = ({
  triggerPermissionHandler,
}: IUseRevokeSubUserHandlerProps) => {
  const { notification } = useNotificationContext()
  const [revokeSubUser, { loading }] = useMutation<
    RevokeSubUserResponse,
    RevokeSubUserVariables
  >(revokeSubUserMutation, {
    onCompleted: (data) => {
      if (data?.revokeSubUser?.status?.code === StatusCode.SUCCESS) {
        notification(
          notificationMutationProp(
            data?.revokeSubUser?.status.message,
            'success',
          ),
        )
        triggerPermissionHandler()
      } else {
        notification(
          notificationMutationProp(
            data?.revokeSubUser?.status.message,
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

  const revokeSubUserHandle = useCallback(
    (data) => {
      revokeSubUser({
        variables: {
          userId: data.id,
        },
      })
    },
    [revokeSubUser],
  )

  return {
    revokeSubUser,
    deleteInventoryBrandLoading: loading,
    revokeSubUserHandle,
  }
}

import { useCallback } from 'react'
import {
  notificationInternalErrorProp,
  notificationMutationProp,
} from '@/core/notification'
import { useMutation } from '@apollo/client'
import { EnumSeverity, useNotificationContext } from '@/context/notification'
import { StatusCode } from '@/types/response'
import {
  revokeSubUserMutation,
  RevokeSubUserResponse,
  RevokeSubUserVariables,
} from '@/core/gql/user/revokeSubUser'

interface IUseRevokeSubUserHandlerProps {
  triggerPermission: () => void
}

export const useRevokeSubUserHandler = ({
  triggerPermission,
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
            EnumSeverity.success,
          ),
        )
        triggerPermission()
      } else {
        notification(
          notificationMutationProp(
            data?.revokeSubUser?.status.message,
            EnumSeverity.error,
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
          userId: data.userId,
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

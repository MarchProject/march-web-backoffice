import { useCallback } from 'react'
import {
  notificationInternalErrorProp,
  notificationMutationProp,
} from '@/core/notification'
import { useMutation } from '@apollo/client'
import { EnumSeverity, useNotificationContext } from '@/context/notification'
import { StatusCode } from '@/types/response'
import {
  createSubUserMutation,
  CreateSubUserResponse,
  CreateSubUserVariables,
} from '@/core/gql/user/createSubUser'

interface IUseCreateSubUserHandlerProps {
  triggerPermission: () => void
}

export const useCreateSubUserHandler = ({
  triggerPermission,
}: IUseCreateSubUserHandlerProps) => {
  const { notification } = useNotificationContext()
  const [createSubUser, { loading }] = useMutation<
    CreateSubUserResponse,
    CreateSubUserVariables
  >(createSubUserMutation, {
    onCompleted: (data) => {
      if (data?.createSubUser?.status?.code === StatusCode.SUCCESS) {
        notification(
          notificationMutationProp(
            data?.createSubUser?.status.message,
            EnumSeverity.success,
          ),
        )
        triggerPermission()
      } else {
        notification(
          notificationMutationProp(
            data?.createSubUser?.status.message,
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

  const createSubUserHandle = useCallback(
    (data) => {
      createSubUser({
        variables: {
          input: {
            email: data.email,
            username: data.username,
            role: data.role,
          },
        },
      })
    },
    [createSubUser],
  )

  return {
    createSubUser,
    deleteInventoryBrandLoading: loading,
    createSubUserHandle,
  }
}

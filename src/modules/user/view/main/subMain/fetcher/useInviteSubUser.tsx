import { useCallback } from 'react'
import {
  notificationInternalErrorProp,
  notificationMutationProp,
} from '@/core/notification'
import { useMutation } from '@apollo/client'
import { useNotificationContext } from '@/context/notification'
import { StatusCode } from '@/types/response'
import {
  createSubUserMutation,
  CreateSubUserResponse,
  CreateSubUserVariables,
} from '@/core/gql/user/createSubUser'
import { IInviteDataForm } from '../user/interface'

interface IUseCreateSubUserHandlerProps {
  triggerPermissionHandler: () => void
}

export const useCreateSubUserHandler = ({
  triggerPermissionHandler,
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
            'success',
          ),
        )
        triggerPermissionHandler()
      } else {
        notification(
          notificationMutationProp(
            data?.createSubUser?.status.message,
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

  const createSubUserHandle = useCallback(
    (data: IInviteDataForm) => {
      createSubUser({
        variables: {
          input: {
            email: data.email,
            firstname: data.firstname,
            lastname: data.lastname,
            description: data.description,
            role: data.role,
          },
        },
      })
    },
    [createSubUser],
  )

  return {
    createSubUser,
    createSubUserLoading: loading,
    createSubUserHandle,
  }
}

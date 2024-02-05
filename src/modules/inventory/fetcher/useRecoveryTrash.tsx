import { useCallback } from 'react'
import {
  notificationTrashMutateErrorProp,
  notificationTrashMutateSuccessProp,
} from '@/core/notification'
import {
  EnumDeletedMode,
  EnumDeletedType,
} from '@/core/gql/inventory/recoveryHardDeletedMutation'
import {
  RecoveryHardDeletedResponse,
  RecoveryHardDeletedVariable,
  recoveryHardDeletedMutation,
} from '@/core/gql/inventory/recoveryHardDeletedMutation'
import { useMutation } from '@apollo/client'
import { StatusCode } from '@/types/response'

export const useRecoveryTrashHandler = ({
  triggerInventory,
  triggerBrand,
  triggerType,
  triggerTrash,
  notification,
}) => {
  const [recoveryHardDeleted, { loading }] = useMutation<
    RecoveryHardDeletedResponse,
    RecoveryHardDeletedVariable
  >(recoveryHardDeletedMutation, {
    onCompleted: (data) => {
      if (data?.recoveryHardDeleted?.status?.code === StatusCode.SUCCESS) {
        notification(
          notificationTrashMutateSuccessProp(
            data?.recoveryHardDeleted?.data.mode,
          ),
        )
        triggerType()
        triggerBrand()
        triggerInventory()
        triggerTrash()
      } else {
      }
    },
    onError: () => {
      notification(notificationTrashMutateErrorProp)
    },
  })

  const recoveryHardDeletedHandle = useCallback(
    (id: string, type: EnumDeletedType, mode: EnumDeletedMode) => {
      recoveryHardDeleted({
        variables: {
          input: {
            id: id,
            type: type,
            mode: mode,
          },
        },
      })
    },
    [recoveryHardDeleted],
  )

  return {
    recoveryHardDeletedHandle,
  }
}

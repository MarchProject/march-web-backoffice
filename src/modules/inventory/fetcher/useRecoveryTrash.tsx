import { useCallback } from 'react'
import {
  notificationInternalErrorProp,
  notificationMutationProp,
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
import { EnumSeverity } from '@/context/notification'

export const useRecoveryTrashHandler = ({
  triggerInventory,
  triggerBrand,
  triggerBranch,
  triggerType,
  triggerTrash,
  notification,
}) => {
  const [recoveryHardDeleted] = useMutation<
    RecoveryHardDeletedResponse,
    RecoveryHardDeletedVariable
  >(recoveryHardDeletedMutation, {
    onCompleted: (data) => {
      if (data?.recoveryHardDeleted?.status?.code === StatusCode.SUCCESS) {
        notification(
          notificationMutationProp(
            data?.recoveryHardDeleted?.status.message,
            EnumSeverity.success,
          ),
        )
        triggerType()
        triggerBrand()
        triggerBranch()
        triggerInventory()
        triggerTrash()
      } else {
        notification(notificationInternalErrorProp('Trash Failed.'))
      }
    },
    onError: () => {
      notification(notificationInternalErrorProp('Trash Failed.'))
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

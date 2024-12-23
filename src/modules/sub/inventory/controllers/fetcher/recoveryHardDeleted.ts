import { useCallback } from 'react'
import {
  EnumDeletedMode,
  EnumDeletedType,
} from '@/core/gql/inventory/recoveryHardDeletedMutation'
import {
  RecoveryHardDeletedResponse,
  RecoveryHardDeletedVariable,
  recoveryHardDeletedMutation,
} from '@/core/gql/inventory/recoveryHardDeletedMutation'
import { ApolloError, useMutation } from '@apollo/client'

type UseRecoveryTrashHandlerPropsType = {
  onCompleted?: (data: RecoveryHardDeletedResponse) => void
  onError?: (error: ApolloError) => void
}

export const recoveryTrash = ({
  onCompleted,
  onError,
}: UseRecoveryTrashHandlerPropsType) => {
  const [recoveryHardDeleted, { loading }] = useMutation<
    RecoveryHardDeletedResponse,
    RecoveryHardDeletedVariable
  >(recoveryHardDeletedMutation, {
    onCompleted,
    onError,
  })

  const recoveryHardDeletedHandler = useCallback(
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
    recoveryHardDeletedHandler,
    recoveryHardDeletedLoading: loading,
  }
}

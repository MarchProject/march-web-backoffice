import { useCallback } from 'react'
import {
  notificationInternalErrorProp,
  notificationMutationProp,
} from '@/core/notification'
import { useMutation } from '@apollo/client'
import { StatusCode } from '@/types/response'
import { EnumSeverity, useNotificationContext } from '@/context/notification'
import {
  UpsertBranchInventoryResponse,
  UpsertBranchInventoryVariables,
  upsertInventoryBranchMutation,
} from '@/core/gql/inventory/upsertBranchInventoryMutation'

interface IUseUpsertBranchHandlerProps {
  triggerBranch: () => void
}

export const useUpsertBranchHandler = ({
  triggerBranch,
}: IUseUpsertBranchHandlerProps) => {
  const { notification } = useNotificationContext()

  const [upsertInventoryBranch, { loading, data: upsertInventoryBranchData }] =
    useMutation<UpsertBranchInventoryResponse, UpsertBranchInventoryVariables>(
      upsertInventoryBranchMutation,
      {
        onCompleted: (data) => {
          if (
            data?.upsertInventoryBranch?.status?.code === StatusCode.SUCCESS
          ) {
            notification(
              notificationMutationProp(
                data?.upsertInventoryBranch?.status.message,
                EnumSeverity.success,
              ),
            )
            triggerBranch()
          } else {
            notification(
              notificationMutationProp(
                data?.upsertInventoryBranch?.status.message,
                EnumSeverity.error,
              ),
            )
          }
        },
        onError: () => {
          notification(notificationInternalErrorProp('Update Failed.'))
        },
      },
    )

  const updateBranchHandle = useCallback(
    (data) => {
      upsertInventoryBranch({
        variables: {
          input: {
            id: data?.id,
            name: data?.name?.trim(),
            description: data?.description?.trim(),
          },
        },
      })
    },
    [upsertInventoryBranch],
  )

  return {
    upsertInventoryBranch,
    updateBranchHandle: updateBranchHandle,
    upsertInventoryBranchLoading: loading,
    upsertInventoryBranchData:
      upsertInventoryBranchData?.upsertInventoryBranch?.data,
  }
}

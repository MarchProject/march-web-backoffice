import { useCallback, useState } from 'react'
import {
  notificationUpdateErrorProp,
  notificationUpdateSuccessProp,
} from '@/core/notification'
import { useMutation } from '@apollo/client'
import { StatusCode } from '@/types/response'
import { useNotificationContext } from '@/context/notification'
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
  const [flagCreate, setFlagCreate] = useState(true)

  const [upsertInventoryBranch, { loading, data: upsertInventoryBranchData }] =
    useMutation<UpsertBranchInventoryResponse, UpsertBranchInventoryVariables>(
      upsertInventoryBranchMutation,
      {
        onCompleted: (data) => {
          if (
            data?.upsertInventoryBranch?.status?.code === StatusCode.SUCCESS
          ) {
            notification(notificationUpdateSuccessProp('branch', flagCreate))
            triggerBranch()
          } else {
            notification(
              notificationUpdateErrorProp(
                'branch',
                flagCreate,
                data?.upsertInventoryBranch?.status?.message,
              ),
            )
          }
        },
        onError: (error) => {
          notification(
            notificationUpdateErrorProp('branch', flagCreate, error?.message),
          )
        },
      },
    )

  const updateBranchHandle = useCallback(
    (data) => {
      if (data?.id) {
        setFlagCreate(false)
      } else {
        setFlagCreate(true)
      }
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

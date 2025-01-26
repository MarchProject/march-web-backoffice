import { useCallback } from 'react'
import { ApolloError, useMutation } from '@apollo/client'
import {
  UpsertBranchInventoryResponse,
  UpsertBranchInventoryVariables,
  upsertInventoryBranchMutation,
} from '@/core/gql/inventory/upsertBranchInventoryMutation'

interface IUseUpsertBranchHandlerProps {
  onCompleted?: (data: UpsertBranchInventoryResponse) => void
  onError?: (error: ApolloError) => void
}

export const upsertInventoryBranch = ({
  onCompleted,
  onError,
}: IUseUpsertBranchHandlerProps) => {
  const [upsertInventoryBranch, { loading, data: upsertInventoryBranchData }] =
    useMutation<UpsertBranchInventoryResponse, UpsertBranchInventoryVariables>(
      upsertInventoryBranchMutation,
      {
        onCompleted,
        onError,
      },
    )

  const updateBranchHandler = useCallback(
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
    updateBranchHandle: updateBranchHandler,
    upsertInventoryBranchLoading: loading,
    upsertInventoryBranchData:
      upsertInventoryBranchData?.upsertInventoryBranch?.data,
  }
}

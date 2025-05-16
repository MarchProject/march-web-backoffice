import {
  UpsertTypeInventoryVariables,
  UpsertTypeInventoryResponse,
  upsertInventoryTypeMutation,
} from '@/core/gql/inventory/upsertTypeInventoryMutation'
import { useCallback } from 'react'
import { ApolloError, useMutation } from '@apollo/client'

interface IUseUpsertTypeHandleProps {
  onCompleted: (data: UpsertTypeInventoryResponse) => void
  onError: (error: ApolloError) => void
}

export const useUpsertInventoryType = ({
  onCompleted,
  onError,
}: IUseUpsertTypeHandleProps) => {
  const [upsertTypeInventory, { data: upsertInventoryTypeData, loading }] =
    useMutation<UpsertTypeInventoryResponse, UpsertTypeInventoryVariables>(
      upsertInventoryTypeMutation,
      {
        onCompleted,
        onError,
      },
    )

  const updateTypeHandle = useCallback(
    (data) => {
      upsertTypeInventory({
        variables: {
          input: {
            id: data?.id,
            name: data?.name?.trim(),
            description: data?.description?.trim(),
          },
        },
      })
    },
    [upsertTypeInventory],
  )

  return {
    upsertInventoryType: upsertTypeInventory,
    updateTypeHandle,
    upsertInventoryTypeLoading: loading,
    upsertInventoryTypeData: upsertInventoryTypeData?.upsertInventoryType?.data,
  }
}

import {
  UpsertBrandInventoryResponse,
  UpsertBrandInventoryVariables,
} from '@/core/gql/inventory/upsertBrandInventoryMutation'
import { upsertInventoryBrandMutation } from '@/core/gql/inventory/upsertBrandInventoryMutation'
import { useCallback } from 'react'
import { ApolloError, useMutation } from '@apollo/client'

interface IUseUpsertBrandHandlerProps {
  onCompleted: (data: UpsertBrandInventoryResponse) => void
  onError: (error: ApolloError) => void
}

export const upsertInventoryBrand = ({
  onCompleted,
  onError,
}: IUseUpsertBrandHandlerProps) => {
  const [upsertBrandInventory, { loading, data: upsertInventoryBrandData }] =
    useMutation<UpsertBrandInventoryResponse, UpsertBrandInventoryVariables>(
      upsertInventoryBrandMutation,
      {
        onCompleted,
        onError,
      },
    )

  const updateBrandHandler = useCallback(
    (data) => {
      upsertBrandInventory({
        variables: {
          input: {
            id: data?.id,
            name: data?.name?.trim(),
            description: data?.description?.trim(),
          },
        },
      })
    },
    [upsertBrandInventory],
  )

  return {
    upsertInventoryBrand: upsertBrandInventory,
    updateBrandHandler,
    upsertInventoryBrandLoading: loading,
    upsertInventoryBrandData:
      upsertInventoryBrandData?.upsertInventoryBrand?.data,
  }
}

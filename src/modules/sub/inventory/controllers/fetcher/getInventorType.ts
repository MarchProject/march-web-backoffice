import {
  GetTypesInventoryResponse,
  GetInventoriesTypeVariables,
  getInventoryTypesQuery,
} from '@/core/gql/inventory/getTypesInventoryQuery'
import { ApolloError, useQuery } from '@apollo/client'

type getInventoryBrandPropsType = {
  onCompleted?: (data: GetTypesInventoryResponse) => void
  onError?: (error: ApolloError) => void
}

export const getInventoryType = ({
  onCompleted,
  onError,
}: getInventoryBrandPropsType) => {
  return useQuery<GetTypesInventoryResponse, GetInventoriesTypeVariables>(
    getInventoryTypesQuery,
    {
      onCompleted,
      onError,
    },
  )
}

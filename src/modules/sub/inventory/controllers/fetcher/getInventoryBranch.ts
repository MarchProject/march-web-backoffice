import {
  GetInventoriesBranchResponse,
  GetBranchsInventoryVariables,
  getInventoryBranchsQuery,
} from '@/core/gql/inventory/getBranchsInventoryQuery'
import { ApolloError, useQuery } from '@apollo/client'

type getInventoryBrandPropsType = {
  onCompleted?: (data: GetInventoriesBranchResponse) => void
  onError?: (error: ApolloError) => void
}

export const useGetInventoryBranch = ({
  onCompleted,
  onError,
}: getInventoryBrandPropsType) => {
  return useQuery<GetInventoriesBranchResponse, GetBranchsInventoryVariables>(
    getInventoryBranchsQuery,
    {
      onCompleted,
      onError,
    },
  )
}

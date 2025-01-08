import {
  GetInventoriesBrandResponse,
  GetBrandInventoryVariables,
  getInventoryBrandsQuery,
} from '@/core/gql/inventory/getBrandsInventoryQuery'
import { ApolloError, useQuery } from '@apollo/client'

type getInventoryBrandPropsType = {
  onCompleted?: (data: GetInventoriesBrandResponse) => void
  onError?: (error: ApolloError) => void
}

export const getInventoryBrand = ({
  onCompleted,
  onError,
}: getInventoryBrandPropsType) => {
  return useQuery<GetInventoriesBrandResponse, GetBrandInventoryVariables>(
    getInventoryBrandsQuery,
    {
      onCompleted,
      onError,
    },
  )
}

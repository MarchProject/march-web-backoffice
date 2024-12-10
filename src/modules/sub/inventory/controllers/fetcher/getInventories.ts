import {
  GetInventoriesResponse,
  GetInventoriesVariables,
  getInventoriesQuery,
} from '@/core/gql/inventory/getInventoriesQuery'
import { ApolloError, useQuery } from '@apollo/client'

type useGetInventoriesPropsType = {
  onCompleted: (data: GetInventoriesResponse) => void
  onError: (error: ApolloError) => void
}

export const useGetInventories = ({
  onCompleted,
  onError,
}: useGetInventoriesPropsType) => {
  return useQuery<GetInventoriesResponse, GetInventoriesVariables>(
    getInventoriesQuery,
    {
      variables: {
        params: {
          limit: 15,
          pageNo: 1,
          search: '',
          favorite: 'DEFAULT',
          type: [],
          brand: [],
          branch: [],
        },
      },
      onCompleted,
      onError,
    },
  )
}

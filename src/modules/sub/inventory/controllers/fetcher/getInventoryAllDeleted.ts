import {
  GetInventoryAllDeletedResponse,
  getInventoryAllDeletedQuery,
} from '@/core/gql/inventory/getInventoryAllDeletedQuery'
import { ApolloError, useQuery } from '@apollo/client'

export type getInventoryAllDeletedPropsType = {
  onCompleted?: (data: GetInventoryAllDeletedResponse) => void
  onError?: (error: ApolloError) => void
}

export const useGetInventoryAllDeleted = ({
  onCompleted,
  onError,
}: getInventoryAllDeletedPropsType) => {
  return useQuery<GetInventoryAllDeletedResponse, any>(
    getInventoryAllDeletedQuery,
    {
      onCompleted,
      onError,
    },
  )
}

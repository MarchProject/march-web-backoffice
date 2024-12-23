import {
  GetInventoryAllDeletedResponse,
  getInventoryAllDeletedQuery,
} from '@/core/gql/inventory/getInventoryAllDeletedQuery'
import { ApolloError, useQuery } from '@apollo/client'

type getInventoryAllDeletedPropsType = {
  onCompleted?: (data: GetInventoryAllDeletedResponse) => void
  onError?: (error: ApolloError) => void
}

export const getInventoryAllDeleted = ({
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

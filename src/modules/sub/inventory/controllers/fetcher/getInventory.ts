import {
  IGetInventoryResponse,
  IGetInventoryVariable,
  getInventoryQuery,
} from '@/core/gql/inventory/getInventoryQuery'
import { ApolloError, useQuery } from '@apollo/client'


export interface IUseQueryInventoryProps {
  idInventory: string
  onCompleted: (data: IGetInventoryResponse) => void
  onError: (error: ApolloError) => void
}

export const getInventory = ({
  idInventory,
  onCompleted,
  onError
}: IUseQueryInventoryProps) => {
    return  useQuery<IGetInventoryResponse, IGetInventoryVariable>(
      getInventoryQuery,
      {
        variables: { id: idInventory },
        onCompleted,
        onError,
      }
    )
}

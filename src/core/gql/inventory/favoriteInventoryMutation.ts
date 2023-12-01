import { ResponseData } from '@/types/response'
import { gql } from '@apollo/client'

export const favoriteInventoryMutation = gql`
  mutation favoriteInventory($id: String!) {
    favoriteInventory(id: $id) {
      data {
        id
      }
      status {
        code
        message
      }
    }
  }
`
type FavoriteInventoryType = {
  id?: string
}

export type FavoriteInventoryResponse = {
  favoriteInventory: ResponseData<FavoriteInventoryType>
}

export type FavoriteInventoryVariables = {
  id: string
}

import { ResponseData } from '@/types/response'
import { gql } from '@apollo/client'

export const deleteBrandInventoryMutation = gql`
  mutation deleteBrandInventory($id: String!) {
    deleteBrandInventory(id: $id) {
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
export type DeleteBrandInventoryVariables = {
  id: string
}

export type DeleteBrandInventoryType = {
  id?: string
}

export type DeleteBrandInventoryResponse = {
  deleteBrandInventory: ResponseData<DeleteBrandInventoryType>
}

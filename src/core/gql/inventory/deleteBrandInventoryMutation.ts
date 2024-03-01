import { ResponseData } from '@/types/response'
import { gql } from '@apollo/client'

export const deleteInventoryBrandMutation = gql`
  mutation deleteInventoryBrand($id: String!) {
    deleteInventoryBrand(id: $id) {
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
  deleteInventoryBrand: ResponseData<DeleteBrandInventoryType>
}

import { ResponseData } from '@/types/response'
import { gql } from '@apollo/client'

export const deleteInventoryTypeMutation = gql`
  mutation deleteInventoryType($id: String!) {
    deleteInventoryType(id: $id) {
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
export type DeleteTypeInventoryVariables = {
  id: string
}

export type DeleteTypeInventoryType = {
  id?: string
}

export type DeleteTypeInventoryResponse = {
  deleteInventoryType: ResponseData<DeleteTypeInventoryType>
}

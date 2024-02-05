import { ResponseData } from '@/types/response'
import { gql } from '@apollo/client'

export const deleteInventoryMutation = gql`
  mutation deleteInventory($id: String!) {
    deleteInventory(id: $id) {
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
export type DeleteInventoryVariables = {
  id: string
}

export type DeleteInventoryType = {
  id?: string
}

export type DeleteInventoryData = {
  deleteInventory: ResponseData<DeleteInventoryType>
}

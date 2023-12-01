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
export type DeleteTypeDataVariables = {
  id: string
}

export type DeleteInventory = {
  id?: string
}

export type DeleteInventoryData = {
  deleteInventory: ResponseData<DeleteInventory>
}

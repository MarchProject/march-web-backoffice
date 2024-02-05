import { ResponseData } from '@/types/response'
import { gql } from '@apollo/client'

export const deleteTypeInventoryMutation = gql`
  mutation deleteTypeInventory($id: String!) {
    deleteTypeInventory(id: $id) {
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
  deleteTypeInventory: ResponseData<DeleteTypeInventoryType>
}

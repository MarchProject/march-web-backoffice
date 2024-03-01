import { ResponseData } from '@/types/response'
import { gql } from '@apollo/client'

export const deleteInventoryBranchMutation = gql`
  mutation deleteInventoryBranch($id: String!) {
    deleteInventoryBranch(id: $id) {
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
export type DeleteBranchInventoryVariables = {
  id: string
}

export type DeleteBranchInventoryType = {
  id?: string
}

export type DeleteBranchInventoryResponse = {
  deleteInventoryBranch: ResponseData<DeleteBranchInventoryType>
}

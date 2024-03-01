import { ResponseData } from '@/types/response'
import { gql } from '@apollo/client'

export const upsertInventoryBranchMutation = gql`
  mutation upsertInventoryBranch($input: UpsertInventoryBranchInput!) {
    upsertInventoryBranch(input: $input) {
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

export type UpsertBranchInventoryVariables = {
  input: {
    id?: string
    name: string
    description?: string
    createdBy?: string
  }
}

export type UpsertBranchInventoryType = {
  id?: string
}

export type UpsertBranchInventoryResponse = {
  upsertInventoryBranch: ResponseData<UpsertBranchInventoryType>
}

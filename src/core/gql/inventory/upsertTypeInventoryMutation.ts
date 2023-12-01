import { ResponseData } from '@/types/response'
import { gql } from '@apollo/client'

export const upsertTypeInventoryMutation = gql`
  mutation upsertTypeInventory($input: UpsertTypeInventoryInput!) {
    upsertTypeInventory(input: $input) {
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
export type UpsertTypeInventoryType = {
  id?: string
}

export type UpsertTypeInventoryResponse = {
  upsertTypeInventory: ResponseData<UpsertTypeInventoryType>
}

export type UpsertTypeInventoryVariables = {
  input: {
    id?: string
    name: string
    description?: string
    createdBy?: string
  }
}

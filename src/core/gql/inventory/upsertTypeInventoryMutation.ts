import { ResponseData } from '@/types/response'
import { gql } from '@apollo/client'

export const upsertInventoryTypeMutation = gql`
  mutation upsertInventoryType($input: UpsertInventoryTypeInput!) {
    upsertInventoryType(input: $input) {
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
  upsertInventoryType: ResponseData<UpsertTypeInventoryType>
}

export type UpsertTypeInventoryVariables = {
  input: {
    id?: string
    name: string
    description?: string
    createdBy?: string
  }
}

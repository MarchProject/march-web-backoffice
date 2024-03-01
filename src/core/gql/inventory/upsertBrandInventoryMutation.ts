import { ResponseData } from '@/types/response'
import { gql } from '@apollo/client'

export const upsertInventoryBrandMutation = gql`
  mutation upsertInventoryBrand($input: UpsertInventoryBrandInput!) {
    upsertInventoryBrand(input: $input) {
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

export type UpsertBrandInventoryVariables = {
  input: {
    id?: string
    name: string
    description?: string
    createdBy?: string
  }
}

export type UpsertBrandInventoryType = {
  id?: string
}

export type UpsertBrandInventoryResponse = {
  upsertInventoryBrand: ResponseData<UpsertBrandInventoryType>
}

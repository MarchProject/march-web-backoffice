import { gql } from '@apollo/client'
import { UpsertInventoryData } from './inventory'
import { ResponseData } from '@/types/response'

export type UpsertInventoryTypeVariables = {
  input: UpsertInventoryData
}

export type UpsertInventoryTypeData = {
  upsertInventory: ResponseData<UpsertInventoryTypes>
}

export type UpsertInventoryTypes = {
  id: string
}

export const upsertInventoryMutation = gql`
  mutation upsertInventory($input: UpsertInventoryInput!) {
    upsertInventory(input: $input) {
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

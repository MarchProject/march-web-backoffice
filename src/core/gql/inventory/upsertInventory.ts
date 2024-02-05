import { gql } from '@apollo/client'
import { ResponseData } from '@/types/response'

export type UpsertInventoryTypeVariables = {
  input: UpsertInventoryData
}

export type UpsertInventoryTypeResponse = {
  upsertInventory: ResponseData<UpsertInventoryTypes>
}

export type UpsertInventoryTypes = {
  id: string
}

export type UpsertInventoryData = {
  id?: string
  name: string
  amount: number
  price: number
  sku?: string
  favorite?: boolean
  size?: {
    width?: number
    length?: number
    height?: number
    weight?: number
  }
  priceMember?: number
  reorderLevel?: number
  description?: string
  createdBy?: string
  inventoryTypeId: string
  brandTypeId: string
  expiryDate?: string
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

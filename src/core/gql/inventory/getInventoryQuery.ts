import { ResponseData } from '@/types/response'
import { gql } from '@apollo/client'

export interface IGetInventoryResponse {
  getInventory: ResponseData<any>
}
export interface IGetInventoryVariable {
  id: string
}

export const getInventoryQuery = gql`
  query getInventory($id: String) {
    getInventory(id: $id) {
      data {
        id
        name
        amount
        sold
        price
        sku
        size
        favorite
        priceMember
        reorderLevel
        inventoryType {
          id
          name
        }
        brandType {
          id
          name
        }
        description
        expiryDate
        createdBy
        createdAt
        updatedBy
        updatedAt
      }
      status {
        code
        message
      }
    }
  }
`

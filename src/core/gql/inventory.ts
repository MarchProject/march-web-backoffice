import { gql } from '@apollo/client'

export type GetInventoriesData = {
  getInventories: InventoriesData[]
}

export type InventoriesData = {
  id: string
  name: string
  amount: number
  inventoryType: {
    name: string
  }
  brandType: {
    name: string
  }
  description: string
  createdBy: string
  createdAt: string
  updatedBy: string
  updatedAt: string
}

export type GetInventoriesVariables = {
  params: {
    search: string
    limit: number
    offset: number
  }
}

export const getInventoriesQuery = gql`
  query getInventories($params: ParamsInventory!) {
    getInventories(params: $params) {
      id
      name
      amount
      sold
      price
      inventoryType {
        name
      }
      brandType {
        name
      }
      description
      createdBy
      expiryDate
      createdAt
      updatedBy
      updatedAt
    }
  }
`

import { gql } from '@apollo/client'

export type GetInventoriesData = {
  getInventories: InventoriesResponse
}

export type InventoriesResponse = {
  inventories: InventoriesData[]
  pageNo: number
  pageLimit: number
  totalPage: number
  totalRow: number
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
    search?: string
    limit?: number
    type?: string[]
    brand?: string[]
    pageNo?: number
  }
}

export const getInventoriesQuery = gql`
  query getInventories($params: ParamsInventory!) {
    getInventories(params: $params) {
      inventories {
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
        expiryDate
        createdBy
        createdAt
        updatedBy
        updatedAt
      }
      pageNo
      pageLimit
      totalPage
      totalRow
    }
  }
`
export type GetInventoriesTypeData = {
  getInventoryTypes: GetInventoryTypes[]
}

export type GetInventoryTypes = {
  id: string
  name: string
  description: string
  createdBy: string
  createdAt: string
  updatedBy: string
  updatedAt: string
}
export type GetInventoriesTypeVariables = {
  params: {
    search: string
    limit: number
    offset: number
  }
}
export const getInventoriesTypeQuery = gql`
  query getInventoryTypes($params: ParamsInventoryType!) {
    getInventoryTypes(params: $params) {
      id
      name
      # description
      # createdBy
      # createdAt
      # updatedBy
      # updatedAt
    }
  }
`

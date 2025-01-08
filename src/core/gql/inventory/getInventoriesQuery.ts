import { ResponseData } from '@/types/response'
import { gql } from '@apollo/client'

export const getInventoriesQuery = gql`
  query getInventories($params: ParamsInventory!) {
    getInventories(params: $params) {
      data {
        inventories {
          id
          name
          amount
          sold
          price
          sku
          serialNumber
          size
          favorite
          priceMember
          reorderLevel
          inventoryType {
            id
            name
          }
          inventoryBrand {
            id
            name
          }
          inventoryBranch {
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
        pageNo
        pageLimit
        totalPage
        totalRow
      }
      status {
        code
        message
      }
    }
  }
`

export type GetInventoriesResponse = {
  getInventories: ResponseData<GetInventoriesType>
}

export type GetInventoriesVariables = {
  params: {
    search?: string
    limit?: number
    type?: string[]
    favorite?: IFavoriteStatus
    brand?: string[]
    branch?: string[]
    pageNo?: number
  }
}

export type GetInventoriesType = {
  inventories: InventoriesData[]
  pageNo: number
  pageLimit: number
  totalPage: number
  totalRow: number
}

export type InventoriesData = {
  id: string
  name: string
  sold: number
  price: number
  sku: string
  serialNumber: string
  reorderLevel: number
  size: string
  favorite: boolean
  priceMember: number
  inventoryType: {
    id: string
    name: string
  }
  inventoryBrand: {
    id: string
    name: string
  }
  inventoryBranch: {
    id: string
    name: string
  }
  description: string
  expiryDate: string
  amount: number
  createdBy: string
  createdAt: string
  updatedBy: string
  updatedAt: string
}

export type IFavoriteStatus = 'LIKE' | 'DEFAULT'

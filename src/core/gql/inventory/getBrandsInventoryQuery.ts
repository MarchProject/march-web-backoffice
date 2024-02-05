import { ResponseData } from '@/types/response'
import { gql } from '@apollo/client'

export type GetInventoriesBrandResponse = {
  getBrandsInventory: ResponseData<GetBrandsInventoryType[]>
}

export type GetBrandsInventoryType = {
  id: string
  name: string
  description: string
  createdBy: string
  createdAt: string
  updatedBy: string
  updatedAt: string
}

export type GetBrandInventoryVariables = {
  params?: {
    search?: string
    limit?: number
    offset?: number
  }
}

export const getBrandsInventoryQuery = gql`
  query getBrandsInventory($params: ParamsInventoryBrand) {
    getBrandsInventory(params: $params) {
      data {
        id
        name
        description
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

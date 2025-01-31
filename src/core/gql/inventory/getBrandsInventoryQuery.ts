import { ResponseData } from '@/types/response'
import { gql } from '@apollo/client'

export type GetInventoriesBrandResponse = {
  getInventoryBrands: ResponseData<GetBrandsInventoryType[]>
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

export const getInventoryBrandsQuery = gql`
  query getInventoryBrands($params: ParamsInventoryBrand) {
    getInventoryBrands(params: $params) {
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

import { ResponseData } from '@/types/response'
import { gql } from '@apollo/client'

export type GetInventoriesBrandData = {
  getBrandTypes: ResponseData<GetInventoryBrand[]>
}

export type GetInventoryBrand = {
  id: string
  name: string
  description: string
  createdBy: string
  createdAt: string
  updatedBy: string
  updatedAt: string
}
export type GetInventoriesBrandVariables = {
  params?: {
    search?: string
    limit?: number
    offset?: number
  }
}

export const getInventoriesBrandQuery = gql`
  query getBrandTypes($params: ParamsInventoryBrand) {
    getBrandTypes(params: $params) {
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

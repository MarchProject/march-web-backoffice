import { ResponseData } from '@/types/response'
import { gql } from '@apollo/client'

export const getInventoryTypesQuery = gql`
  query getInventoryTypes($params: ParamsInventoryType) {
    getInventoryTypes(params: $params) {
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
export type GetTypesInventoryResponse = {
  getInventoryTypes: ResponseData<GetTypesInventoryType[]>
}

export type GetTypesInventoryType = {
  id?: string
  name: string
  _name?: string
  description: string
  createdBy: string
  createdAt: string
  updatedBy: string
  updatedAt: string
}
export type GetInventoriesTypeVariables = {
  params?: {
    search?: string
    limit?: number
    offset?: number
  }
}

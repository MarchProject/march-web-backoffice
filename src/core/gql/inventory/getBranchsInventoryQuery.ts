import { ResponseData } from '@/types/response'
import { gql } from '@apollo/client'

export type GetInventoriesBranchResponse = {
  getInventoryBranchs: ResponseData<GetBranchsInventoryType[]>
}

export type GetBranchsInventoryType = {
  id: string
  name: string
  description: string
  createdBy: string
  createdAt: string
  updatedBy: string
  updatedAt: string
}

export type GetBranchsInventoryVariables = {
  params?: {
    search?: string
    limit?: number
    offset?: number
  }
}

export const getInventoryBranchsQuery = gql`
  query getInventoryBranchs($params: ParamsInventoryBranch) {
    getInventoryBranchs(params: $params) {
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

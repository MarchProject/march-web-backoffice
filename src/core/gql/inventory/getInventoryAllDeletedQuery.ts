import { ResponseData } from '@/types/response'
import { gql } from '@apollo/client'

export type IDeletedInventory = {
  id: string
  name: string
  createdBy: string
  updatedBy: string
  updatedAt: string
  createdAt: string
}

export type GetInventoryAllDeletedType = {
  inventory: IDeletedInventory[]
  brand: IDeletedInventory[]
  type: IDeletedInventory[]
  branch: IDeletedInventory[]
}

export type GetInventoryAllDeletedResponse = {
  getInventoryAllDeleted: ResponseData<GetInventoryAllDeletedType>
}

export const getInventoryAllDeletedQuery = gql`
  query getInventoryAllDeleted {
    getInventoryAllDeleted {
      data {
        inventory {
          id
          name
          createdBy
          updatedBy
          updatedAt
          createdAt
        }
        brand {
          id
          name
          createdBy
          updatedBy
          updatedAt
          createdAt
        }
        branch {
          id
          name
          createdBy
          updatedBy
          updatedAt
          createdAt
        }
        type {
          id
          name
          createdBy
          updatedBy
          updatedAt
          createdAt
        }
      }
      status {
        code
        message
      }
    }
  }
`

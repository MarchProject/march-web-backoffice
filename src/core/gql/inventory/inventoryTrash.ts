import { gql } from '@apollo/client'
import { type } from 'os'

type IDeletedInventory = {
  id: string
  name: string
  createdBy: string
  updatedBy: string
  updatedAt: string
  createdAt: string
}

export type GetInventoryAllDeletedData = {
  getInventoryAllDeleted: {
    inventory: IDeletedInventory[]
    brand: IDeletedInventory[]
    type: IDeletedInventory[]
  }
}

export const getInventoryAllDeletedQuery = gql`
  query getInventoryAllDeleted {
    getInventoryAllDeleted {
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
      type {
        id
        name
        createdBy
        updatedBy
        updatedAt
        createdAt
      }
    }
  }
`

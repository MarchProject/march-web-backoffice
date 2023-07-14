import { gql } from '@apollo/client'

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
export enum EnumDeletedType {
  inventory = 'inventory',
  inventoryType = 'inventoryType',
  brandType = 'brandType',
}

export enum EnumDeletedMode {
  RECOVERY = 'RECOVERY',
  DELETE = 'DELETE',
}

export type RecoveryHardDeletedData = {
  recoveryHardDeleted: {
    id: string
    type: EnumDeletedType
    mode: EnumDeletedMode
  }
}

export type RecoveryHardDeletedVariable = {
  input: {
    id: string
    type: EnumDeletedType
    mode: EnumDeletedMode
  }
}

export const recoveryHardDeletedMutation = gql`
  mutation recoveryHardDeleted($input: RecoveryHardDeletedInput!) {
    recoveryHardDeleted(input: $input) {
      id
      type
      mode
    }
  }
`

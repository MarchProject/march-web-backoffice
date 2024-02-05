import { gql } from '@apollo/client'
import { ResponseData } from '@/types/response'

export enum EnumDeletedType {
  inventory = 'inventory',
  inventoryType = 'inventoryType',
  brandType = 'brandType',
}

export enum EnumDeletedMode {
  RECOVERY = 'RECOVERY',
  DELETE = 'DELETE',
}

export const recoveryHardDeletedMutation = gql`
  mutation recoveryHardDeleted($input: RecoveryHardDeletedInput!) {
    recoveryHardDeleted(input: $input) {
      data {
        id
        type
        mode
      }
      status {
        code
        message
      }
    }
  }
`

export type RecoveryHardDeletedType = {
  id: string
  type: EnumDeletedType
  mode: EnumDeletedMode
}

export type RecoveryHardDeletedResponse = {
  recoveryHardDeleted: ResponseData<RecoveryHardDeletedType>
}

export type RecoveryHardDeletedVariable = {
  input: {
    id: string
    type: EnumDeletedType
    mode: EnumDeletedMode
  }
}

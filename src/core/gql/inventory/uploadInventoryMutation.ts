import { gql } from '@apollo/client'
import { UpsertInventoryData } from './upsertInventory'
import { ResponseData } from '@/types/response'

export const uploadInventoryMutation = gql`
  mutation uploadInventory($input: UploadInventoryInput!) {
    uploadInventory(input: $input) {
      id
      success
      reason
    }
  }
`
type UploadInventoryType = {
  id: string
  success: boolean
  reason: string
}

export type UploadInventoryResponse = {
  uploadInventory: ResponseData<UploadInventoryType>
}

export type UploadInventoryVariable = {
  input: {
    uploadDatas: UpsertInventoryData[]
    fileName: string
  }
}

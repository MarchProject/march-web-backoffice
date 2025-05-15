import { ResponseData } from '@/types/response'
import { gql } from '@apollo/client'

export const uploadInventoryMutation = gql`
  mutation uploadInventory($file: Upload!) {
    uploadInventory(file: $file) {
      data {
        id
        data {
          data {
            id
            name
            type
            brand
            branch
            favorite
            amount
            sku
            serialNumber
            reorderLevel
            weight
            width
            height
            length
            price
            priceMember
            expiryDate
            description
          }
          isValid
          message {
            name
            message
          }
        }
        success
        reason
      }
      status {
        code
        message
      }
    }
  }
`
export type UploadCSVType = {
  id: string
  success: boolean
  reason: string
}

export type UploadCSVResponse = {
  uploadInventory: ResponseData<UploadCSVType>
}

export type UploadCSVRequest = {
  file: File
}

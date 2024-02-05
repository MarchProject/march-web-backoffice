import { ResponseData } from '@/types/response'
import { gql } from '@apollo/client'

export const getInventoryNamesQuery = gql`
  query getInventoryNames {
    getInventoryNames {
      data {
        id
        name
      }
      status {
        code
        message
      }
    }
  }
`

export type InventoryNamesType = {
  id: string
  name: string
}

export type InventoryNamesResponse = {
  getInventoryNames: ResponseData<InventoryNamesType[]>
}

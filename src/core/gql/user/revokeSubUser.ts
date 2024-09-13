import { ResponseData } from '@/types/response'
import { gql } from '@apollo/client'

export const revokeSubUserMutation = gql`
  mutation revokeSubUser($userId: String) {
    revokeSubUser(userId: $userId) {
      data {
        id
      }
      status {
        code
        message
      }
    }
  }
`

export type RevokeSubUserResponse = {
  revokeSubUser: ResponseData<RevokeSubUserType>
}

export type RevokeSubUserVariables = {
  userId: string
}

export type RevokeSubUserType = {
  id?: string
}

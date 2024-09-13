import { ResponseData } from '@/types/response'
import { gql } from '@apollo/client'

export const createSubUserMutation = gql`
  mutation createSubUser($input: ParamsCreateSubUser) {
    createSubUser(input: $input) {
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

export type CreateSubUserResponse = {
  createSubUser: ResponseData<CreateSubUserType>
}

export type CreateSubUserVariables = {
  input: {
    role: string
    firstname: string
    lastname: string
    description: string
    email: string
  }
}

export type CreateSubUserType = {
  id?: string
}

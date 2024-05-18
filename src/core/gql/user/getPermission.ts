import { ResponseData } from '@/types/response'
import { gql } from '@apollo/client'

export const getPermissionQuery = gql`
  query getPermission {
    getPermission {
      status {
        message
        code
      }
      data {
        shop {
          id
          name
          description
          createdBy
          updatedBy
          createdAt
          updatedAt
          groups {
            id
            name
            groupFunctions {
              id
              name
              functionId
              groupId
              create
              view
              update
            }
            groupTasks {
              id
              name
              groupId
              taskId
              shopsId
              createdBy
              updatedBy
              createdAt
              updatedAt
            }
          }
          users {
            id
            role
            shopsId
            username
            picture
            email
            createdBy
            isSuperAdmin
            isRegistered
          }
        }
        functions {
          id
          name
        }
        tasks {
          id
          name
          functionId
          description
        }
      }
    }
  }
`

export type GetPermissionResponse = {
  getPermission: ResponseData<any>
}

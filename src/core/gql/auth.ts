import { gql } from '@apollo/client'

export const signinMutation = gql`
  mutation signIn($username: String!, $password: String!) {
    signIn(username: $username, password: $password) {
      access_token
      refresh_token
      userId
      username
    }
  }
`

export const signOutMutation = gql`
  mutation signOut($id: String!) {
    signOut(id: $id) {
      id
    }
  }
`

export const verifyAccessTokenMutation = gql`
  mutation verifyAccessToken($token: String!) {
    verifyAccessToken(token: $token) {
      success
    }
  }
`


export const tokenExpireMutation = gql`
  mutation tokenExpire($refreshToken: String!) {
    tokenExpire(refreshToken: $refreshToken) {
      access_token
    }
  }
`

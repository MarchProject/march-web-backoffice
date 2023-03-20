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

export const verifyAccessTokenMutation = gql`
  mutation verifyAccessToken($token: String!) {
    verifyAccessToken(token: $token) {
      success
    }
  }
`

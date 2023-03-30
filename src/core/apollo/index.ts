import {
  ApolloClient,
  FetchResult,
  HttpLink,
  InMemoryCache,
  split,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { Observable, getMainDefinition } from '@apollo/client/utilities'
import { WebSocketLink } from '@apollo/client/link/ws'
import * as clientConfig from '../../config/client'
import { onError } from '@apollo/client/link/error'
import { GraphQLError } from 'graphql'
import { tokenExpireMutation } from '../gql/auth'
/**
 * working on cient-side only
 */

/**
 *
 * @NOTE
 *
 * ISSUES:
 * graphql subscription does not work with the error
 * `WebSocket connection to 'ws://0.0.0.0:4000/backoffice/subscription' failed: Invalid frame header`
 * set reconnect to false to prevent reconnection
 *
 */
export async function initApollo(uri?: string) {
  const basePath = process.env.basePath
  const _uri = uri || process.env.coreApiUrl
  console.log({ _uri })
  const wsUri = _uri.replace(/^http/, 'ws')
  const accessToken = clientConfig.getAccessToken()
  const reconnect = !wsUri.startsWith(
    `${window.origin.replace(/^http/, 'ws')}${basePath}`,
  )
  console.log({ accessTokenAPL: accessToken })
  const wsLink = new WebSocketLink({
    uri: wsUri,
    options: {
      reconnect,
      connectionParams: {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
      timeout: 30000,
    },
  })

  const errorLink = onError(
    ({ graphQLErrors, networkError, operation, forward }: any) => {
      if (graphQLErrors) {
        for (let err of graphQLErrors) {
          switch (err.extensions.exception?.message) {
            case 'Unauthorized':
              // ignore 401 error for a refresh request
              if (operation.operationName === 'tokenExpire') return

              const observable = new Observable<
                FetchResult<Record<string, any>>
              >((observer) => {
                // used an annonymous function for using an async function
                ;(async () => {
                  try {
                    console.log('heavenus')
                    const accessToken = await refreshToken()

                    if (!accessToken) {
                      throw new GraphQLError('Empty AccessToken')
                    }
                    const oldHeaders = operation.getContext().headers

                    // modify the operation context with a new token
                    operation.setContext({
                      headers: {
                        ...oldHeaders,
                        authorization: `Bearer ${accessToken}`,
                      },
                    })
                    operation.setContext({
                      headers: {
                        authorization: accessToken
                          ? `Bearer ${accessToken}`
                          : '',
                      },
                    })

                    const newHeaders = operation.getContext().headers
                    console.log({ new: accessToken, operation, newHeaders })
                    // Retry the failed request
                    const subscriber = {
                      next: observer.next.bind(observer),
                      error: observer.error.bind(observer),
                      complete: observer.complete.bind(observer),
                    }

                    forward(operation).subscribe(subscriber);
                  } catch (err) {
                    observer.error(err)
                  }
                })()
              })

              return observable
          }
        }
      }

      if (networkError) console.log(`[Network error]: ${networkError}`)
    },
  )

  const httpLink = new HttpLink({
    uri: _uri,
    credentials: 'same-origin',
  })

  const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query)
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      )
    },
    wsLink,
    httpLink,
  )

  const authLink = setContext((_, { headers }) => {
    console.log('newauth')
    let _headers = {
      ...headers,
    }

    if (accessToken) {
      _headers = Object.assign({}, _headers, {
        authorization: `Bearer ${accessToken}`,
      })
    }

    console.log({ _headers })

    return {
      headers: _headers,
    }
  })

  const client = new ApolloClient({
    link: authLink.concat(errorLink).concat(httpLink),
    // ApolloLink.from([errorLink, httpLink, authLink]),
    // uri: uri,
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'ignore',
      },
      query: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'all',
      },
      mutate: {
        errorPolicy: 'all',
      },
    },
  })

  const refreshToken = async () => {
    const refresh_token = clientConfig.getRefreshToken()
    try {
      const refreshResolverResponse = await client.mutate<{
        tokenExpire: {
          access_token: string
        }
      }>({
        variables: {
          refreshToken: refresh_token,
        },
        mutation: tokenExpireMutation,
      })

      const accessToken = refreshResolverResponse.data?.tokenExpire.access_token
      localStorage.setItem('march.backOffice.accessToken', accessToken || '')
      return accessToken
    } catch (err) {
      console.log({ err })
      localStorage.clear()
      throw err
    }
  }

  return client
}

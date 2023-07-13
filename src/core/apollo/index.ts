import {
  ApolloClient,
  FetchResult,
  HttpLink,
  InMemoryCache,
  // split,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import {
  Observable,
  // getMainDefinition
} from '@apollo/client/utilities'
// import { WebSocketLink } from '@apollo/client/link/ws'
import * as clientConfig from '../../config/client'
import { onError } from '@apollo/client/link/error'
import { GraphQLError } from 'graphql'
import { tokenExpireMutation } from '../gql/auth'
import router from 'next/router'
import Cookies from 'js-cookie'
import { GraphQLClient } from 'graphql-request'
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
  const authPath = process.env.authApiUrl
  const _uri = uri || authPath
  const wsUri = _uri?.replace(/^http/, 'ws')
  const accessToken = clientConfig.getAccessToken()
  const reconnect = !wsUri.startsWith(
    `${window.origin.replace(/^http/, 'ws')}${basePath}`,
  )
  console.log({ reconnect })
  // const wsLink = new WebSocketLink({
  //   uri: wsUri,
  //   options: {
  //     reconnect,
  //     connectionParams: {
  //       headers: {
  //         Authorization: `Bearer ${accessToken}`,
  //       },
  //     },
  //     timeout: 30000,
  //   },
  // })
  const unAuthorizeHandle = () => {
    localStorage.setItem('march.backOffice.authFailed', 'true')
    Cookies.remove('mbo-token')
    Cookies.remove('mbo-refresh')
    router.push({
      pathname: clientConfig.getDefaultLoginPath(),
    })
  }

  const errorLink = onError((errorHandler: any) => {
    const { graphQLErrors, networkError, operation, forward } = errorHandler
    if (graphQLErrors) {
      for (let err of graphQLErrors) {
        switch (err.extensions.exception?.message) {
          case 'Unauthorized':
            // ignore 401 error for a refresh request
            if (operation.operationName === 'tokenExpire') {
              localStorage.setItem('march.backOffice.authFailed', 'true')
              Cookies.remove('mbo-token')
              Cookies.remove('mbo-refresh')
              router.push({
                pathname: clientConfig.getDefaultLoginPath(),
              })
              return
            }
            const observable = new Observable<FetchResult<Record<string, any>>>(
              (observer) => {
                // used an annonymous function for using an async function
                ;(async () => {
                  try {
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
                    // console.log({ newHeaders })
                    // Retry the failed request
                    const subscriber = {
                      next: observer.next.bind(observer),
                      error: observer.error.bind(observer),
                      complete: observer.complete.bind(observer),
                    }

                    forward(operation).subscribe(subscriber)
                    router.reload()
                  } catch (err) {
                    unAuthorizeHandle()
                    // observer.error(err)
                  }
                })()
              },
            )

            return observable
          case 'Unauthorized ShopId':
            unAuthorizeHandle()
          case 'Unauthorized Role':
            unAuthorizeHandle()
          case 'Unauthorized Device':
            unAuthorizeHandle()
        }
      }
    }

    if (networkError) console.log(`[Network error]: ${networkError}`)
  })

  const httpLink = new HttpLink({
    uri: _uri,
    credentials: 'same-origin',
  })

  // const splitLink = split(
  //   ({ query }) => {
  //     const definition = getMainDefinition(query)
  //     return (
  //       definition.kind === 'OperationDefinition' &&
  //       definition.operation === 'subscription'
  //     )
  //   },
  //   wsLink,
  //   httpLink,
  // )

  const authLink = setContext((_, { headers }) => {
    // console.log('newauth')
    let _headers = {
      ...headers,
    }

    if (accessToken) {
      _headers = Object.assign({}, _headers, {
        authorization: `Bearer ${accessToken}`,
      })
    }

    // console.log({ _headers })

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
        errorPolicy: 'all',
      },
      query: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'ignore',
      },
      mutate: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'all',
      },
    },
  })

  const refreshToken = async () => {
    const refresh_token = clientConfig.getRefreshToken()
    const authApiUrl = clientConfig.getAuthApiUrl()
    const graphQLClient = new GraphQLClient(authApiUrl, {
      // headers: {
      //   authorization: `Bearer ${ctx.accessToken}`,
      // },
    })
    try {
      try {
        const response = await graphQLClient.request<{
          tokenExpire: {
            access_token: string
          }
        }>(tokenExpireMutation, { refreshToken: refresh_token })

        const accessToken = response?.tokenExpire?.access_token
        localStorage.setItem('march.backOffice.accessToken', accessToken || '')
        return accessToken
      } catch (error) {
        console.log('error', { error })
        clientConfig.removeAccessToken()
        clientConfig.removeRefreshToken()
      }

      // const refreshResolverResponse = await client.mutate<{
      //   tokenExpire: {
      //     access_token: string
      //   }
      // }>({
      //   variables: {
      //     refreshToken: refresh_token,
      //   },
      //   mutation: tokenExpireMutation,
      // })
    } catch (err) {
      console.log({ err })
      // localStorage.clear()
      clientConfig.removeAccessToken()
      clientConfig.removeRefreshToken()
      throw err
    }
  }

  return client
}

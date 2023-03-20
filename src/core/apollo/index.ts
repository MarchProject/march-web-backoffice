import { ApolloClient, HttpLink, InMemoryCache, split } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { getMainDefinition } from '@apollo/client/utilities'
import { WebSocketLink } from '@apollo/client/link/ws'
import * as clientConfig from '../../config/client'

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
  const _uri = uri || `${window.origin}${basePath}/graphql`
  const wsUri = _uri.replace(/^http/, 'ws')
  const accessToken = clientConfig.getAccessToken()
  // const accessToken = null
  const reconnect = !wsUri.startsWith(
    `${window.origin.replace(/^http/, 'ws')}${basePath}`,
  )

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
    link: authLink.concat(splitLink),
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
    },
  })

  return client
}

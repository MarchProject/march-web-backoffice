import { Route } from '../common/types'

export const azureAdLoginPath = '/login'

export function getLoginRoute(): Route {
  const logPrefix = 'router.constant'

  const defaultLoginPath = global?.config?.defaultLoginPath
  const uamLoginEnabled = global?.config?.uamLoginEnabled
  const loginPath = !uamLoginEnabled
    ? azureAdLoginPath
    : defaultLoginPath || azureAdLoginPath

  console.log(logPrefix, { loginPath,defaultLoginPath,uamLoginEnabled })

  return {
    path: loginPath,
    regex: /(\/(en|th)|)\/user\/login/,
  }
}

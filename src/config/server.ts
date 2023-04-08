import { ClientConfig, ServerConfig } from '../types/config'
import * as _ from 'lodash'

const prefix = 'MARCH_BO_'

function toInt(value: string, defaultValue: number): number {
  return Number.parseInt(value || defaultValue.toString()) || defaultValue
}

function toBoolean(value: string): boolean {
  return (value || 'false').toLowerCase() === 'true'
}

export function init(env: NodeJS.ProcessEnv): ServerConfig {
  let rawConfig: any = {
    nodeEnv: process.env.NODE_ENV,
    //     port: env.MOM_AND_POP_BO_PORT
  }

  Object.keys(env)
    //
    .filter((key) => key.startsWith(prefix))
    .forEach((key) => {
      rawConfig[_.camelCase(key.replace(/MARCH_BO_/g, ''))] =
        process.env[key]
      console.log({ rawConfig })
    })
  console.log({ rawConfig })

  const {
    //
    nodeEnv,
    port,
    uamLoginEnabled,
    defaultLoginPath,
    coreApiUrl,
    azureAdAuthority,
    azureAdClientid,
  } = rawConfig

  const config: ServerConfig = {
    development: (nodeEnv || 'production').toLowerCase() === 'development',
    port: toInt(port, 4000),
    uamLoginEnabled: toBoolean(uamLoginEnabled),
    defaultLoginPath: String(defaultLoginPath),
    coreApiUrl: String(coreApiUrl),
    azureAdClientid: String(azureAdClientid),
    azureAdAuthority: String(azureAdAuthority),
  }
  console.log({ config })

  return config
}

export function toClientConfig(): ClientConfig {
  const { development, coreApiUrl, defaultLoginPath } =
    global.config as ServerConfig

  console.log('clientConfig', {
    development,
    coreApiUrl,
    defaultLoginPath
  })

  return {
    development,
    defaultLoginPath,
    coreApiUrl,
  }
}

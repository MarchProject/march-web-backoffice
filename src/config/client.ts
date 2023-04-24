/**
 *
 * Client side config/store for web
 * init values after login succeed
 *
 */

import { Credential } from '../types/uam'

const prefix = 'march.backOffice'

export function getDevelopment() {
  return localStorage.getItem(`${prefix}.development`)
}

export function getAuthApiUrl() {
  return localStorage.getItem(`${prefix}.authApiUrl`)
}

export function getInventoryApiUrl() {
  return localStorage.getItem(`${prefix}.inventoryApiUrl`)
}

export function getUserId() {
  return localStorage.getItem(`${prefix}.userId`)
}
export function getUsername() {
  return localStorage.getItem(`${prefix}.username`)
}
export function getGroups() {
  return localStorage.getItem(`${prefix}.groups`)
}

export function getFunctions() {
  return localStorage.getItem(`${prefix}.functions`)
}

export function getAccessToken() {
  return localStorage.getItem(`${prefix}.accessToken`)
}
export function removeAccessToken() {
  localStorage.removeItem(`${prefix}.accessToken`)
}
export function getRefreshToken() {
  return localStorage.getItem(`${prefix}.refreshToken`)
}
export function removeRefreshToken() {
  localStorage.removeItem(`${prefix}.refreshToken`)
}

export function getAuthFailed() {
  return localStorage.getItem(`${prefix}.authFailed`)
}

export function removeAuthFailed() {
  return localStorage.removeItem(`${prefix}.authFailed`)
}
export function getDefaultLoginPath() {
  return localStorage.getItem(`${prefix}.defaultLoginPath`)
}

export function init(config: any, credential: Credential) {
  const logPrefix = 'config.init'
  console.log(logPrefix, { config })

  const _config = {
    ...config,
    ...(credential ?? {}),
  }
  // TODO delete
  // console.log(logPrefix, { _config })

  Object.keys(_config).forEach((key) => {
    localStorage.setItem(`${prefix}.${key}`, _config[key])
  })
}

export function initCredential(credential: Credential) {
  const logPrefix = 'config.initCredential'
  console.log(logPrefix, { credential })
  Object.keys(credential).forEach((key) => {
    localStorage.setItem(`${prefix}.${key}`, credential[key])
  })
}

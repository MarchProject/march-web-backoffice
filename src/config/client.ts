/**
 *
 * Client side config/store for web
 * init values after login succeed
 *
 */

import { Credential } from '../types/uam'
import { tableConfig } from './table.config'

const prefix = 'march.backOffice'

const tableLocal = ['mainInventoryTable']

const itemLocal = [
  'userId',
  'username',
  'shopName',
  'groups',
  'functions',
  'accessToken',
  'refreshToken',
  'authFailed',
  'defaultLoginPath',
]

export function getDevelopment() {
  return localStorage.getItem(`${prefix}.development`)
}

export function getLanguage() {
  return localStorage.getItem(`${prefix}.language`)
}

export function setLanguage(language: 'th' | 'en') {
  return localStorage.setItem(`${prefix}.language`, language)
}

export function getAuthApiUrl() {
  return localStorage.getItem(`${prefix}.authApiUrl`)
}

export function getInventoryApiUrl() {
  return localStorage.getItem(`${prefix}.inventoryApiUrl`)
}

export function getUserApiUrl() {
  return localStorage.getItem(`${prefix}.userApiUrl`)
}

export function getUserId() {
  return localStorage.getItem(`${prefix}.userId`)
}
export function getUsername() {
  return localStorage.getItem(`${prefix}.username`)
}
export function getPicture() {
  return localStorage.getItem(`${prefix}.picture`)
}
export function getShopName() {
  return localStorage.getItem(`${prefix}.shopName`)
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
export function clearLocal() {
  itemLocal.forEach((e) => {
    localStorage.removeItem(`${prefix}.${e}`)
  })
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

export function getMainInventoryColumn() {
  return localStorage.getItem(`${prefix}.mainInventoryTable`)
}

export function setMainInventoryColumn(value: any) {
  return localStorage.setItem(`${prefix}.mainInventoryTable`, value)
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

  tableLocal.forEach((key) => {
    const tableValue = localStorage.getItem(`${prefix}.${key}`)
    const tableConfigS = tableConfig()
    if (!tableValue)
      localStorage.setItem(
        `${prefix}.${key}`,
        JSON.stringify(tableConfigS[key]),
      )
  })
}

export function initCredential(credential: Credential) {
  const logPrefix = 'config.initCredential'
  console.log(logPrefix, { credential })
  Object.keys(credential).forEach((key) => {
    localStorage.setItem(`${prefix}.${key}`, credential[key])
  })
}

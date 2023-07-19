import { countBy, defaultTo, get } from 'lodash'

export type Normalization = (value: string) => boolean

export const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const hasDuplicateName = (array: any[]) => {
  const nameCounts = countBy(array, 'name')

  return Object.values(nameCounts).some((count) => count > 1)
}

export const removeTypename = (obj) =>
  Object.keys(obj).reduce((acc, key) => {
    if (key !== '__typename') {
      acc[key] = obj[key]
    }
    return acc
  }, {})

export const defaultGet = (obj: any, field: string, defaultValue: any = '') => {
  return defaultTo(get(obj, field, defaultValue), defaultValue)
}

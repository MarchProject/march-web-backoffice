import { countBy } from "lodash"

export type Normalization = (value: string) => boolean

export const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const hasDuplicateName = (array:any[]) => {
  const nameCounts = countBy(array, 'name')

  return Object.values(nameCounts).some((count) => count > 1)
}

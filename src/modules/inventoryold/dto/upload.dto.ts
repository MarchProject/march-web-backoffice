import { IDataTemplateCsv } from '@/constant/csvData'

const removeAsterisks = (obj) => {
  for (let prop in obj) {
    if (prop.endsWith('*')) {
      const newProp = prop.slice(0, -1)
      obj[newProp] = obj[prop]
      delete obj[prop]
    }
  }
}

export const tranfromCsvFile = (array: IDataTemplateCsv[]) => {
  const newArray = JSON.parse(JSON.stringify(array))

  for (let i = 0; i < newArray.length; i++) {
    removeAsterisks(newArray[i])
  }

  return newArray
}

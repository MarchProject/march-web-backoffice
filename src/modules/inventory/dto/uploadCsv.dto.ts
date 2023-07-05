import {
  GetInventoryTypes,
  UploadInventoryVariable,
} from '@/core/gql/inventory'
import { IValidatedValues } from '../dialog/DialogEditor/DialogUploadCsv/view/UploadCsvView/interface'
import { defaultTo, get } from 'lodash'
import { DbFormat, dateFormat } from '@/core/common'
import dayjs from '@/core/common/dayjs'

export const tranFromUploadCsv = (
  validatedValue: IValidatedValues,
  inventoriesTypeData: GetInventoryTypes[],
  inventoriesBrandData: GetInventoryTypes[],
): UploadInventoryVariable => {
  const mapResponse = validatedValue.validData.map((v) => {
    const {
      id,
      name,
      favorite,
      amount,
      type,
      brand,
      sku,
      reorderLevel,
      price,
      priceMember,
      expiryDate,
      description,
    } = v
    const typeId = inventoriesTypeData.find((e) => e._name === type)
    const brandId = inventoriesBrandData.find((e) => e._name === brand)
    console.log({ v, typeId, brandId, inventoriesTypeData })
    const weight = defaultTo(get(v, 'weight'), undefined)
    const width = defaultTo(get(v, 'width'), undefined)
    const length = defaultTo(get(v, 'length'), undefined)
    const height = defaultTo(get(v, 'height'), undefined)

    const size =
      weight === '' && length === '' && width === '' && height === ''
        ? undefined
        : {
            weight: weight ? parseInt(weight) : undefined,
            width: width ? parseInt(width) : undefined,
            length: length ? parseInt(length) : undefined,
            height: height ? parseInt(height) : undefined,
          }

    return {
      id: defaultTo(id, ''),
      name: defaultTo(name, ''),
      inventoryTypeId: typeId.id,
      brandTypeId: brandId.id,
      favorite: favorite === '1' ? true : false,
      amount: parseInt(defaultTo(amount, '0')),
      sku: sku,
      reorderLevel: parseInt(reorderLevel),
      size: size,
      price: parseInt(price),
      priceMember: parseInt(priceMember),
      expiryDate: dayjs(expiryDate, dateFormat).format(DbFormat),
      description: description,
    }
  })
  return {
    input: {
      uploadDatas: mapResponse,
      fileName: validatedValue.name,
    },
  }
}

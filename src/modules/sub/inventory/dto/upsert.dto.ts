import { getUserId } from '@/config/client'
import { IInventoryForm } from '../editor/interface'
import { UpsertInventoryTypeVariables } from '@/core/gql/inventory/upsertInventory'
import { get, isNil } from 'lodash'
import dayjs from '@/core/common/dayjs'
import { DbFormat } from '@/core/common'

export const tranFromUpsertInventoryDto = (
  input: IInventoryForm,
  id?: string,
): UpsertInventoryTypeVariables => {
  const userId = getUserId()
  const size = {
    width: isNil(input?.width) ? undefined : Number(input?.width),
    length: isNil(input?.length) ? undefined : Number(input?.length),
    height: isNil(input?.height) ? undefined : Number(input?.height),
    weight: isNil(input?.weight) ? undefined : Number(input?.weight),
  }
  const expiryDate = get(input, 'expiryDate', undefined)
  const tranformExp = expiryDate
    ? dayjs(expiryDate).format(DbFormat)
    : undefined

  return {
    input: {
      id: id,
      name: get(input, 'name', undefined),
      amount: Number(input.quantity),
      price: Number(input.price),
      sku: get(input, 'sku', undefined),
      serialNumber: get(input, 'serialNumber', undefined),
      size: Object.keys(size).length !== 0 ? size : undefined,
      favorite: get(input, 'favorite', false),
      priceMember: isNil(input?.memberPrice)
        ? undefined
        : Number(input?.memberPrice),
      reorderLevel: isNil(input?.reorder) ? undefined : Number(input?.reorder),
      description: get(input, 'description', undefined),
      createdBy: userId,
      inventoryTypeId: input.type.id,
      inventoryBrandId: input.brand.id,
      inventoryBranchId: input.branch.id,
      expiryDate: tranformExp,
    },
  }
}

import { InventoryQuery } from '../operation/query/inventory/Inventory'
import { SaleQuery } from '../operation/query/sales/sales'
import {
  IMutatePropsMock,
  IQueryPropsMock,
  MutateKey,
  QueryKey,
} from '../interface'
import { InventoryMutate } from '../operation/mutate/inventory/inventory'

export const queryProvider = (): IQueryPropsMock => {
  return {
    [QueryKey.inventory]: new InventoryQuery(),
    [QueryKey.sales]: new SaleQuery(),
  }
}

export const mutateProvider = (): IMutatePropsMock => {
  return {
    [MutateKey.inventory]: new InventoryMutate(),
  }
}

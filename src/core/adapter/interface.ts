import { IInventoryMutate } from './operation/mutate/inventory/interface'
import { InventoryMutate } from './operation/mutate/inventory/inventory'
import { InventoryQuery } from './operation/query/inventory/Inventory'
import { IInventoryQuery } from './operation/query/inventory/interface'
import { ISalesQuery } from './operation/query/sales/interface'
import { SaleQuery } from './operation/query/sales/sales'

export enum QueryKey {
  inventory = 'inventory',
  sales = 'sales',
}

export enum MutateKey {
  inventory = 'inventory',
  sales = 'sales',
  login = 'login',
}

// export enum InventoryQueryKey {
//   inventoryNames = 'inventoryNames',
//   inventoryBrands = 'inventoryBrands',
// }

export enum SaleQueryKey {
  cashList = 'cashList',
}

export interface IQueryProvider {
  [QueryKey.inventory]: InventoryQuery
  [QueryKey.sales]: SaleQuery
}

export interface IQueryPropsMock {
  [QueryKey.inventory]: IInventoryQuery
  [QueryKey.sales]: ISalesQuery
}

export interface IMutatePropsMock {
  [MutateKey.inventory]: IInventoryMutate
}

export interface IMutateProvider {
  [MutateKey.inventory]: InventoryMutate
}

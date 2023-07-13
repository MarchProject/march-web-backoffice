import { GetInventoryAllDeletedData } from '@/core/gql/inventory/inventoryTrash'
import {
  GetInventoriesBrandData,
  GetInventoriesData,
  GetInventoriesTypeData,
  InventoryNames,
} from '../../../../gql/inventory/inventory'
import {
  BrandType,
  InventoriesResponse,
  InventoryNamesClass,
  InventoryTrash,
  InventoryType,
} from '../../../../model/inventory'

export interface IInventoryQuery {
  inventoryNames: (payload: InventoryNames) => InventoryNamesClass
  inventories: (payload: GetInventoriesData) => InventoriesResponse
  inventoryBrands: (payload: GetInventoriesBrandData) => BrandType
  InventoryType: (payload: GetInventoriesTypeData) => InventoryType
  inventoryTrash:(payload:GetInventoryAllDeletedData) => InventoryTrash
}

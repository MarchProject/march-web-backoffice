import { GetInventoryAllDeletedResponse } from '@/core/gql/inventory/getInventoryAllDeletedQuery'
import { GetInventoriesResponse } from '@/core/gql/inventory/getInventoriesQuery'
import { InventoryNamesResponse } from '@/core/gql/inventory/getInventoryNamesQuery'
import { GetTypesInventoryResponse } from '@/core/gql/inventory/getTypesInventoryQuery'
import { GetInventoriesBrandResponse } from '@/core/gql/inventory/getBrandsInventoryQuery'
import {
  InventoryBrand,
  InventoriesResponse,
  InventoryNamesClass,
  InventoryTrash,
  InventoryType,
} from '../../../../model/inventory'

export interface IInventoryQuery {
  inventoryNames: (payload: InventoryNamesResponse) => InventoryNamesClass
  inventories: (payload: GetInventoriesResponse) => InventoriesResponse
  inventoryBrands: (payload: GetInventoriesBrandResponse) => InventoryBrand
  InventoryType: (payload: GetTypesInventoryResponse) => InventoryType
  inventoryTrash: (payload: GetInventoryAllDeletedResponse) => InventoryTrash
}

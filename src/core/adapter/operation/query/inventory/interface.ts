import {
  GetInventoriesBrandData,
  GetInventoriesData,
  GetInventoriesTypeData,
  InventoryNames,
} from '../../../../gql/inventory'
import {
  BrandType,
  InventoriesResponse,
  InventoryNamesClass,
  InventoryType,
} from '../../../../model/inventory'

export interface IInventoryQuery {
  inventoryNames: (payload: InventoryNames) => InventoryNamesClass
  inventories: (payload: GetInventoriesData) => InventoriesResponse
  inventoryBrands: (payload: GetInventoriesBrandData) => BrandType
  InventoryType: (payload: GetInventoriesTypeData) => InventoryType
}

import { InventoryBranch } from '@/core/model/inventory'
import { IUseUpsertInventoryProps } from '../../controllers/apiHandler/useUpsertInventory'
import { IUseDeleteInventoryProps } from '../../controllers/apiHandler/useDeleteInventory'
import { IUseQueryInventoryProps } from '../../controllers/apiHandler/useQueryInventory'

interface InventoryType {
  id: string
  name: string
}

interface InventoryBrand {
  id: string
  name: string
}

export interface IInventoryForm {
  name: string
  description: string
  expiryDate: string
  favorite: boolean
  type: InventoryType
  brand: InventoryBrand
  branch: InventoryBranch
  quantity: number
  sku: string
  serialNumber: string
  reorder: number
  weight: string
  width: string
  length: string
  height: string
  price: number
  memberPrice: number
}

export interface IUseQueryHandlerProps {
  getInventoryProps: IUseQueryInventoryProps
  upsertInventoryProps: IUseUpsertInventoryProps
  deleteInventoryProps: IUseDeleteInventoryProps
}

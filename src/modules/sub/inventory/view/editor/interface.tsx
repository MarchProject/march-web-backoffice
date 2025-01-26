import { IUseUpsertInventoryProps } from '../fetcher/useUpsertInventory'
import { IUseQueryInventoryProps } from '../fetcher/useQueryInventory'
import { IUseDeleteInventoryProps } from '../fetcher/useDeleteInventory'
import { InventoryBranch } from '@/core/model/inventory'

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

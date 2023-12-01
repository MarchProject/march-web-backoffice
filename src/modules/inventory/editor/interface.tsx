import { IUseUpsertInventoryProps } from '../fetcher/useUpsertInventory'
import { IUseQueryInventoryProps } from '../fetcher/useQueryInventory'
import { IUseDeleteInventoryProps } from '../fetcher/useDeleteInventory'

interface InventoryType {
  id: string
  name: string
}

interface BrandType {
  id: string
  name: string
}

export interface IInventoryForm {
  name: string
  description: string
  expiryDate: string
  favorite: boolean
  type: InventoryType
  brand: BrandType
  quantity: number
  sku: string
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

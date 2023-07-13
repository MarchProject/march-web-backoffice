import { plainToInstance } from 'class-transformer'
import { Model } from './model'

export class InventoryNamesClass {
  id: string
  _name: string
  get name(): string {
    return this._name
  }

  set name(name: string) {
    this._name = name.split('|')[0]
  }
}
export class BrandType {
  id: string
  _name: string
  get name(): string {
    return this._name
  }

  set name(name: string) {
    this._name = name.split('|')[0]
  }
  description: string
  createdBy: string
}
export class InventoriesResponse {
  _inventories: Inventory[]
  pageNo: number
  pageLimit: number
  totalPage: number
  totalRow: number

  get inventories(): Inventory[] {
    return this._inventories
  }

  set inventories(inventories: Inventory[]) {
    this._inventories = plainToInstance(Inventory, inventories)
  }
}

export class SplitShop {
  protected splitShop<T>(
    instance: T,
    fieldName: string,
    formattedFieldName: string,
    value: string,
  ) {
    instance[fieldName] = value
    if (value) {
      instance[formattedFieldName] = value.split('|')[0]
    }
  }
}

export class InventoryType {
  id: string
  _name: string
  get name(): string {
    return this._name
  }

  set name(name: string) {
    this._name = name.split('|')[0]
  }
  description: string
  createdBy: string
}

export class Inventory extends Model {
  _name: string
  amount: number
  sold: number
  price: number
  sku: string
  reorderLevel: number
  size: string
  favorite: boolean
  priceMember: number
  _inventoryType: InventoryType
  _brandType: BrandType
  description: string
  _expiryDate: string
  formattedExpiryDate: string

  get name(): string {
    return this._name
  }

  set name(name: string) {
    this._name = name.split('|')[0]
  }

  get inventoryType(): InventoryType {
    return this._inventoryType
  }

  set inventoryType(inventoryType: InventoryType) {
    inventoryType.name = inventoryType.name.split('|')[0]
    this._inventoryType = inventoryType
  }

  get brandType(): BrandType {
    return this._brandType
  }

  set brandType(brandType: BrandType) {
    brandType.name = brandType.name.split('|')[0]
    this._brandType = brandType
  }

  get expiryDate() {
    return this._expiryDate
  }
  set expiryDate(value: string) {
    this.setLocalDateTime<Model>(
      this,
      '_expiryDate',
      'formattedExpiryDate',
      value,
      false,
    )
  }
}

class TrashInventory extends Model {
  _name: string
  get name(): string {
    return this._name
  }

  set name(name: string) {
    this._name = name.split('|')[0]
  }
}

export class InventoryTrash {
  _inventory: TrashInventory[]
  _brand: TrashInventory[]
  _type: TrashInventory[]

  get inventory(): TrashInventory[] {
    return this._inventory
  }

  set inventory(inventory: TrashInventory[]) {
    this._inventory = plainToInstance(TrashInventory, inventory)
  }

  get brand(): TrashInventory[] {
    return this._brand
  }

  set brand(brand: TrashInventory[]) {
    this._brand = plainToInstance(TrashInventory, brand)
  }

  get type(): TrashInventory[] {
    return this._type
  }

  set type(type: TrashInventory[]) {
    this._type = plainToInstance(TrashInventory, type)
  }
}

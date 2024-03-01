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
export class InventoryBrand extends Model {
  _name: string
  get name(): string {
    return this._name
  }

  set name(name: string) {
    this._name = name.split('|')[0]
  }
  description: string
}
export class InventoryBranch extends Model {
  _name: string
  get name(): string {
    return this._name
  }

  set name(name: string) {
    this._name = name.split('|')[0]
  }
  description: string
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

export class InventoryType extends Model {
  _name: string
  get name(): string {
    return this._name
  }

  set name(name: string) {
    this._name = name.split('|')[0]
  }
  description: string
}

export class Inventory extends Model {
  _name: string
  amount: number
  sold: number
  price: number
  sku: string
  serialNumber: string
  reorderLevel: number
  size: string
  favorite: boolean
  priceMember: number
  _inventoryType: InventoryType
  _inventoryBrand: InventoryBrand
  _inventoryBranch: InventoryBranch
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

  get inventoryBrand(): InventoryBrand {
    return this._inventoryBrand
  }

  set inventoryBrand(inventoryBrand: InventoryBrand) {
    inventoryBrand.name = inventoryBrand.name.split('|')[0]
    this._inventoryBrand = inventoryBrand
  }

  get inventoryBranch(): InventoryBranch {
    return this._inventoryBranch
  }

  set inventoryBranch(inventoryBranch: InventoryBranch) {
    inventoryBranch.name = inventoryBranch.name.split('|')[0]
    this._inventoryBranch = inventoryBranch
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

export class TrashInventory extends Model {
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
  _branch: TrashInventory[]
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
  
  get branch(): TrashInventory[] {
    return this._branch
  }

  set branch(branch: TrashInventory[]) {
    this._branch = plainToInstance(TrashInventory, branch)
  }

  get type(): TrashInventory[] {
    return this._type
  }

  set type(type: TrashInventory[]) {
    this._type = plainToInstance(TrashInventory, type)
  }
}

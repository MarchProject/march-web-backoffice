import { Model } from './model'

export class BrandType {
  id: string
  _name: string
  get name(): string {
    return this._name
  }

  set name(name: string) {
    this._name = name.split('|')[0]
  }
}

export class InventoriesResponse {
  inventories: Inventory[]
  pageNo: number
  pageLimit: number
  totalPage: number
  totalRow: number
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
  // _name: string
  // formattedName: string
  // get name() {
  //   return this._name + '1234'
  // }
  // set name(value: string) {
  //   this.splitShop<SplitShop>(this, '_name', 'formattedName', value)
  // }
}

export class Inventory extends Model {
  _name: string
  amount: number
  sold: number
  price: number
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
    )
  }
}

import { Inventory } from '@/core/model/inventory'

export const transfromInventory = (inventory: Inventory) => {
  const size = inventory.size.split('|')
  return {
    name: inventory.name,
    description: inventory.description,
    expiryDate: inventory._expiryDate,
    type: inventory._inventoryType,
    brand: inventory._inventoryBrand,
    branch: inventory._inventoryBranch,
    quantity: inventory.amount,
    sku: inventory.sku,
    serialNumber: inventory.serialNumber,
    reorder: inventory.reorderLevel,
    favorite: inventory.favorite,
    weight: size[0],
    width: size[1],
    length: size[2],
    height: size[3],
    price: inventory.price,
    memberPrice: inventory.priceMember,
    updatedAt: inventory.formattedUpdatedAt,
    updatedBy: inventory.updatedBy,
  }
}

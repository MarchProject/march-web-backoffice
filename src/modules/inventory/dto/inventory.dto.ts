import { Inventory } from '@/core/model/inventory'

export const transfromInventory = (inventory: Inventory) => {
  const size = inventory.size.split('|')
  return {
    name: inventory.name,
    description: inventory.description,
    expiryDate: inventory._expiryDate,
    type: inventory._inventoryType,
    brand: inventory._brandType,
    quantity: inventory.amount,
    sku: inventory.sku,
    reorder: inventory.reorderLevel,
    favorite: inventory.favorite,
    weight: size[3],
    width: size[0],
    length: size[1],
    height: size[2],
    price: inventory.price,
    memberPrice: inventory.priceMember,
  }
}

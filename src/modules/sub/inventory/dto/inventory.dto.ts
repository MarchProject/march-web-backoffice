import { InventoriesData } from "@/core/gql/inventory/getInventoriesQuery"


export const transformInventory = (inventory: InventoriesData) => {
  const size = inventory.size.split('|')
  return {
    name: inventory.name,
    description: inventory.description,
    expiryDate: inventory.expiryDate,
    type: inventory.inventoryType,
    brand: inventory.inventoryBrand,
    branch: inventory.inventoryBranch,
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
    updatedAt: inventory.updatedAt,
    updatedBy: inventory.updatedBy,
  }
}

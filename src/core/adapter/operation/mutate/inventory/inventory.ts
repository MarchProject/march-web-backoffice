import { IInventoryMutate } from './interface'

export class InventoryMutate implements IInventoryMutate {
  constructor() {}

  favoriteInventory(data: any) {
    try {
      return data
    } catch (error) {
      throw new Error('Instance favoriteInventory')
    }
  }
}

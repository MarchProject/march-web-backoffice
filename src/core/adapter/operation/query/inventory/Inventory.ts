import {
  GetInventoriesBrandData,
  GetInventoriesData,
  GetInventoriesTypeData,
  InventoryNames,
} from '../../../../gql/inventory'
import {
  BrandType,
  InventoriesResponse,
  InventoryNamesClass,
  InventoryType,
} from '../../../../model/inventory'
import { plainToInstance } from 'class-transformer'
import { IInventoryQuery } from './interface'

export class InventoryQuery implements IInventoryQuery {
  constructor() {}

  inventories = (data: GetInventoriesData) => {
    try {
      const property = Object.keys(data)[0]
      const response = plainToInstance(InventoriesResponse, data[property])

      if (response) return response
    } catch (error) {
      throw new Error('Instance Inventory')
    }
  }

  inventoryNames = (data: InventoryNames) => {
    try {
      const property = Object.keys(data)[0]
      const response = plainToInstance(InventoryNamesClass, data[property])

      if (response) return response
    } catch (error) {
      throw new Error('Instance Item Name')
    }
  }

  inventoryBrands(data: GetInventoriesBrandData) {
    try {
      const property = Object.keys(data)[0]
      const response = plainToInstance(BrandType, data[property])

      if (response) return response
    } catch (error) {
      throw new Error('Instance Brand')
    }
  }

  InventoryType(data: GetInventoriesTypeData) {
    try {
      const property = Object.keys(data)[0]
      const response = plainToInstance(InventoryType, data[property])

      if (response) return response
    } catch (error) {
      throw new Error('Instance Type')
    }
  }
}

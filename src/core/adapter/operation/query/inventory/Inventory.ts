import {
  GetInventoriesData,
  GetInventoriesTypeData,
  InventoryNames,
} from '../../../../gql/inventory/inventory'
import { GetInventoriesBrandData } from '@/core/gql/inventory/getInventoriesBrandQuery'
import {
  BrandType,
  InventoriesResponse,
  InventoryNamesClass,
  InventoryTrash,
  InventoryType,
} from '../../../../model/inventory'
import { plainToInstance } from 'class-transformer'
import { IInventoryQuery } from './interface'
import { GetInventoryAllDeletedData } from '@/core/gql/inventory/inventoryTrash'

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

  inventoryTrash(data: GetInventoryAllDeletedData) {
    try {
      const property = Object.keys(data)[0]
      const response = plainToInstance(InventoryTrash, data[property])

      if (response) return response
    } catch (error) {
      throw new Error('Instance inventoryTrash')
    }
  }
}

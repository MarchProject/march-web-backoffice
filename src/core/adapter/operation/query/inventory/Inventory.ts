import { GetInventoriesResponse } from '@/core/gql/inventory/getInventoriesQuery'
import { InventoryNamesResponse } from '@/core/gql/inventory/getInventoryNamesQuery'
import { GetTypesInventoryResponse } from '@/core/gql/inventory/getTypesInventoryQuery'
import { GetInventoriesBrandResponse } from '@/core/gql/inventory/getBrandsInventoryQuery'
import {
  InventoryBrand,
  InventoriesResponse,
  InventoryNamesClass,
  InventoryTrash,
  InventoryType,
} from '../../../../model/inventory'
import { plainToInstance } from 'class-transformer'
import { IInventoryQuery } from './interface'
import { GetInventoryAllDeletedResponse } from '@/core/gql/inventory/getInventoryAllDeletedQuery'

export class InventoryQuery implements IInventoryQuery {
  constructor() {}

  inventories = (data: GetInventoriesResponse) => {
    try {
      const property = Object.keys(data)[0]
      const response = plainToInstance(InventoriesResponse, data[property])

      if (response) return response
    } catch (error) {
      throw new Error('Instance Inventory')
    }
  }

  inventoryNames = (data: InventoryNamesResponse) => {
    try {
      const property = Object.keys(data)[0]
      const response = plainToInstance(InventoryNamesClass, data[property])

      if (response) return response
    } catch (error) {
      throw new Error('Instance Item Name')
    }
  }

  inventoryBrands(data: GetInventoriesBrandResponse) {
    try {
      const property = Object.keys(data)[0]
      const response = plainToInstance(InventoryBrand, data[property])

      if (response) return response
    } catch (error) {
      throw new Error('Instance Brand')
    }
  }

  InventoryType(data: GetTypesInventoryResponse) {
    try {
      const property = Object.keys(data)[0]
      const response = plainToInstance(InventoryType, data[property])

      if (response) return response
    } catch (error) {
      throw new Error('Instance Type')
    }
  }

  inventoryTrash(data: GetInventoryAllDeletedResponse) {
    try {
      const property = Object.keys(data)[0]
      const response = plainToInstance(InventoryTrash, data[property])

      if (response) return response
    } catch (error) {
      throw new Error('Instance inventoryTrash')
    }
  }
}

import { uploadInventoryMutation } from '../../../../gql/inventory'
import { InventoriesResponse } from '../../../../model/inventory'
import { ISalesQuery } from './interface'

export class SaleQuery implements ISalesQuery {
  constructor() {}
  cashList = (): any => {
    return {
      queryNode: uploadInventoryMutation,
      classConstructor: InventoriesResponse,
    }
  }
}

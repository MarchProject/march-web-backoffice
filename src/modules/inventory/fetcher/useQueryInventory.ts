import { UseFormReset } from 'react-hook-form'
import { IInventoryForm } from '../editor/interface'
import {
  IGetInventoryResponse,
  IGetInventoryVariable,
  getInventoryQuery,
} from '@/core/gql/inventory/getInventoryQuery'
import { Inventory } from '@/core/model/inventory'
import { inventoryRoute } from '@/router/inventory'
import { useQuery } from '@apollo/client'
import { plainToInstance } from 'class-transformer'
import router from 'next/router'
import { useState } from 'react'
import { transfromInventory } from '../dto/inventory.dto'
import { StatusCode } from '@/types/response'

export interface IUseQueryInventoryProps {
  idInventory: string
  reset: UseFormReset<IInventoryForm>
}

export const useQueryInventory = ({
  idInventory,
  reset,
}: IUseQueryInventoryProps) => {
  const [inventory, setInventory] = useState<Inventory>(null)
  if (idInventory) {
    const { loading } = useQuery<IGetInventoryResponse, IGetInventoryVariable>(
      getInventoryQuery,
      {
        variables: { id: idInventory },
        onCompleted: (data) => {
          if (data.getInventory.status.code === StatusCode.SUCCESS) {
            const _inventory = plainToInstance(
              Inventory,
              data.getInventory.data,
            )
            reset(transfromInventory(_inventory))
            setInventory(_inventory)
          }
        },
        onError: () => {
          router.push({ pathname: inventoryRoute.path })
        },
      },
    )
    return {
      inventory,
      inventoryLoading: loading,
    }
  }
  return {
    inventory,
    inventoryLoading: false,
  }
}

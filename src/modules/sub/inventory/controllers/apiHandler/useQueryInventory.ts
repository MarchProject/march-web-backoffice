import { UseFormReset } from 'react-hook-form'
import { IGetInventoryResponse } from '@/core/gql/inventory/getInventoryQuery'
import { inventoryRoute } from '@/router/inventory'
import router from 'next/router'

import { StatusCode } from '@/types/response'
import { IInventoryForm } from '../../view/editor/interface'
import { useGetInventory } from '../fetcher/getInventory'
import { transformInventory } from '../../dto/inventory.dto'

export interface IUseQueryInventoryProps {
  idInventory: string
  reset: UseFormReset<IInventoryForm>
}

export const useQueryInventory = ({
  idInventory,
  reset,
}: IUseQueryInventoryProps) => {
  // const [inventory, setInventory] = useState<InventoriesData>(null)

  const onCompleted = (data: IGetInventoryResponse) => {
    if (data?.getInventory?.status?.code === StatusCode.SUCCESS) {
      try {
        const inventory = transformInventory(data?.getInventory.data)
        reset(inventory)
        // setInventory(inventory)
      } catch (err) {
        console.log({ err })
      }
    }
  }

  const onError = () => {
    router.push({ pathname: inventoryRoute.path })
  }

  const { loading } = useGetInventory({
    idInventory,
    onCompleted,
    onError,
  })

  return {
    // inventory,
    inventoryLoading: loading,
  }
}

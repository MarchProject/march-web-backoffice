import { useLoadingContext } from '@/context/loading'
import { useEffect } from 'react'
import { useQueryInventories } from './apiHandler/useQueryInventories'
import { useQueryInventoryBranch } from './apiHandler/useQueryInventoryBranch'
import { useQueryInventoryBrand } from './apiHandler/useQueryInventoryBrand'
import { useQueryInventoryType } from './apiHandler/useQueryInventoryType'
import { useQueryTrashHandler } from './apiHandler/useQueryTrash'

export const useQueryHandler = ({ notification }) => {
  const { openLoading, closeLoading } = useLoadingContext()
  const { inventoriesBranchLoading, ...branch } = useQueryInventoryBranch({
    trigger: true,
  })
  const { inventoriesBrandLoading, ...brand } = useQueryInventoryBrand({
    trigger: true,
  })
  const { inventoriesTypeLoading, ...type } = useQueryInventoryType({
    trigger: true,
  })
  const { inventoryLoading, ...inventory } = useQueryInventories({
    notification,
  })
  const { trashData, inventoryAllDeletedLoaing, trashRefetch } =
    useQueryTrashHandler({
      notification,
    })

  useEffect(() => {
    if (
      inventoriesBranchLoading ||
      inventoriesBrandLoading ||
      inventoriesTypeLoading ||
      inventoryLoading ||
      inventoryAllDeletedLoaing
    ) {
      openLoading()
    } else {
      closeLoading()
    }

    return () => {
      closeLoading()
    }
  }, [
    closeLoading,
    inventoriesBranchLoading,
    inventoriesBrandLoading,
    inventoriesTypeLoading,
    inventoryAllDeletedLoaing,
    inventoryLoading,
    openLoading,
  ])

  return {
    inventory: { ...inventory, inventoryLoading },
    type: { ...type, inventoriesTypeLoading },
    brand: { ...brand, inventoriesBrandLoading },
    branch: { ...branch, inventoriesBranchLoading },
    trash: { trashData, trashRefetch },
  }
}

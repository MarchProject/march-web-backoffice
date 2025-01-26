import { useDeleteInventory } from '../../../controllers/apiHandler/useDeleteInventory'
import { useQueryInventory } from '../../../controllers/apiHandler/useQueryInventory'
import { useUpsertInventory } from '../../../controllers/apiHandler/useUpsertInventory'
import { IUseQueryHandlerProps } from '../interface'

export const useQueryHandler = ({
  getInventoryProps,
  upsertInventoryProps,
  deleteInventoryProps,
}: IUseQueryHandlerProps) => {
  const { inventoryLoading } = useQueryInventory({
    ...getInventoryProps,
  })
  const { upsertInventory, upsertInventoryLoading } = useUpsertInventory({
    ...upsertInventoryProps,
  })
  const { deleteInventoryHandle, deleteInventoryLoading } = useDeleteInventory({
    ...deleteInventoryProps,
  })
  return {
    upsertInventory: {
      upsertInventory,
    },
    deleteInventory: {
      deleteInventoryHandle,
    },
    mainLoading:
      inventoryLoading || upsertInventoryLoading || deleteInventoryLoading,
  }
}

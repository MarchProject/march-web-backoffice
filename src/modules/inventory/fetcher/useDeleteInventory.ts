import {
  DeleteInventoryData,
  DeleteTypeDataVariables,
  deleteInventoryMutation,
} from '@/core/gql/inventory/inventory'
import { useMutation } from '@apollo/client'

export const useDeleteInventory = () => {
  const [triggerMutation, { data: MutateData, error, loading }] = useMutation<
    DeleteInventoryData,
    DeleteTypeDataVariables
  >(deleteInventoryMutation)
}

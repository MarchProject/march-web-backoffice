import { FavoriteInventoryVariables } from '@/core/gql/inventory/favoriteInventoryMutation'
import { FavoriteInventoryResponse } from '@/core/gql/inventory/favoriteInventoryMutation'
import { favoriteInventoryMutation } from '@/core/gql/inventory/favoriteInventoryMutation'
import { useMutation } from '@apollo/client'

export const useFavoriteInventory = ({ onCompleted, onError }) => {
  return useMutation<FavoriteInventoryResponse, FavoriteInventoryVariables>(
    favoriteInventoryMutation,
    {
      onCompleted: onCompleted,
      onError: onError,
    },
  )
}

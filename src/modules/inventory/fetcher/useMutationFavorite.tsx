import { FavoriteInventoryVariables } from '@/core/gql/inventory/favoriteInventoryMutation'
import { FavoriteInventoryResponse } from '@/core/gql/inventory/favoriteInventoryMutation'
import { favoriteInventoryMutation } from '@/core/gql/inventory/favoriteInventoryMutation'
import {
  notificationFavoriteInventoryErrorProp,
  notificationFavoriteInventorySuccessProp,
} from '@/core/notification'
import { StatusCode } from '@/types/response'
import { useMutation } from '@apollo/client'
import { useCallback } from 'react'

export const useMutationFavorite = ({ notification, setTriggerFavorite }) => {
  const [favoriteInventory, { loading }] = useMutation<
    FavoriteInventoryResponse,
    FavoriteInventoryVariables
  >(favoriteInventoryMutation, {
    onCompleted: (data) => {
      if (data.favoriteInventory.status.code === StatusCode.SUCCESS) {
        notification(notificationFavoriteInventorySuccessProp)
        setTriggerFavorite((prev) => !prev)
      } else {
        notification(notificationFavoriteInventoryErrorProp)
      }
    },
    onError: () => {
      notification(notificationFavoriteInventoryErrorProp)
    },
  })

  const favoriteInventoryHandle = useCallback(
    (id: string) => {
      favoriteInventory({
        variables: { id: id },
      })
    },
    [favoriteInventory],
  )

  return {
    favoriteInventoryHandle,
    favoriteInventoryLoading: loading,
  }
}

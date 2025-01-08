import { FavoriteInventoryVariables } from '@/core/gql/inventory/favoriteInventoryMutation'
import { FavoriteInventoryResponse } from '@/core/gql/inventory/favoriteInventoryMutation'
import { favoriteInventoryMutation } from '@/core/gql/inventory/favoriteInventoryMutation'
import { StatusCode } from '@/types/response'
import { useMutation } from '@apollo/client'
import { useCallback } from 'react'

import {
  notificationInternalErrorProp,
  notificationMutationProp,
} from '@/core/notification'

export const useMutationFavorite = ({ notification, setTriggerFavorite }) => {
  const [favoriteInventory, { loading }] = useMutation<
    FavoriteInventoryResponse,
    FavoriteInventoryVariables
  >(favoriteInventoryMutation, {
    onCompleted: (data) => {
      if (data?.favoriteInventory?.status?.code === StatusCode.SUCCESS) {
        notification(
          notificationMutationProp(
            data?.favoriteInventory?.status.message,
            'success',
          ),
        )
        setTriggerFavorite((prev) => !prev)
      } else {
        notification(
          notificationMutationProp(
            data?.favoriteInventory?.status.message,
            'error',
          ),
        )
      }
    },
    onError: (error) => {
      if (error.message === 'Unauthorized Role') {
        notification(notificationInternalErrorProp('Permission.', 'Server'))
      } else {
        notification(notificationInternalErrorProp('Update Failed.'))
      }
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

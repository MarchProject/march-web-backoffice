import { FavoriteInventoryResponse } from '@/core/gql/inventory/favoriteInventoryMutation'
import { StatusCode } from '@/types/response'
import { useCallback } from 'react'
import {
  ConfigErrorNotificationType,
  ConfigNotificationPropsType,
} from '@/context/notification'
import { notificationMutationProp } from '@/core/notification'
import { useFavoriteInventory } from '../fetcher/favoriteInventory'

type UseMutationFavoritePropsType = {
  notification: (config?: ConfigNotificationPropsType) => void
  errorNotification: (config?: ConfigErrorNotificationType) => void
  inventoryRefetch: () => void
}

export const useMutationFavorite = ({
  notification,
  errorNotification,
  inventoryRefetch,
}: UseMutationFavoritePropsType) => {
  const onCompleted = useCallback(
    (data: FavoriteInventoryResponse) => {
      {
        if (data?.favoriteInventory?.status?.code === StatusCode.SUCCESS) {
          notification(
            notificationMutationProp(
              data?.favoriteInventory?.status.message,
              'success',
            ),
          )
          inventoryRefetch()
        } else {
          notification(
            notificationMutationProp(
              data?.favoriteInventory?.status.message,
              'error',
            ),
          )
        }
      }
    },
    [notification, inventoryRefetch],
  )

  const onError = useCallback(() => {
    errorNotification()
  }, [errorNotification])

  const [favoriteInventory, { loading }] = useFavoriteInventory({
    onCompleted,
    onError,
  })

  const favoriteInventoryHandler = useCallback(
    (id: string) => {
      favoriteInventory({
        variables: { id: id },
      })
    },
    [favoriteInventory],
  )

  return {
    favoriteInventoryHandler,
    favoriteInventoryLoading: loading,
  }
}

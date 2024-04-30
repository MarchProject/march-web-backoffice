import { FavoriteInventoryVariables } from '@/core/gql/inventory/favoriteInventoryMutation'
import { FavoriteInventoryResponse } from '@/core/gql/inventory/favoriteInventoryMutation'
import { favoriteInventoryMutation } from '@/core/gql/inventory/favoriteInventoryMutation'
import { notificationProp } from '@/core/notification/inventory/inventory/dialogUpload'
import { StatusCode } from '@/types/response'
import { useMutation } from '@apollo/client'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { tkeys } from '@/translations/i18n'
import { EnumSeverity } from '@/context/notification'

export const useMutationFavorite = ({ notification, setTriggerFavorite }) => {
  const { t: trans }: any = useTranslation()
  const [favoriteInventory, { loading }] = useMutation<
    FavoriteInventoryResponse,
    FavoriteInventoryVariables
  >(favoriteInventoryMutation, {
    onCompleted: (data) => {
      if (data?.favoriteInventory?.status?.code === StatusCode.SUCCESS) {
        notification(
          notificationProp(
            trans(tkeys.Inventory.MainPage.HeadText),
            trans(tkeys.Inventory.MainPage.noti.favorite.success),
            EnumSeverity.success,
          ),
        )
        setTriggerFavorite((prev) => !prev)
      } else {
        notification(
          notificationProp(
            trans(tkeys.Inventory.MainPage.HeadText),
            trans(tkeys.Inventory.MainPage.noti.favorite.error),
            EnumSeverity.error,
          ),
        )
      }
    },
    onError: () => {
      notification(
        notificationProp(
          trans(tkeys.Inventory.MainPage.HeadText),
          trans(tkeys.Inventory.MainPage.noti.favorite.error),
          EnumSeverity.error,
        ),
      )
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

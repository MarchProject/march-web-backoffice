import { EnumSeverity, useNotificationContext } from '@/context/notification'
import { DeleteInventoryData } from '@/core/gql/inventory/deleteInventoryMutation'
import { DeleteInventoryVariables } from '@/core/gql/inventory/deleteInventoryMutation'
import { deleteInventoryMutation } from '@/core/gql/inventory/deleteInventoryMutation'
import { inventoryRoute } from '@/router/inventory'
import { StatusCode } from '@/types/response'
import { useMutation } from '@apollo/client'
import router from 'next/router'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { tkeys } from '@/translations/i18n'
import { notificationProp } from '@/core/notification/inventory/inventory/dialogUpload'

export interface IUseDeleteInventoryProps {
  id: string
}

export const useDeleteInventory = ({ id }: IUseDeleteInventoryProps) => {
  const { notification } = useNotificationContext()
  const { t: trans }: any = useTranslation()
  const [deleteInventory, { loading }] = useMutation<
    DeleteInventoryData,
    DeleteInventoryVariables
  >(deleteInventoryMutation, {
    onCompleted: (data) => {
      if (data?.deleteInventory?.status?.code === StatusCode.SUCCESS) {
        notification(
          notificationProp(
            trans(tkeys.Inventory.MainPage.HeadText),
            trans(tkeys.Inventory.MainPage.noti.editor.deleteInventory.success),
            EnumSeverity.success,
          ),
        )
        router.push({
          pathname: inventoryRoute.path,
        })
      } else {
        notification(
          notificationProp(
            trans(tkeys.Inventory.MainPage.HeadText),
            trans(tkeys.Inventory.MainPage.noti.editor.deleteInventory.error),
            EnumSeverity.error,
          ),
        )
      }
    },
    onError: () => {
      notification(
        notificationProp(
          trans(tkeys.Inventory.MainPage.HeadText),
          trans(tkeys.Inventory.MainPage.noti.editor.deleteInventory.error),
          EnumSeverity.error,
        ),
      )
    },
  })

  const deleteInventoryHandle = useCallback(() => {
    deleteInventory({
      variables: {
        id: id,
      },
    })
  }, [deleteInventory, id])

  return {
    deleteInventoryHandle,
    deleteInventoryLoading: loading,
  }
}

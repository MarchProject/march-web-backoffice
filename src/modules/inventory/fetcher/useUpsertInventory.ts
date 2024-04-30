import { upsertInventoryMutation } from '@/core/gql/inventory/upsertInventory'
import { UpsertInventoryTypeResponse } from '@/core/gql/inventory/upsertInventory'
import { UpsertInventoryTypeVariables } from '@/core/gql/inventory/upsertInventory'
import { inventoryRoute } from '@/router/inventory'
import { useMutation } from '@apollo/client'
import router from 'next/router'
import { UseFormReset } from 'react-hook-form'
import { IInventoryForm } from '../editor/interface'
import { EnumSeverity, useNotificationContext } from '@/context/notification'
import { StatusCode } from '@/types/response'
import { notificationProp } from '@/core/notification/inventory/inventory/dialogUpload'
import { useTranslation } from 'react-i18next'
import { tkeys } from '@/translations/i18n'

export interface IUseUpsertInventoryProps {
  reset: UseFormReset<IInventoryForm>
  idInventory?: string
}

export const useUpsertInventory = ({
  reset,
  idInventory,
}: IUseUpsertInventoryProps) => {
  const { notification } = useNotificationContext()
  const { t: trans }: any = useTranslation()
  const mode = idInventory ? 'update' : 'create'
  const [upsertInventory, { loading }] = useMutation<
    UpsertInventoryTypeResponse,
    UpsertInventoryTypeVariables
  >(upsertInventoryMutation, {
    onCompleted: (data) => {
      if (data?.upsertInventory?.status?.code === StatusCode.SUCCESS) {
        notification(
          notificationProp(
            trans(tkeys.Inventory.MainPage.HeadText),
            trans(tkeys.Inventory.MainPage.noti.editor.upsertInventory[mode]),
            EnumSeverity.success,
          ),
        )
        reset()
        router.push({
          pathname: inventoryRoute.path,
        })
      } else {
        notification(
          notificationProp(
            trans(tkeys.Inventory.MainPage.HeadText),
            trans(
              tkeys.Inventory.MainPage.noti.editor.upsertInventory[
                `${data?.upsertInventory?.status?.code}`
              ],
            ),
            EnumSeverity.error,
          ),
        )
      }
    },
    onError: () => {
      notification(
        notificationProp(
          trans(tkeys.Inventory.MainPage.HeadText),
          trans(
            tkeys.Inventory.MainPage.noti.editor.somethingWrong,
          ),
          EnumSeverity.error,
        ),
      )
    },
  })

  return {
    upsertInventoryLoading: loading,
    upsertInventory,
  }
}

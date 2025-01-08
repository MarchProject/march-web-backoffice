import { StatusCode } from '@/types/response'
import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { tkeys } from '@/translations/i18n'
import { notificationProp } from '@/core/notification/inventory/inventory/dialogCustom'
import { getInventoryAllDeleted } from '../fetcher/getInventoryAllDeleted'
import {
  GetInventoryAllDeletedResponse,
  GetInventoryAllDeletedType,
} from '@/core/gql/inventory/getInventoryAllDeletedQuery'

export const useQueryTrashHandler = ({ notification }) => {
  const { t: trans }: any = useTranslation()
  const [trashData, setTrashData] = useState<GetInventoryAllDeletedType>(null)

  const onCompleted = useCallback(
    (data: GetInventoryAllDeletedResponse) => {
      if (data?.getInventoryAllDeleted?.status?.code === StatusCode.SUCCESS) {
        setTrashData(data.getInventoryAllDeleted.data)
      } else {
        notification(
          notificationProp(
            trans(tkeys.Inventory.MainPage.HeadText),
            trans(tkeys.Inventory.MainPage.noti.fetch.trash),
            'error',
          ),
        )
      }
    },
    [notification, trans],
  )

  const onError = useCallback(() => {
    notification(
      notificationProp(
        trans(tkeys.Inventory.MainPage.HeadText),
        trans(tkeys.Inventory.MainPage.noti.fetch.trash),
        'error',
      ),
    )
  }, [notification, trans])

  const { refetch, loading: inventoryAllDeletedLoaing } =
    getInventoryAllDeleted({
      onError,
      onCompleted,
    })

  const fetching = useCallback(() => {
    refetch()
  }, [refetch])

  useEffect(() => {
    fetching()
  }, [fetching])

  return {
    trashData,
    inventoryAllDeletedLoaing,
    trashRefetch: fetching,
  }
}

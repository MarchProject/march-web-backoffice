import {
  GetInventoryAllDeletedResponse,
  getInventoryAllDeletedQuery,
} from '@/core/gql/inventory/getInventoryAllDeletedQuery'
import { InventoryTrash } from '@/core/model/inventory'
import { StatusCode } from '@/types/response'
import { useLazyQuery } from '@apollo/client'
import { plainToInstance } from 'class-transformer'
import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { tkeys } from '@/translations/i18n'
import { notificationProp } from '@/core/notification/inventory/inventory/dialogUpload'
import { EnumSeverity } from '@/context/notification'

export const useQueryTrashHandler = ({ notification }) => {
  const { t: trans }: any = useTranslation()
  const [trashData, setTrashData] = useState<InventoryTrash>(null)
  const [trigger, setTrigger] = useState(true)

  const [getInventoryAllDeleted, { loading: getInventoryAllDeletedLoaing }] =
    useLazyQuery<GetInventoryAllDeletedResponse, any>(
      getInventoryAllDeletedQuery,
      {
        onCompleted: (data) => {
          if (
            data?.getInventoryAllDeleted?.status?.code === StatusCode.SUCCESS
          ) {
            const response = plainToInstance(
              InventoryTrash,
              data.getInventoryAllDeleted.data,
            )

            if (response) setTrashData(response)
          } else {
            notification(
              notificationProp(
                trans(tkeys.Inventory.MainPage.HeadText),
                trans(tkeys.Inventory.MainPage.noti.fetch.trash),
                EnumSeverity.error,
              ),
            )
          }
        },
        onError: () => {
          notification(
            notificationProp(
              trans(tkeys.Inventory.MainPage.HeadText),
              trans(tkeys.Inventory.MainPage.noti.fetch.trash),
              EnumSeverity.error,
            ),
          )
        },
      },
    )

  const getInventoryTrashHandle = useCallback(() => {
    getInventoryAllDeleted()
  }, [getInventoryAllDeleted])

  useEffect(() => {
    getInventoryTrashHandle()
  }, [getInventoryTrashHandle, trigger])

  return {
    trashData,
    setTriggerTrash: setTrigger,
    getInventoryAllDeletedLoaing,
  }
}

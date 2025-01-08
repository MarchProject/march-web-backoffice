import { useNotificationContext } from '@/context/notification'
import { InventoryNamesResponse } from '@/core/gql/inventory/getInventoryNamesQuery'
import { getInventoryNamesQuery } from '@/core/gql/inventory/getInventoryNamesQuery'
import { InventoryNamesClass } from '@/core/model/inventory'
import { notificationProp } from '@/core/notification/inventory/inventory/dialogCustom'
import { StatusCode } from '@/types/response'
import { useLazyQuery } from '@apollo/client'
import { plainToInstance } from 'class-transformer'
import { useEffect, useState } from 'react'
import { tkeys } from '@/translations/i18n'
import { useTranslation } from 'react-i18next'
interface useGetInventoryNames {
  triggerGetInventoryNames: boolean
}

export const useGetInventoryNames = ({
  triggerGetInventoryNames,
}: useGetInventoryNames) => {
  const { notification } = useNotificationContext()
  const { t: trans }: any = useTranslation()
  const [dataTranform, setDataTranform] = useState<InventoryNamesClass[]>([])
  const [getInventoryNames, { loading, error }] = useLazyQuery<
    InventoryNamesResponse,
    any
  >(getInventoryNamesQuery, {
    onCompleted: (data) => {
      if (data?.getInventoryNames?.status?.code === StatusCode.SUCCESS) {
        const response = plainToInstance(
          InventoryNamesClass,
          data.getInventoryNames.data,
        )
        if (response) setDataTranform(response)
      } else {
        notification(
          notificationProp(
            trans(tkeys.Inventory.MainPage.HeadText),
            trans(tkeys.Inventory.MainPage.noti.fetch.names),
            'error',
          ),
        )
      }
    },
    onError: () => {
      notification(
        notificationProp(
          trans(tkeys.Inventory.MainPage.HeadText),
          trans(tkeys.Inventory.MainPage.noti.fetch.names),
          'error',
        ),
      )
    },
  })

  useEffect(() => {
    getInventoryNames()
  }, [getInventoryNames, triggerGetInventoryNames])

  return {
    inventoryNamesData: dataTranform,
    inventoryNamesError: error,
    inventoryNamesLoading: loading,
  }
}

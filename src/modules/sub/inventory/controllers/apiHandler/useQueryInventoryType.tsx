import { useNotificationContext } from '@/context/notification'
import {
  GetTypesInventoryResponse,
  GetTypesInventoryType,
} from '@/core/gql/inventory/getTypesInventoryQuery'
import { StatusCode } from '@/types/response'
import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { tkeys } from '@/translations/i18n'
import { notificationProp } from '@/core/notification/inventory/inventory/dialogCustom'
import { getInventoryType } from '../fetcher/getInventorType'

interface IUseQueryInventoryTypeProps {
  trigger: boolean
}

export const useQueryInventoryType = ({
  trigger,
}: IUseQueryInventoryTypeProps) => {
  const { notification } = useNotificationContext()
  const { t: trans }: any = useTranslation()
  const [search, setSearch] = useState<string>('')
  const [inventoriesTypeData, setInventoriesTypeData] = useState<
    GetTypesInventoryType[]
  >([])

  const onCompleted = useCallback(
    (data: GetTypesInventoryResponse) => {
      if (data?.getInventoryTypes?.status?.code === StatusCode.SUCCESS) {
        setInventoriesTypeData(data.getInventoryTypes.data)
      } else {
        notification(
          notificationProp(
            trans(tkeys.Inventory.MainPage.HeadText),
            trans(tkeys.Inventory.MainPage.noti.fetch.type),
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
        trans(tkeys.Inventory.MainPage.noti.fetch.type),
        'error',
      ),
    )
  }, [notification, trans])

  const {
    refetch,
    error: getInventoryTypesError,
    loading: getInventoryTypesLoading,
  } = getInventoryType({ onCompleted, onError })

  const onInputTypeChange = useCallback(
    (value: string) => {
      setSearch(value)
    },
    [setSearch],
  )

  useEffect(() => {
    refetch({
      params: {
        search,
      },
    })
  }, [refetch, search, trigger])

  return {
    inventoriesTypeData: inventoriesTypeData,
    inventoriesTypeDataError: getInventoryTypesError,
    inventoriesTypeLoading: getInventoryTypesLoading,
    handleSearchInventoryType: onInputTypeChange,
  }
}

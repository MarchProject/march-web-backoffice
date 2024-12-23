import { useNotificationContext } from '@/context/notification'
import { GetBrandsInventoryType } from '@/core/gql/inventory/getBrandsInventoryQuery'
import { StatusCode } from '@/types/response'
import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { tkeys } from '@/translations/i18n'
import { notificationProp } from '@/core/notification/inventory/inventory/dialogCustom'
import { getInventoryBrand } from '../fetcher/getInventoryBrand'

type UseQueryInventoryBrandProps = {
}

export const useQueryInventoryBrand = ({}: UseQueryInventoryBrandProps) => {
  const { notification } = useNotificationContext()
  const { t: trans }: any = useTranslation()
  const [search, setSearch] = useState<string>('')
  const [inventoriesBrandData, setInventoriesBrandData] = useState<
    GetBrandsInventoryType[]
  >([])

  const onCompleted = useCallback(
    (data) => {
      if (data?.getInventoryBrands?.status?.code === StatusCode.SUCCESS) {
        setInventoriesBrandData(data.getInventoryBrands.data)
      } else {
        notification(
          notificationProp(
            trans(tkeys.Inventory.MainPage.HeadText),
            trans(tkeys.Inventory.MainPage.noti.fetch.brand),
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
        trans(tkeys.Inventory.MainPage.noti.fetch.brand),
        'error',
      ),
    )
  }, [notification, trans])

  const {
    refetch,
    loading: getInventoryBrandsLoading,
    error: getInventoryBrandsError,
  } = getInventoryBrand({
    onCompleted,
    onError,
  })

  const onInputBrandChange = useCallback(
    (value: string) => {
      setSearch(value)
    },
    [setSearch],
  )

  const fetching = useCallback(() => {
    refetch({
      params: {
        search,
      },
    })
  }, [refetch, search])

  useEffect(() => {
    refetch({
      params: {
        search,
      },
    })
  }, [refetch, search])

  return {
    inventoriesBrandData: inventoriesBrandData,
    inventoriesBrandDataError: getInventoryBrandsError,
    inventoriesBrandLoading: getInventoryBrandsLoading,
    handleSearchInventoryBrand: onInputBrandChange,
    inventoriesBrandRefetch: fetching,
  }
}

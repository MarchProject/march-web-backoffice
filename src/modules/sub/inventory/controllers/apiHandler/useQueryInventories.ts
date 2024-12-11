import {
  GetInventoriesType,
  IFavoriteStatus,
} from '@/core/gql/inventory/getInventoriesQuery'
import { GetInventoriesResponse } from '@/core/gql/inventory/getInventoriesQuery'
import { notificationProp } from '@/core/notification/inventory/inventory/dialogCustom'
import { StatusCode } from '@/types/response'
import { useCallback, useEffect, useState } from 'react'
import { tkeys } from '@/translations/i18n'
import { useTranslation } from 'react-i18next'

import { useGetInventories } from '../fetcher/getInventories'

export const useQueryInventories = ({ notification }) => {
  const { t: trans }: any = useTranslation()
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(15)
  const [search, setSearch] = useState('')
  const [type, setType] = useState<string[]>([])
  const [brand, setBrand] = useState<string[]>([])
  const [branch, setBranch] = useState<string[]>([])
  const [favorite, setFavorite] = useState<IFavoriteStatus>('DEFAULT')
  const [inventoriesData, setInventoriesData] = useState<GetInventoriesType>()
  const [trigger, setTrigger] = useState(true)

  const onError = useCallback(() => {
    notification(
      notificationProp(
        trans(tkeys.Inventory.MainPage.HeadText),
        trans(tkeys.Inventory.MainPage.noti.fetch.inventory),
        'error',
      ),
    )
  }, [notification, trans])

  const onCompleted = useCallback((data: GetInventoriesResponse) => {
    if (data?.getInventories?.status?.code === StatusCode.SUCCESS) {
      try {
        setInventoriesData(data.getInventories.data)
      } catch (error) {}
    }
  }, [])

  const { loading, refetch, error } = useGetInventories({
    onCompleted,
    onError,
  })

  const handleSearchChange = (value: string) => {
    setSearch(value)
  }

  const handleFavoriteChange = () => {
    setFavorite((prevFavorite) =>
      prevFavorite === 'DEFAULT' ? 'LIKE' : 'DEFAULT',
    )
  }

  const handleClearChange = () => {
    setSearch('')
    setType([])
    setBrand([])
    setBranch([])
    setFavorite('DEFAULT')
  }

  useEffect(() => {
    refetch({
      params: {
        limit: limit,
        pageNo: page,
        search: search,
        favorite: favorite,
        type,
        brand,
        branch,
      },
    })
  }, [limit, page, search, favorite, type, brand, branch, refetch, trigger])

  useEffect(() => {
    if (inventoriesData?.inventories?.length === 0) {
      setPage(inventoriesData?.totalPage === 0 ? 1 : inventoriesData?.totalPage)
    }
  }, [inventoriesData?.inventories, inventoriesData?.totalPage])

  const onPaginationModelChange = (pageSize: number) => {
    setLimit(pageSize)
  }

  return {
    inventoryData: { getInventories: inventoriesData },
    inventoryLoading: loading,
    inventoryError: error,
    handleClearChange,
    inventoryPage: page,
    inventoryLimit: limit,
    inventorySearch: search,
    onPaginationModelChange,
    handleSearchChange,
    setType,
    setPage,
    setBrand,
    setBranch,
    setFavorite,
    favorite,
    handleFavoriteChange,
    inventoryTypeValue: type,
    inventoryBrandValue: brand,
    inventoryBranchValue: branch,
    setTriggerInventories: setTrigger,
  }
}

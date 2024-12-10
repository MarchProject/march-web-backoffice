import { IFavoriteStatus } from '@/core/gql/inventory/getInventoriesQuery'
import {
  GetInventoriesResponse,
  GetInventoriesVariables,
  getInventoriesQuery,
} from '@/core/gql/inventory/getInventoriesQuery'
import {
  InventoryBrand,
  InventoriesResponse,
  InventoryType,
  InventoryBranch,
} from '@/core/model/inventory'
import { notificationProp } from '@/core/notification/inventory/inventory/dialogCustom'
import { StatusCode } from '@/types/response'
import { useLazyQuery } from '@apollo/client'
import { plainToInstance } from 'class-transformer'
import { useEffect, useState } from 'react'
import { tkeys } from '@/translations/i18n'
import { useTranslation } from 'react-i18next'

export const useQueryInventories = ({
  notification,
  triggerBrand,
  triggerBranch,
  triggerType,
  triggerFavorite,
  triggerGetInventoryNames,
  triggerInventory,
}) => {
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(15)
  const [search, setSearch] = useState('')
  const [type, setType] = useState<InventoryType[]>([])
  const [brand, setBrand] = useState<InventoryBrand[]>([])
  const [branch, setBranch] = useState<InventoryBranch[]>([])
  const [favorite, setFavorite] = useState<IFavoriteStatus>('DEFAULT')
  const [inventoriesData, setInventoriesData] = useState<InventoriesResponse>()
  const { t: trans }: any = useTranslation()

  const [
    getInventoriesTrigger,
    { error: getInventoriesError, loading: getInventoriesLoading },
  ] = useLazyQuery<GetInventoriesResponse, GetInventoriesVariables>(
    getInventoriesQuery,
    {
      onCompleted: (data) => {
        if (data?.getInventories?.status?.code === StatusCode.SUCCESS) {
          try {
            const response = plainToInstance(
              InventoriesResponse,
              data.getInventories.data,
            )
            console.log({ response })
            if (response) setInventoriesData(response)
          } catch (error) {
            console.log({ error })
          }
        }
      },
      onError: () => {
        notification(
          notificationProp(
            trans(tkeys.Inventory.MainPage.HeadText),
            trans(tkeys.Inventory.MainPage.noti.fetch.inventory),
            'error',
          ),
        )
      },
    },
  )

  const handleSearchChange = (value: any) => {
    setSearch(value.target.value)
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
    getInventoriesTrigger({
      variables: {
        params: {
          limit: limit,
          pageNo: page,
          search: search,
          favorite: favorite,
          type: type.map((e: any) => {
            return e.id
          }),
          brand: brand.map((e: any) => {
            return e.id
          }),
          branch: branch.map((e: any) => {
            return e.id
          }),
        },
      },
    })
  }, [
    triggerBrand,
    triggerBranch,
    triggerType,
    triggerFavorite,
    triggerGetInventoryNames,
    getInventoriesTrigger,
    triggerInventory,
    limit,
    page,
    search,
    favorite,
    type,
    brand,
    branch,
  ])

  useEffect(() => {
    if (inventoriesData?.inventories?.length === 0) {
      setPage(inventoriesData?.totalPage === 0 ? 1 : inventoriesData?.totalPage)
    }
  }, [inventoriesData?.inventories, inventoriesData?.totalPage])

  const onRow = (rows, reason) => {
    console.log({ rows, reason })
  }

  const onPaginationModelChange = (model, _) => {
    setLimit(model.pageSize)
  }

  return {
    inventoryData: { getInventories: inventoriesData },
    inventoryLoading: getInventoriesLoading,
    inventoryError: getInventoriesError,
    handleClearChange,
    inventoryPage: page,
    inventoryLimit: limit,
    inventorySearch: search,
    onPaginationModelChange,
    onRow,
    handleChangeInventory: handleSearchChange,
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
  }
}

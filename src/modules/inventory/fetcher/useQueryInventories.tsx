import { IFavoriteStatus } from '@/core/gql/inventory/getInventoriesQuery'
import {
  GetInventoriesResponse,
  GetInventoriesVariables,
  getInventoriesQuery,
} from '@/core/gql/inventory/getInventoriesQuery'
import {
  BrandType,
  InventoriesResponse,
  InventoryType,
} from '@/core/model/inventory'
import { notificationFetchInventoryErrorProp } from '@/core/notification'
import { StatusCode } from '@/types/response'
import { useLazyQuery } from '@apollo/client'
import { plainToInstance } from 'class-transformer'
import { useEffect, useState } from 'react'

export const useQueryInventories = ({
  notification,
  triggerBrand,
  triggerType,
  triggerFavorite,
  triggerGetInventoryNames,
  triggerInventory,
}) => {
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(15)
  const [search, setSearch] = useState('')
  const [type, setType] = useState<InventoryType[]>([])
  const [brand, setBrand] = useState<BrandType[]>([])
  const [favorite, setFavorite] = useState<IFavoriteStatus>('DEFAULT')
  const [inventoriesData, setInventoriesData] = useState<InventoriesResponse>()

  const [
    getInventoriesTrigger,
    { error: getInventoriesError, loading: getInventoriesLoading },
  ] = useLazyQuery<GetInventoriesResponse, GetInventoriesVariables>(
    getInventoriesQuery,
    {
      onCompleted: (data) => {
        if (data?.getInventories?.status?.code === StatusCode.SUCCESS) {
          const response = plainToInstance(
            InventoriesResponse,
            data.getInventories.data,
          )

          if (response) setInventoriesData(response)
        }
      },
      onError: () => {
        notification(notificationFetchInventoryErrorProp('Inventories Error'))
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
        },
      },
    })
  }, [
    triggerBrand,
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
    setFavorite,
    favorite,
    handleFavoriteChange,
    inventoryTypeValue: type,
    inventoryBrandValue: brand,
  }
}

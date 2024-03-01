import { useNotificationContext } from '@/context/notification'
import { GetBrandInventoryVariables } from '@/core/gql/inventory/getBrandsInventoryQuery'
import { GetInventoriesBrandResponse } from '@/core/gql/inventory/getBrandsInventoryQuery'
import { getInventoryBrandsQuery } from '@/core/gql/inventory/getBrandsInventoryQuery'
import { InventoryBrand } from '@/core/model/inventory'
import { notificationFetchInventoryErrorProp } from '@/core/notification'
import { StatusCode } from '@/types/response'
import { useLazyQuery } from '@apollo/client'
import { AutocompleteInputChangeReason } from '@mui/material'
import { plainToInstance } from 'class-transformer'
import { useCallback, useEffect, useState } from 'react'

interface IUseQueryInventoryBrandProps {
  trigger: boolean
}

export const useQueryInventoryBrand = ({
  trigger,
}: IUseQueryInventoryBrandProps) => {
  const { notification } = useNotificationContext()
  const [search, setSearch] = useState<string>('')
  const [inventoriesBrandData, setInventoriesBrandData] = useState<
    InventoryBrand[]
  >([])

  const [
    getInventoryBrandsTrigger,
    { loading: getInventoryBrandsLoading, error: getInventoryBrandsError },
  ] = useLazyQuery<GetInventoriesBrandResponse, GetBrandInventoryVariables>(
    getInventoryBrandsQuery,
    {
      onCompleted: (data) => {
        if (data?.getInventoryBrands?.status?.code === StatusCode.SUCCESS) {
          const response = plainToInstance(
            InventoryBrand,
            data.getInventoryBrands.data,
          )
          if (response) setInventoriesBrandData(response)
        } else {
          notification(notificationFetchInventoryErrorProp('Brand Error'))
        }
      },
      onError: () => {
        notification(notificationFetchInventoryErrorProp('Brand Error'))
      },
    },
  )

  const onInputBrandChange = useCallback(
    (
      _: React.SyntheticEvent,
      value: string,
      __: AutocompleteInputChangeReason,
    ) => {
      if (value.length < 40) {
        setSearch(value)
      }
    },
    [setSearch],
  )

  useEffect(() => {
    getInventoryBrandsTrigger({
      variables: {
        params: {
          search,
        },
      },
    })
  }, [getInventoryBrandsTrigger, search, trigger])

  return {
    inventoriesBrandData: inventoriesBrandData,
    inventoriesBrandDataError: getInventoryBrandsError,
    inventoriesBrandLoading: getInventoryBrandsLoading,
    handleSearchInventoryBrand: onInputBrandChange,
  }
}

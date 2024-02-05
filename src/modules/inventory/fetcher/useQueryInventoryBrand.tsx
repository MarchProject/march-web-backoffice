import { useNotificationContext } from '@/context/notification'
import { GetBrandInventoryVariables } from '@/core/gql/inventory/getBrandsInventoryQuery'
import { GetInventoriesBrandResponse } from '@/core/gql/inventory/getBrandsInventoryQuery'
import { getBrandsInventoryQuery } from '@/core/gql/inventory/getBrandsInventoryQuery'
import { BrandType } from '@/core/model/inventory'
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
  const [inventoriesBrandData, setInventoriesBrandData] = useState<BrandType[]>(
    [],
  )

  const [
    getBrandTypesTrigger,
    { loading: getBrandTypesLoading, error: getBrandTypesError },
  ] = useLazyQuery<GetInventoriesBrandResponse, GetBrandInventoryVariables>(
    getBrandsInventoryQuery,
    {
      onCompleted: (data) => {
        if (data?.getBrandsInventory?.status?.code === StatusCode.SUCCESS) {
          const response = plainToInstance(
            BrandType,
            data.getBrandsInventory.data,
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
    getBrandTypesTrigger({
      variables: {
        params: {
          search,
        },
      },
    })
  }, [getBrandTypesTrigger, search, trigger])

  return {
    inventoriesBrandData: inventoriesBrandData,
    inventoriesBrandDataError: getBrandTypesError,
    inventoriesBrandLoading: getBrandTypesLoading,
    handleSearchInventoryBrand: onInputBrandChange,
  }
}

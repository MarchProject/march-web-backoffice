import { useNotificationContext } from '@/context/notification'
import { GetInventoriesBrandVariables } from '@/core/gql/inventory/getInventoriesBrandQuery'
import { GetInventoriesBrandData } from '@/core/gql/inventory/getInventoriesBrandQuery'
import { getInventoriesBrandQuery } from '@/core/gql/inventory/getInventoriesBrandQuery'
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
  ] = useLazyQuery<GetInventoriesBrandData, GetInventoriesBrandVariables>(
    getInventoriesBrandQuery,
    {
      onCompleted: (data) => {
        if (data.getBrandTypes.status.code === StatusCode.SUCCESS) {
          const response = plainToInstance(BrandType, data.getBrandTypes.data)
          if (response) setInventoriesBrandData(response)
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

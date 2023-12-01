import { useNotificationContext } from '@/context/notification'
import {
  GetInventoriesTypeData,
  GetInventoriesTypeVariables,
  getInventoriesTypeQuery,
} from '@/core/gql/inventory/inventory'
import { InventoryType } from '@/core/model/inventory'
import { notificationFetchInventoryErrorProp } from '@/core/notification'
import { useLazyQuery } from '@apollo/client'
import { AutocompleteInputChangeReason } from '@mui/material'
import { plainToInstance } from 'class-transformer'
import { useCallback, useEffect, useState } from 'react'

interface IUseQueryInventoryTypeProps {
  trigger: boolean
}

export const useQueryInventoryType = ({
  trigger,
}: IUseQueryInventoryTypeProps) => {
  const { notification } = useNotificationContext()
  const [search, setSearch] = useState<string>('')
  const [inventoriesTypeData, setInventoriesTypeData] = useState<
    InventoryType[]
  >([])
  const [
    getInventoryTypesTrigger,
    { error: getInventoryTypesError, loading: getInventoryTypesLoading },
  ] = useLazyQuery<GetInventoriesTypeData, GetInventoriesTypeVariables>(
    getInventoriesTypeQuery,
    {
      onCompleted: (data) => {
        const response = plainToInstance(InventoryType, data.getInventoryTypes)

        if (response) setInventoriesTypeData(response)
      },
      onError: () => {
        notification(notificationFetchInventoryErrorProp('Type Error'))
      },
    },
  )

  const onInputTypeChange = useCallback(
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
    getInventoryTypesTrigger({
      variables: {
        params: {
          search,
        },
      },
    })
  }, [getInventoryTypesTrigger, search, trigger])

  return {
    inventoriesTypeData: inventoriesTypeData,
    inventoriesTypeDataError: getInventoryTypesError,
    inventoriesTypeLoading: getInventoryTypesLoading,
    handleSearchInventoryType: onInputTypeChange,
  }
}

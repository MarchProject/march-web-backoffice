import { useNotificationContext } from '@/context/notification'
import {
  GetTypesInventoryResponse,
  GetInventoriesTypeVariables,
  getInventoryTypesQuery,
} from '@/core/gql/inventory/getTypesInventoryQuery'
import { InventoryType } from '@/core/model/inventory'
import { notificationFetchInventoryErrorProp } from '@/core/notification'
import { StatusCode } from '@/types/response'
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
    getTypesInventory,
    { error: getInventoryTypesError, loading: getInventoryTypesLoading },
  ] = useLazyQuery<GetTypesInventoryResponse, GetInventoriesTypeVariables>(
    getInventoryTypesQuery,
    {
      onCompleted: (data) => {
        if (data?.getInventoryTypes?.status?.code === StatusCode.SUCCESS) {
          const response = plainToInstance(
            InventoryType,
            data.getInventoryTypes.data,
          )
          if (response) setInventoriesTypeData(response)
        } else {
          notification(notificationFetchInventoryErrorProp('Type Error'))
        }
      },
      onError: () => {},
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
    getTypesInventory({
      variables: {
        params: {
          search,
        },
      },
    })
  }, [getTypesInventory, search, trigger])

  return {
    inventoriesTypeData: inventoriesTypeData,
    inventoriesTypeDataError: getInventoryTypesError,
    inventoriesTypeLoading: getInventoryTypesLoading,
    handleSearchInventoryType: onInputTypeChange,
  }
}

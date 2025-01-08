import { useNotificationContext } from '@/context/notification'
import {
  GetTypesInventoryResponse,
  GetInventoriesTypeVariables,
  getInventoryTypesQuery,
} from '@/core/gql/inventory/getTypesInventoryQuery'
import { InventoryType } from '@/core/model/inventory'
import { StatusCode } from '@/types/response'
import { useLazyQuery } from '@apollo/client'
import { AutocompleteInputChangeReason } from '@mui/material'
import { plainToInstance } from 'class-transformer'
import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { tkeys } from '@/translations/i18n'
import { notificationProp } from '@/core/notification/inventory/inventory/dialogCustom'
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
          notification(
            notificationProp(
              trans(tkeys.Inventory.MainPage.HeadText),
              trans(tkeys.Inventory.MainPage.noti.fetch.type),
              'error',
            ),
          )
        }
      },
      onError: () => {
        notification(
          notificationProp(
            trans(tkeys.Inventory.MainPage.HeadText),
            trans(tkeys.Inventory.MainPage.noti.fetch.type),
            'error',
          ),
        )
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

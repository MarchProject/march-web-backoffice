import { EnumSeverity, useNotificationContext } from '@/context/notification'
import {
  GetBranchsInventoryVariables,
  GetInventoriesBranchResponse,
  getInventoryBranchsQuery,
} from '@/core/gql/inventory/getBranchsInventoryQuery'

import { InventoryBranch } from '@/core/model/inventory'
import { StatusCode } from '@/types/response'
import { useLazyQuery } from '@apollo/client'
import { AutocompleteInputChangeReason } from '@mui/material'
import { plainToInstance } from 'class-transformer'
import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { tkeys } from '@/translations/i18n'
import { notificationProp } from '@/core/notification/inventory/inventory/dialogUpload'
interface IUseQueryInventoryBranchProps {
  trigger: boolean
}

export const useQueryInventoryBranch = ({
  trigger,
}: IUseQueryInventoryBranchProps) => {
  const { t: trans }: any = useTranslation()
  const { notification } = useNotificationContext()
  const [search, setSearch] = useState<string>('')
  const [inventoriesBranchData, setInventoriesBranchData] = useState<
    InventoryBranch[]
  >([])

  const [
    getInventoryBranchsTrigger,
    { loading: getInventoryBranchsLoading, error: getInventoryBranchsError },
  ] = useLazyQuery<GetInventoriesBranchResponse, GetBranchsInventoryVariables>(
    getInventoryBranchsQuery,
    {
      onCompleted: (data) => {
        if (data?.getInventoryBranchs?.status?.code === StatusCode.SUCCESS) {
          const response = plainToInstance(
            InventoryBranch,
            data.getInventoryBranchs.data,
          )
          if (response) setInventoriesBranchData(response)
        } else {
          notification(
            notificationProp(
              trans(tkeys.Inventory.MainPage.HeadText),
              trans(tkeys.Inventory.MainPage.noti.fetch.branch),
              EnumSeverity.error,
            ),
          )
        }
      },
      onError: () => {
        notification(
          notificationProp(
            trans(tkeys.Inventory.MainPage.HeadText),
            trans(tkeys.Inventory.MainPage.noti.fetch.branch),
            EnumSeverity.error,
          ),
        )
      },
    },
  )

  const onInputBranchChange = useCallback(
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
    getInventoryBranchsTrigger({
      variables: {
        params: {
          search,
        },
      },
    })
  }, [getInventoryBranchsTrigger, search, trigger])

  return {
    inventoriesBranchData: inventoriesBranchData,
    inventoriesBranchDataError: getInventoryBranchsError,
    inventoriesBranchLoading: getInventoryBranchsLoading,
    handleSearchInventoryBranch: onInputBranchChange,
  }
}

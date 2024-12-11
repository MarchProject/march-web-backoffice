import { useNotificationContext } from '@/context/notification'
import {
  GetBranchsInventoryType,
  GetInventoriesBranchResponse,
} from '@/core/gql/inventory/getBranchsInventoryQuery'
import { StatusCode } from '@/types/response'
import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { tkeys } from '@/translations/i18n'
import { notificationProp } from '@/core/notification/inventory/inventory/dialogCustom'
import { getInventoryBranch } from '../fetcher/getInventoryBranch'

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
    GetBranchsInventoryType[]
  >([])

  const onCompleted = (data: GetInventoriesBranchResponse) => {
    if (data?.getInventoryBranchs?.status?.code === StatusCode.SUCCESS) {
      setInventoriesBranchData(data.getInventoryBranchs.data)
    } else {
      notification(
        notificationProp(
          trans(tkeys.Inventory.MainPage.HeadText),
          trans(tkeys.Inventory.MainPage.noti.fetch.branch),
          'error',
        ),
      )
    }
  }

  const onError = () => {
    notification(
      notificationProp(
        trans(tkeys.Inventory.MainPage.HeadText),
        trans(tkeys.Inventory.MainPage.noti.fetch.branch),
        'error',
      ),
    )
  }

  const {
    refetch,
    loading: getInventoryBranchsLoading,
    error: getInventoryBranchsError,
  } = getInventoryBranch({ onCompleted, onError })

  const onInputBranchChange = useCallback(
    (value: string) => {
      setSearch(value)
    },
    [setSearch],
  )

  useEffect(() => {
    refetch({
      params: {
        search,
      },
    })
  }, [refetch, search, trigger])

  return {
    inventoriesBranchData: inventoriesBranchData,
    inventoriesBranchDataError: getInventoryBranchsError,
    inventoriesBranchLoading: getInventoryBranchsLoading,
    handleSearchInventoryBranch: onInputBranchChange,
  }
}

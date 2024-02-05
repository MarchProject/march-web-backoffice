import { useNotificationContext } from '@/context/notification'
import { InventoryNamesResponse } from '@/core/gql/inventory/getInventoryNamesQuery'
import { getInventoryNamesQuery } from '@/core/gql/inventory/getInventoryNamesQuery'
import { InventoryNamesClass } from '@/core/model/inventory'
import { notificationFetchInventoryErrorProp } from '@/core/notification'
import { StatusCode } from '@/types/response'
import { useLazyQuery } from '@apollo/client'
import { plainToInstance } from 'class-transformer'
import { useEffect, useState } from 'react'

interface useGetInventoryNames {
  triggerGetInventoryNames: boolean
}

export const useGetInventoryNames = ({
  triggerGetInventoryNames,
}: useGetInventoryNames) => {
  const { notification } = useNotificationContext()
  const [dataTranform, setDataTranform] = useState<InventoryNamesClass[]>([])
  const [getInventoryNames, { loading, error }] = useLazyQuery<
    InventoryNamesResponse,
    any
  >(getInventoryNamesQuery, {
    onCompleted: (data) => {
      if (data?.getInventoryNames?.status?.code === StatusCode.SUCCESS) {
        const response = plainToInstance(
          InventoryNamesClass,
          data.getInventoryNames.data,
        )
        if (response) setDataTranform(response)
      } else {
        notification(notificationFetchInventoryErrorProp('Names Error'))
      }
    },
    onError: () => {
      notification(notificationFetchInventoryErrorProp('Names Error'))
    },
  })

  useEffect(() => {
    getInventoryNames()
  }, [getInventoryNames, triggerGetInventoryNames])

  return {
    inventoryNamesData: dataTranform,
    inventoryNamesError: error,
    inventoryNamesLoading: loading,
  }
}

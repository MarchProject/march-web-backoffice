import {
  GetInventoryAllDeletedResponse,
  getInventoryAllDeletedQuery,
} from '@/core/gql/inventory/getInventoryAllDeletedQuery'
import { InventoryTrash } from '@/core/model/inventory'
import { notificationFetchInventoryErrorProp } from '@/core/notification'
import { StatusCode } from '@/types/response'
import { useLazyQuery } from '@apollo/client'
import { plainToInstance } from 'class-transformer'
import { useCallback, useEffect, useState } from 'react'

export const useQueryTrashHandler = ({ notification }) => {
  const [trashData, setTrashData] = useState<InventoryTrash>(null)
  const [trigger, setTrigger] = useState(true)

  const [getInventoryAllDeleted, { loading: getInventoryAllDeletedLoaing }] =
    useLazyQuery<GetInventoryAllDeletedResponse, any>(
      getInventoryAllDeletedQuery,
      {
        onCompleted: (data) => {
          if (
            data?.getInventoryAllDeleted?.status?.code === StatusCode.SUCCESS
          ) {
            const response = plainToInstance(
              InventoryTrash,
              data.getInventoryAllDeleted.data,
            )

            if (response) setTrashData(response)
          } else {
            notification(notificationFetchInventoryErrorProp('Trash Error'))
          }
        },
        onError: () => {
          notification(notificationFetchInventoryErrorProp('Trash Error'))
        },
      },
    )

  const getInventoryTrashHandle = useCallback(() => {
    getInventoryAllDeleted()
  }, [getInventoryAllDeleted])

  useEffect(() => {
    getInventoryTrashHandle()
  }, [getInventoryTrashHandle, trigger])

  return {
    trashData,
    setTriggerTrash: setTrigger,
    getInventoryAllDeletedLoaing,
  }
}

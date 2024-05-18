import { EnumSeverity, useNotificationContext } from '@/context/notification'
import {
  getPermissionQuery,
  GetPermissionResponse,
} from '@/core/gql/user/getPermission'
import { PermissonUserClass } from '@/core/model/user'
import { notificationProp } from '@/core/notification/inventory/inventory/dialogUpload'
import { tkeys } from '@/translations/i18n'
import { StatusCode } from '@/types/response'
import { useLazyQuery } from '@apollo/client'
import { plainToInstance } from 'class-transformer'
import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

interface IUseGetPermission {
  triggerGetPermission:  boolean
}

export const useGetPermission = ({
  triggerGetPermission,
}: IUseGetPermission) => {
  const { notification } = useNotificationContext()
  const { t: trans }: any = useTranslation()
  const [dataTranform, setDataTranform] = useState<PermissonUserClass>(null)
  const [getPermission, { loading, error }] = useLazyQuery<
    GetPermissionResponse,
    any
  >(getPermissionQuery, {
    onCompleted: (data) => {
      if (data?.getPermission?.status?.code === StatusCode.SUCCESS) {
        const response = plainToInstance(
          PermissonUserClass,
          data.getPermission.data,
        )
        if (response) setDataTranform(response)
      } else {
        notification(
          notificationProp(
            trans(tkeys.Inventory.MainPage.HeadText),
            trans(tkeys.Inventory.MainPage.noti.fetch.names),
            EnumSeverity.error,
          ),
        )
      }
    },
    onError: () => {
      notification(
        notificationProp(
          trans(tkeys.Inventory.MainPage.HeadText),
          trans(tkeys.Inventory.MainPage.noti.fetch.names),
          EnumSeverity.error,
        ),
      )
    },
  })

  useEffect(() => {
    getPermission()
  }, [getPermission, triggerGetPermission])

  return {
    getPermissionData: dataTranform,
    getPermissionError: error,
    getPermissionLoading: loading,
  }
}

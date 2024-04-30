import { useCallback, useState } from 'react'
import { IValidatedValues } from '../dialog/DialogEditor/DialogUploadCsv/view/UploadCsvView/interface'
import {
  UploadInventoryResponse,
  UploadInventoryVariable,
  uploadInventoryMutation,
} from '@/core/gql/inventory/uploadInventoryMutation'
import { tranFromUploadCsv } from '@/modules/inventory/dto/uploadCsv.dto'
import { notificationProp } from '@/core/notification/inventory/inventory/dialogUpload'
import { useMutation } from '@apollo/client'
import { EnumSeverity, useNotificationContext } from '@/context/notification'
import { StatusCode } from '@/types/response'
import { useTranslation } from 'react-i18next'
import { tkeys } from '@/translations/i18n'

export const useUploadCsvMutation = ({
  inventoriesTypeData,
  inventoriesBrandData,
  inventoriesBranchData,
  setTriggerGetInventoryNames,
  handleClose,
}) => {
  const { notification } = useNotificationContext()
  const { t: trans }: any = useTranslation()
  const [isPass, setIsPass] = useState(true)

  const [uploadInventory, { loading }] = useMutation<
    UploadInventoryResponse,
    UploadInventoryVariable
  >(uploadInventoryMutation, {
    onCompleted: (data) => {
      setTriggerGetInventoryNames((prev) => !prev)
      if (data?.uploadInventory?.status?.code === StatusCode.SUCCESS) {
        if (data?.uploadInventory?.data?.success === true) {
          notification(
            notificationProp(
              trans(tkeys.Inventory.MainPage.HeadText),
              trans(tkeys.Inventory.MainPage.noti.upload.success),
              EnumSeverity.success,
            ),
          )
          setIsPass(true)
          handleClose()
        } else {
          notification(
            notificationProp(
              trans(tkeys.Inventory.MainPage.HeadText),
              trans(
                tkeys.Inventory.MainPage.noti.upload[
                  `${data?.uploadInventory?.data?.reason}`
                ],
              ),
              EnumSeverity.error,
            ),
          )
          setIsPass(false)
        }
      } else {
        notification(
          notificationProp(
            trans(tkeys.Inventory.MainPage.HeadText),
            trans(tkeys.Inventory.MainPage.noti.upload.somethingWrong),
            EnumSeverity.error,
          ),
        )
      }
    },
    onError: () => {
      notification(
        notificationProp(
          trans(tkeys.Inventory.MainPage.HeadText),
          trans(tkeys.Inventory.MainPage.noti.upload.somethingWrong),
          EnumSeverity.error,
        ),
      )
    },
  })

  const uploadCsvCallback = useCallback(
    (validatedValues: IValidatedValues[]) => {
      uploadInventory({
        variables: tranFromUploadCsv(
          validatedValues[0],
          inventoriesTypeData,
          inventoriesBrandData,
          inventoriesBranchData,
        ),
      })
    },
    [
      inventoriesBrandData,
      inventoriesBranchData,
      inventoriesTypeData,
      uploadInventory,
    ],
  )

  return {
    uploadCsvCallback,
    uploadInventory,
    uploadInventoryLoading: loading,
    isPass,
    setIsPass,
  }
}

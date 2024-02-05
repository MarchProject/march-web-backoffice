import { useCallback, useState } from 'react'
import { IValidatedValues } from '../dialog/DialogEditor/DialogUploadCsv/view/UploadCsvView/interface'
import {
  UploadInventoryResponse,
  UploadInventoryVariable,
  uploadInventoryMutation,
} from '@/core/gql/inventory/uploadInventoryMutation'
import { tranFromUploadCsv } from '@/modules/inventory/dto/uploadCsv.dto'
import {
  notificationDialogUploadErrorProp,
  notificationDialogUploadSuccessProp,
} from '@/core/notification/inventory/inventory/dialogUpload'
import { useMutation } from '@apollo/client'
import { useNotificationContext } from '@/context/notification'
import { StatusCode } from '@/types/response'

export const useUploadCsvMutation = ({
  inventoriesTypeData,
  inventoriesBrandData,
  setTriggerGetInventoryNames,
  handleClose,
}) => {
  const { notification } = useNotificationContext()
  const [isPass, setIsPass] = useState(true)

  const [uploadInventory, { loading }] = useMutation<
    UploadInventoryResponse,
    UploadInventoryVariable
  >(uploadInventoryMutation, {
    onCompleted: (data) => {
      setTriggerGetInventoryNames((prev) => !prev)
      if (data?.uploadInventory?.status?.code === StatusCode.SUCCESS) {
        if (data?.uploadInventory?.data?.success === true) {
          notification(notificationDialogUploadSuccessProp)
          setIsPass(true)
          handleClose()
        } else {
          notification(
            notificationDialogUploadErrorProp(
              data?.uploadInventory?.data?.reason,
            ),
          )
          setIsPass(false)
        }
      } else {
        notification(notificationDialogUploadErrorProp('Upload Failed'))
      }
    },
    onError: () => {
      notification(notificationDialogUploadErrorProp('Upload Failed'))
    },
  })

  const uploadCsvCallback = useCallback(
    (validatedValues: IValidatedValues[]) => {
      uploadInventory({
        variables: tranFromUploadCsv(
          validatedValues[0],
          inventoriesTypeData,
          inventoriesBrandData,
        ),
      })
    },
    [inventoriesBrandData, inventoriesTypeData, uploadInventory],
  )

  return {
    uploadCsvCallback,
    uploadInventory,
    uploadInventoryLoading: loading,
    isPass,
    setIsPass,
  }
}

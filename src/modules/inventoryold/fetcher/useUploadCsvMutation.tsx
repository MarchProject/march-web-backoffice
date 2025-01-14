import { useCallback, useState } from 'react'
import { IValidatedValues } from '../dialog/DialogEditor/DialogUploadCsv/view/UploadCsvView/interface'
import {
  UploadInventoryResponse,
  UploadInventoryVariable,
  uploadInventoryMutation,
} from '@/core/gql/inventory/uploadInventoryMutation'
import { tranFromUploadCsv } from '@/modules/inventory/dto/uploadCsv.dto'
import { useMutation } from '@apollo/client'
import { useNotificationContext } from '@/context/notification'
import { StatusCode } from '@/types/response'
import {
  notificationInternalErrorProp,
  notificationMutationProp,
} from '@/core/notification'

export const useUploadCsvMutation = ({
  inventoriesTypeData,
  inventoriesBrandData,
  inventoriesBranchData,
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
          notification(
            notificationMutationProp(
              data?.uploadInventory?.status.message,
              'success',
            ),
          )
          setIsPass(true)
          handleClose()
        } else {
          notification(
            notificationMutationProp(
              data?.uploadInventory?.status.message,
              'error',
            ),
          )
          setIsPass(false)
        }
      } else {
        notification(
          notificationMutationProp(
            data?.uploadInventory?.status.message,
            'error',
          ),
        )
      }
    },
    onError: (error) => {
      if (error.message === 'Unauthorized Role') {
        notification(notificationInternalErrorProp('Permission.', 'Server'))
      } else {
        notification(notificationInternalErrorProp('Update Failed.'))
      }
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

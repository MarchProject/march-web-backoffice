import { useCallback, useEffect, useState } from 'react'
import { IValidatedValues } from './view/UploadCsvView/interface'
import { hasDuplicateName } from '@/utils/common/utils'
import { useMutation } from '@apollo/client'
import {
  UploadInventoryData,
  UploadInventoryVariable,
  uploadInventoryMutation,
} from '@/core/gql/inventory'
import { tranFromUploadCsv } from '@/modules/inventory/dto/uploadCsv.dto'
import { EnumSeverity, useNotificationContext } from '@/context/notification'

const notificationSuccessProp = {
  severity: EnumSeverity.success,
  title: 'Inventory',
  message: 'Upload Success',
}

const notificationErrorProp = (message: string) => {
  return {
    severity: EnumSeverity.error,
    title: 'Inventory',
    message: `${message}`,
  }
}

export const useControllerUplaod = ({
  inventoriesTypeData,
  inventoriesBrandData,
  setTriggerGetInventoryNames,
}) => {
  const { notification } = useNotificationContext()
  const { uploadCsvCallback } = useUploadCsvMutation({
    inventoriesTypeData,
    inventoriesBrandData,
    setTriggerGetInventoryNames,
    notification,
  })
  const { uploadHandle, isValid, onUploadHandle } = useUploadForm({
    uploadCsvCallback,
  })

  return {
    uploadHandle,
    isValid,
    onUploadHandle,
  }
}

const useUploadCsvMutation = ({
  inventoriesTypeData,
  inventoriesBrandData,
  setTriggerGetInventoryNames,
  notification,
}) => {
  const [
    uploadInventory,
    { loading: _loading, error, data: uploadInventoryData },
  ] = useMutation<UploadInventoryData, UploadInventoryVariable>(
    uploadInventoryMutation,
  )
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
  useEffect(() => {
    if (error) {
      notificationErrorProp('Upload Failed')
    }
  }, [error, uploadInventoryData?.uploadInventory?.reason])

  useEffect(() => {
    if (uploadInventoryData?.uploadInventory) {
      setTriggerGetInventoryNames((prev) => !prev)

      if (uploadInventoryData.uploadInventory.success === true) {
        notification(notificationSuccessProp)
      } else {
        notification(
          notificationErrorProp(uploadInventoryData?.uploadInventory?.reason),
        )
      }
    }
  }, [notification, setTriggerGetInventoryNames, uploadInventoryData])

  return {
    uploadCsvCallback,
    uploadInventory,
  }
}

const useUploadForm = ({ uploadCsvCallback }) => {
  const [validatedValues, setValidatedValues] = useState<IValidatedValues[]>([])
  const [isValid, setIsValid] = useState<boolean>(false)

  const uploadHandle = useCallback((value: IValidatedValues[]) => {
    setValidatedValues(value)
  }, [])

  const checkDuplicated = hasDuplicateName(validatedValues)

  const onUploadHandle = useCallback(() => {
    uploadCsvCallback(validatedValues)
  }, [uploadCsvCallback, validatedValues])

  useEffect(() => {
    if (validatedValues.length > 0) {
      if (validatedValues.some((e) => e.inValidData.length > 0)) {
        setIsValid(false)
      } else if (checkDuplicated) {
        setIsValid(false)
      } else {
        setIsValid(true)
      }
    }
  }, [validatedValues, checkDuplicated, uploadCsvCallback])

  return {
    isValid,
    uploadHandle,
    onUploadHandle,
  }
}

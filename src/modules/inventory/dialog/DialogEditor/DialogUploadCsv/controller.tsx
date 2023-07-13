import { useCallback, useEffect, useState } from 'react'
import { IValidatedValues } from './view/UploadCsvView/interface'
import { hasDuplicateName } from '@/utils/common/utils'
import {
  UploadInventoryData,
  UploadInventoryVariable,
  uploadInventoryMutation,
} from '@/core/gql/inventory'
import { tranFromUploadCsv } from '@/modules/inventory/dto/uploadCsv.dto'
import { EnumSeverity, useNotificationContext } from '@/context/notification'
import { useMutationData } from '@/core/adapter/hook/useMutationData'
import { MutateKey } from '@/core/adapter/interface'

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
  handleClose,
}) => {
  const { notification } = useNotificationContext()
  const { uploadCsvCallback, isPass, setIsPass } = useUploadCsvMutation({
    inventoriesTypeData,
    inventoriesBrandData,
    setTriggerGetInventoryNames,
    notification,
    handleClose,
  })
  const { uploadHandle, isValid, onUploadHandle } = useUploadForm({
    uploadCsvCallback,
    setIsPass,
  })

  return {
    isPass,
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
  handleClose,
}) => {
  const [isPass, setIsPass] = useState(true)


  const { trigger: uploadInventory } = useMutationData<
    MutateKey.inventory,
    UploadInventoryData,
    UploadInventoryVariable
  >(MutateKey.inventory, null, uploadInventoryMutation, {
    onSuccess: (data: UploadInventoryData) => {
      setTriggerGetInventoryNames((prev) => !prev)
      if (data.uploadInventory.success === true) {
        notification(notificationSuccessProp)
        setIsPass(true)
        handleClose()
      } else {
        notification(notificationErrorProp(data?.uploadInventory?.reason))
        setIsPass(false)
      }
    },
    onError: () => {
      notificationErrorProp('Upload Failed')
    },
    globalLoading: true,
  })

  const uploadCsvCallback = useCallback(
    (validatedValues: IValidatedValues[]) => {
      uploadInventory(
        tranFromUploadCsv(
          validatedValues[0],
          inventoriesTypeData,
          inventoriesBrandData,
        ),
      )
    },
    [inventoriesBrandData, inventoriesTypeData, uploadInventory],
  )

  return {
    uploadCsvCallback,
    uploadInventory,
    isPass,
    setIsPass,
  }
}

const useUploadForm = ({ uploadCsvCallback, setIsPass }) => {
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
        setIsPass(false)
        setIsValid(false)
      } else if (checkDuplicated) {
        setIsPass(false)
        setIsValid(false)
      } else {
        setIsValid(true)
        setIsPass(true)
      }
    } else {
      setIsValid(false)
      setIsPass(false)
    }
  }, [validatedValues, checkDuplicated, uploadCsvCallback, setIsPass])

  return {
    isValid,
    uploadHandle,
    onUploadHandle,
  }
}

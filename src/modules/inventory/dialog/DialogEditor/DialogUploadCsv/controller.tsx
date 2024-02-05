import { useCallback, useEffect, useState } from 'react'
import { IValidatedValues } from './view/UploadCsvView/interface'
import { hasDuplicateName } from '@/utils/common/utils'
import { useUploadCsvMutation } from '../../../fetcher/useUploadCsvMutation'

export const useControllerUplaod = ({
  inventoriesTypeData,
  inventoriesBrandData,
  setTriggerGetInventoryNames,
  handleClose,
}) => {
  const { uploadCsvCallback, isPass, setIsPass } = useUploadCsvMutation({
    inventoriesTypeData,
    inventoriesBrandData,
    setTriggerGetInventoryNames,
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

import { useCallback, useEffect, useState } from 'react'
import { IValidatedValues } from './view/UploadCsvView/interface'
import { hasDuplicateName } from '@/utils/common/utils'

export const useControllerUplaod = () => {
  const { uploadHandle, isValid } = useUploadForm()

  return {
    uploadHandle,
    isValid,
  }
}

const useUploadForm = () => {
  const [validatedValues, setValidatedValues] = useState<IValidatedValues[]>([])
  const [isValid, setIsValid] = useState<boolean>(false)
  const uploadHandle = useCallback((value: IValidatedValues[]) => {
    console.log({ value })
    setValidatedValues(value)
  }, [])

  console.log({ validatedValues })
  const checkDuplicated = hasDuplicateName(validatedValues)
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
  }, [validatedValues, checkDuplicated])

  return {
    isValid,
    uploadHandle,
  }
}

import { IDataTemplateCsv, IDataTemplateCsvValidate } from '@/constant/csvData'
import { useNotificationContext } from '@/context/notification'
import { ParseResult } from 'papaparse'
import { useEffect, useState } from 'react'
import { tranfromCsvFile } from './upload.dto'
import {
  GetInventoryTypes,
  InventoryNames,
  getInventoryNamesQuery,
} from '@/core/gql/inventory'
import { validateExpiryDate } from './validate/expiryDateValidate'
import { ICompleteValues, IValidatedValues } from './interface'
import { useQuery } from '@apollo/client'
import { plainToInstance } from 'class-transformer'
import { InventoryNamesClass } from '@/core/model/inventory'

interface IUseControllerUploadCsvViewProps {
  inventoryNamesData: InventoryNamesClass[]
  inventoriesTypeData: GetInventoryTypes[]
  inventoriesBrandData: GetInventoryTypes[]
  uploadHandle: (value: IValidatedValues[]) => void
}

export const useControllerUploadCsvView = ({
  inventoryNamesData,
  inventoriesTypeData,
  inventoriesBrandData,
  uploadHandle,
}: IUseControllerUploadCsvViewProps) => {
  const { notification } = useNotificationContext()
  const { onChangeFile, onCompleteValue, validatedValues, removeItem } =
    useHandleUploadCsv({
      inventoryNamesData,
      inventoriesTypeData,
      inventoriesBrandData,
      uploadHandle,
    })
  return {
    removeItem,
    validatedValues,
    onChangeFile,
    onCompleteValue,
  }
}

const validateDataCsv = (
  result: ICompleteValues,
  inventoriesTypeData: GetInventoryTypes[],
  inventoriesBrandData: GetInventoryTypes[],
  inventoryNamesData: InventoryNamesClass[],
) => {
  const _values = result.data
  const values = tranfromCsvFile(_values)
  const requiredFields = ['name', 'type', 'brand', 'amount', 'price']
  const integerFields = [
    'reorderLevel',
    'priceMember',
    'favorite',
    'weight',
    'width',
    'height',
    'length',
  ]
  const stringFields = ['description', 'sku', 'expiryDate']
  //sku description expirydate
  const ids = []
  const data: IDataTemplateCsvValidate[] = values.map((obj) => {
    let isValid = true
    const invalidFields = []

    if (obj.id === undefined || obj.id === null || obj.id === '') {
      invalidFields.push({ name: 'id', message: 'not found' })
    } else if (!ids.includes(obj.id)) {
      ids.push(obj.id)
    } else {
      isValid = false
      invalidFields.push({ name: 'id', message: 'duplicated' })
    }

    requiredFields.forEach((field) => {
      if (field === 'type') {
        const value = obj[field]
        const findType = inventoriesTypeData.find((e) => e.name === value)

        if (value === undefined || value === null || value === '') {
          isValid = false
          invalidFields.push({
            name: field,
            message: `this field is requried!`,
          })
        } else if (!findType) {
          isValid = false
          invalidFields.push({
            name: field,
            message: `${value} not found!`,
          })
        }
      } else if (field === 'brand') {
        const value = obj[field]
        const findType = inventoriesBrandData.find((e) => e.name === value)
        if (value === undefined || value === null || value === '') {
          isValid = false
          invalidFields.push({
            name: field,
            message: `this field is requried!`,
          })
        } else if (!findType) {
          isValid = false
          invalidFields.push({
            name: field,
            message: `${value} not found!`,
          })
        }
      } else if (field === 'price') {
        const value = obj[field]
        const findInt =
          Number.isInteger(parseInt(value, 10)) && /^\d+$/.test(value)
        if (value === undefined || value === null || value === '') {
          isValid = false
          invalidFields.push({
            name: field,
            message: `this field is requried!`,
          })
        } else if (!findInt) {
          isValid = false
          invalidFields.push({
            name: field,
            message: `${value} is not an integer!`,
          })
        }
      } else if (field === 'amount') {
        const value = obj[field]
        const findInt =
          Number.isInteger(parseInt(value, 10)) && /^\d+$/.test(value)
        if (value === undefined || value === null || value === '') {
          isValid = false
          invalidFields.push({
            name: field,
            message: `this field is requried!`,
          })
        } else if (!findInt) {
          isValid = false
          invalidFields.push({
            name: field,
            message: `${value} is not an integer!`,
          })
        } else if (value.length > 10) {
          isValid = false
          invalidFields.push({
            name: field,
            message: `length exceeds maximum limit!(10)`,
          })
        }
      } else if (field === 'name') {
        const value = obj[field]
        const findName = inventoryNamesData.find((e) => e.name === value)
        if (value === undefined || value === null || value === '') {
          isValid = false
          invalidFields.push({
            name: field,
            message: `this field is requried!`,
          })
        } else if (value.length > 20) {
          isValid = false
          invalidFields.push({
            name: field,
            message: `length exceeds maximum limit!(20)`,
          })
        } else if (findName) {
          isValid = false
          invalidFields.push({
            name: field,
            message: `name is duplicated`,
          })
        }
      }
    })

    integerFields.forEach((field) => {
      const value = obj[field]
      if (value) {
        const findInt =
          Number.isInteger(parseInt(value, 10)) && /^\d+$/.test(value)
        if (field === 'favorite') {
          if (value !== '1' && value !== '0') {
            isValid = false
            invalidFields.push({
              name: field,
              message: `this value must be 1 or 0!`,
            })
          }
        } else {
          if (!findInt) {
            isValid = false
            invalidFields.push({
              name: field,
              message: `${value} is not an integer!`,
            })
          } else if (value.length > 10) {
            isValid = false
            invalidFields.push({
              name: field,
              message: `length exceeds maximum limit!(10)`,
            })
          }
        }
      }
    })

    stringFields.forEach((field) => {
      const value = obj[field]
      if (value) {
        if (field === 'expiryDate') {
          const valid = validateExpiryDate(value)
          if (!valid) {
            isValid = false
            invalidFields.push({
              name: field,
              message: `${value} is not valid. Example (18-11-2024) or not in future`,
            })
          }
        } else if (field === 'sku') {
          if (value.length > 20) {
            isValid = false
            invalidFields.push({
              name: field,
              message: `length exceeds maximum limit!(20)`,
            })
          }
        } else if (field === 'description') {
          if (value.length > 100) {
            isValid = false
            invalidFields.push({
              name: field,
              message: `length exceeds maximum limit!(100)`,
            })
          }
        }
      }
    })

    return {
      ...obj,
      valid: isValid,
      message: isValid ? [] : invalidFields,
    }
  })
  const validData = data.filter((d) => d.valid === true)
  const inValidData = data.filter((d) => d.valid === false)
  return {
    name: result?.name,
    validData,
    inValidData,
  }
}

const useGetNameItems = () => {
  const [dataTranform, setDataTranform] = useState<InventoryNamesClass[]>([])
  const { data, error, loading } = useQuery<InventoryNames>(
    getInventoryNamesQuery,
  )
  console.log({ data })
  useEffect(() => {
    if (data) {
      setDataTranform(
        plainToInstance(InventoryNamesClass, data.getInventoryNames),
      )
    }
  }, [data])

  return {
    inventoryNamesData: dataTranform,
    inventoryNamesError: error,
    inventoryNamesLoading: loading,
  }
}

const useHandleUploadCsv = ({
  inventoryNamesData,
  inventoriesTypeData,
  inventoriesBrandData,
  uploadHandle,
}: IUseControllerUploadCsvViewProps) => {
  // const [selectedFile, setSelectFile] = useState<File[]>(null)
  const [validatedValues, setValidatedValues] = useState<IValidatedValues[]>([])
  const [isValid, setIsValid] = useState<boolean>(false)

  const onCompleteValue = (
    result: ParseResult<IDataTemplateCsv>,
    file: File,
  ) => {
    const results = result.data
    const obj: ICompleteValues = {
      name: file?.name,
      data: results,
    }
    const { validData, inValidData, name } = validateDataCsv(
      obj,
      inventoriesTypeData,
      inventoriesBrandData,
      inventoryNamesData,
    )

    const validatedValue: IValidatedValues = {
      name,
      validData,
      inValidData,
    }
    setValidatedValues((prev) => [...prev, validatedValue])
  }

  useEffect(() => {
    uploadHandle(validatedValues)
  }, [uploadHandle, validatedValues])

  const removeItem = (id) => {
    const updatedItems = validatedValues.filter((_, index) => index !== id)
    setValidatedValues(updatedItems)
  }
  console.log({ validatedValues })
  const onChangeFile = (_: File[]) => {
    // setSelectFile(file)
  }

  return {
    removeItem,
    validatedValues,
    isValid,
    onChangeFile,
    onCompleteValue,
  }
}

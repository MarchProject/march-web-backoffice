import { IDataTemplateCsv, IDataTemplateCsvValidate } from '@/constant/csvData'
// import { useNotificationContext } from '@/context/notification'
import { ParseResult } from 'papaparse'
import { useEffect, useState } from 'react'
import { tranfromCsvFile } from '../../../../../dto/upload.dto'
import { validateExpiryDate } from './validate/expiryDateValidate'
import { ICompleteValues, IValidatedValues } from './interface'
import {
  InventoryBranch,
  InventoryBrand,
  InventoryNamesClass,
  InventoryType,
} from '@/core/model/inventory'
import { useTranslation } from 'react-i18next'
import { tkeys } from '@/translations/i18n'

interface IUseControllerUploadCsvViewProps {
  inventoryNamesData: InventoryNamesClass[]
  inventoriesTypeData: InventoryType[]
  inventoriesBrandData: InventoryBrand[]
  inventoriesBranchData: InventoryBranch[]
  uploadHandle: (value: IValidatedValues[]) => void
}

export const useControllerUploadCsvView = ({
  inventoryNamesData,
  inventoriesTypeData,
  inventoriesBrandData,
  inventoriesBranchData,
  uploadHandle,
}: IUseControllerUploadCsvViewProps) => {
  // const { notification } = useNotificationContext()
  const { onChangeFile, onCompleteValue, validatedValues, removeItem } =
    useHandleUploadCsv({
      inventoryNamesData,
      inventoriesTypeData,
      inventoriesBrandData,
      inventoriesBranchData,
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
  inventoriesTypeData: InventoryType[],
  inventoriesBrandData: InventoryBrand[],
  inventoriesBranchData: InventoryBranch[],
  inventoryNamesData: InventoryNamesClass[],
  trans: any,
) => {
  const _values = result.data
  const values = tranfromCsvFile(_values)
  const keys = tkeys.Inventory.MainPage.dialog.upload
  const requiredFields = ['name', 'type', 'brand', 'branch', 'amount', 'price']
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
      invalidFields.push({
        name: 'id',
        message: trans(keys.validated.field.notFound),
      })
    } else if (!ids.includes(obj.id)) {
      ids.push(obj.id)
    } else {
      isValid = false
      invalidFields.push({
        name: 'id',
        message: trans(keys.validated.field.duplicated),
      })
    }

    requiredFields.forEach((field) => {
      if (field === 'type') {
        const value = obj[field]
        const findType = inventoriesTypeData.find((e) => e.name === value)

        if (value === undefined || value === null || value === '') {
          isValid = false
          invalidFields.push({
            name: field,
            message: trans(keys.validated.field.requried),
          })
        } else if (!findType) {
          isValid = false
          invalidFields.push({
            name: field,
            message: `${value} ${trans(keys.validated.field.notFound)}`,
          })
        }
      } else if (field === 'brand') {
        const value = obj[field]
        const findType = inventoriesBrandData.find((e) => e.name === value)
        if (value === undefined || value === null || value === '') {
          isValid = false
          invalidFields.push({
            name: field,
            message: trans(keys.validated.field.requried),
          })
        } else if (!findType) {
          isValid = false
          invalidFields.push({
            name: field,
            message: `${value} ${trans(keys.validated.field.notFound)}`,
          })
        }
      } else if (field === 'branch') {
        const value = obj[field]
        const findType = inventoriesBranchData.find((e) => e.name === value)
        if (value === undefined || value === null || value === '') {
          isValid = false
          invalidFields.push({
            name: field,
            message: trans(keys.validated.field.requried),
          })
        } else if (!findType) {
          isValid = false
          invalidFields.push({
            name: field,
            message: `${value} ${trans(keys.validated.field.notFound)}`,
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
            message: trans(keys.validated.field.requried),
          })
        } else if (!findInt) {
          isValid = false
          invalidFields.push({
            name: field,
            message: `${value} ${trans(keys.validated.field.notInt)}`,
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
            message: trans(keys.validated.field.requried),
          })
        } else if (!findInt) {
          isValid = false
          invalidFields.push({
            name: field,
            message: `${value} ${trans(keys.validated.field.notInt)}`,
          })
        } else if (value.length > 10) {
          isValid = false
          invalidFields.push({
            name: field,
            message: trans(keys.validated.field.maxLength10),
          })
        }
      } else if (field === 'name') {
        const value = obj[field]
        const findName = inventoryNamesData.find((e) => e.name === value)
        if (value === undefined || value === null || value === '') {
          isValid = false
          invalidFields.push({
            name: field,
            message: trans(keys.validated.field.requried),
          })
        } else if (value.length > 20) {
          isValid = false
          invalidFields.push({
            name: field,
            message: trans(keys.validated.field.maxLength20),
          })
        } else if (findName) {
          isValid = false
          invalidFields.push({
            name: field,
            message: trans(keys.validated.field.duplicatedTrash),
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
          if (value.toLowerCase() !== 'yes' && value.toLowerCase() !== 'no') {
            isValid = false
            invalidFields.push({
              name: field,
              message: trans(keys.validated.field.mustBe),
            })
          }
        } else {
          if (!findInt) {
            isValid = false
            invalidFields.push({
              name: field,
              message: `${value} ${trans(keys.validated.field.notInt)}`,
            })
          } else if (value.length > 10) {
            isValid = false
            invalidFields.push({
              name: field,
              message: trans(keys.validated.field.maxLength10),
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
          const parts = value.split('-')

          const year = parseInt(parts[2], 10)
          if (year > 2099) {
            isValid = false
            invalidFields.push({
              name: field,
              message: `${value} ${trans(keys.validated.field.expiryDate)}`,
            })
          } else if (!valid) {
            isValid = false
            invalidFields.push({
              name: field,
              message: `${value} ${trans(keys.validated.field.expiryDate)}`,
            })
          }
        } else if (field === 'sku') {
          if (value.length > 20) {
            isValid = false
            invalidFields.push({
              name: field,
              message: trans(keys.validated.field.maxLength20),
            })
          }
        } else if (field === 'description') {
          if (value.length > 300) {
            isValid = false
            invalidFields.push({
              name: field,
              message: trans(keys.validated.field.maxLength300),
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

const useHandleUploadCsv = ({
  inventoryNamesData,
  inventoriesTypeData,
  inventoriesBrandData,
  inventoriesBranchData,
  uploadHandle,
}: IUseControllerUploadCsvViewProps) => {
  // const [selectedFile, setSelectFile] = useState<File[]>(null)
  const [validatedValues, setValidatedValues] = useState<IValidatedValues[]>([])
  const { t: trans }: any = useTranslation()
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
      inventoriesBranchData,
      inventoryNamesData,
      trans,
    )

    const validatedValue: IValidatedValues = {
      name,
      validData,
      inValidData,
    }
    // setValidatedValues((prev) => [...prev, validatedValue])
    setValidatedValues([validatedValue])
  }

  useEffect(() => {
    uploadHandle(validatedValues)
  }, [uploadHandle, validatedValues])

  const removeItem = (id) => {
    const updatedItems = validatedValues.filter((_, index) => index !== id)
    setValidatedValues(updatedItems)
  }
  const onChangeFile = (_: File[]) => {
    // setSelectFile(file)
  }

  return {
    removeItem,
    validatedValues,
    onChangeFile,
    onCompleteValue,
  }
}

import { EnumSeverity, useNotificationContext } from '@/context/notification'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { IInventoryForm } from './interface'
import { schema } from './schema'
import { useQueryInventoryBrand, useQueryInventoryType } from '../controller'
import * as yup from 'yup'
import { useEffect } from 'react'

const notificationSuccessProp = {
  severity: EnumSeverity.success,
  title: 'Sign In',
  message: 'Sign In Success',
}

const notificationErrorProp = {
  severity: EnumSeverity.error,
  title: 'Sign In',
  message: 'Sign In Error',
}

const notificationAuthErrorProp = {
  severity: EnumSeverity.error,
  title: 'Sign In',
  message: 'Sign In Expire',
}

export const useEditorInventoryController = () => {
  const { notification } = useNotificationContext()
  const { register, errors, onSubmit, control }: any = useFormHandler({
    notification,
  })
  const {
    inventoriesTypeData,
    inventoriesTypeDataError,
    inventoriesTypeLoading,
    handleSearchInventoryType,
  } = useQueryInventoryType()

  const {
    inventoriesBrandData,
    inventoriesBrandDataError,
    inventoriesBrandLoading,
    handleSearchInventoryBrand,
  } = useQueryInventoryBrand()
  return {
    formHandler: { register, errors, onSubmit, control },
    inventoriesType: {
      inventoriesTypeData,
      inventoriesTypeDataError,
      inventoriesTypeLoading,
      handleSearchInventoryType,
    },
    inventoriesBrand: {
      inventoriesBrandData,
      inventoriesBrandDataError,
      inventoriesBrandLoading,
      handleSearchInventoryBrand,
    },
  }
}

const useFormHandler = ({ notification }) => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    getValues,
    formState: { errors },
    reset,
  } = useForm<IInventoryForm>({
    defaultValues: {
      inventory: {
        id: '',
        name: '',
        typeFilter: {
          id: '',
          name: '',
        },
      },
    },
    resolver: yupResolver(schema2),
    reValidateMode: 'onChange',
    mode: 'all',
  })

  const onSubmit: SubmitHandler<IInventoryForm> = (data) => {
    console.log({ data })
    reset()
  }
  const onError = () => {
    notification(notificationErrorProp)
  }

  return {
    register,
    onSubmit: handleSubmit(onSubmit, onError),
    errors,
    control,
  }
}

export const schema2 = yup.lazy((formalue) => {
  console.log({ value: formalue })
  return yup.object({
    name: yup.string().nullable().required('name is required'),
    typeFilter: yup.object().nullable().required('name is required'),
    brandFilter: yup.object().nullable().required('name is required'),
    expiryDate: yup.string().nullable().required('name is required'),
  })
})

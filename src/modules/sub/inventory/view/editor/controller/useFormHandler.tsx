import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { IInventoryForm } from '../interface'
import { schema } from '../schema'

export const useFormHandler = () => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    getValues,
    setError,
    clearErrors,
    setValue,
    formState: { errors },
    reset,
  } = useForm<IInventoryForm>({
    defaultValues: {
      name: '',
      description: '',
      expiryDate: null,
      type: null,
      brand: null,
      branch: null,
      quantity: 0,
      sku: '',
      serialNumber: '',
      reorder: 0,
      weight: '',
      width: '',
      length: '',
      height: '',
      price: 0,
      memberPrice: 0,
    },
    resolver: yupResolver(schema),
    reValidateMode: 'onChange',
    mode: 'all',
  })

  return {
    register,
    onSubmit: handleSubmit,
    errors,
    control,
    reset,
    watch,
    getValues,
    setError,
    clearErrors,
    setValue,
  } as any
}

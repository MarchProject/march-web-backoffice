import * as yup from 'yup'

export const schema = yup.lazy((_formalue) => {
  return yup.object({
    // id: yup.string().required('ID is required'),
    name: yup.string().nullable().required('Name is required'),
    quantity: yup.string().nullable().required('Quantity is required'),
    price: yup.string().nullable().required('Price is required'),
    sku: yup.string().nullable(),
    serialNumber: yup.string().nullable(),
    width: yup.string().nullable(),
    length: yup.string().nullable(),
    height: yup.string().nullable(),
    weight: yup.string().nullable(),
    memberPrice: yup.string().nullable(),
    favorite: yup.boolean().nullable(),
    reorder: yup.string().nullable(),
    description: yup.string().nullable(),
    type: yup.object({}).nullable().required('Inventory Type ID is required'),
    brand: yup.object({}).nullable().required('Brand Type ID is required'),
    branch: yup.object({}).nullable().required('Branch Type ID is required'),
    expiryDate: yup
      .string()
      .nullable()
      .test(
        'expiryDate',
        'Please ensure that the input is neither in the past or invalid.',
        (value: any) => {
          return value !== 'Invalid Date'
        },
      ),
  })
})

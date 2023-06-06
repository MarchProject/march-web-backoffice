import * as yup from 'yup'

export const schema = yup.lazy((formValue) => {
  console.log({ formValue })
  return yup.object({
    id: yup.string().nullable().required('name is required'),
    name: yup.string().nullable().required('name is required'),
  })
})

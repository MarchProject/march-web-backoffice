import * as yup from 'yup'

export const schemaInvite = yup.lazy((_formValue) => {
  console.log({ _formValue })
  return yup.object({
    // id: yup.string().required('ID is required'),
    firstname: yup.string().nullable().required('firstname is required'),
    lastname: yup.string().nullable().required('lastname is required'),
    email: yup
      .string()
      .email('Invalid email address')
      .nullable()
      .required('email is required'),
  })
})

import * as yup from 'yup'

export const schema = yup.object().shape({
  username: yup
    .string()
    // .email('Must be a valid email')
    .required('username is required'),
  password: yup.string().min(1).max(9).required('password is required'),
})

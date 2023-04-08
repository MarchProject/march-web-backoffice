import { signinMutation } from '@/core/gql/auth'
import { LoginResult, SigninVariables } from '@/core/model'
import { useMutation } from '@apollo/client'
import axios from 'axios'
import { useEffect, useState } from 'react'
import * as clientConfig from '../../../config/client'
import router from 'next/router'
import { homeRoute } from '@/router/home'
import { EnumSeverity, useNotificationContext } from '@/context/notification'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { ILoginForm } from './interface'
import { schema } from './schema'

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

export const useLoginController = () => {
  const { notification } = useNotificationContext()
  const { signIn, signInLoading } = useSignInState({ notification })
  const { register, errors, onSubmit, control }: any = useFormHandler({
    notification,
    signIn,
  })
  return {
    signInState: {
      signIn,
      signInLoading,
    },
    formHandler: { register, errors, onSubmit, control },
  }
}

const useSignInState = ({ notification }) => {
  const [dataSet, setDataSet] = useState<any>()
  const [signIn, { loading: _loading, error, data }] = useMutation<
    LoginResult,
    SigninVariables
  >(signinMutation)

  useEffect(() => {
    if (error) notification(notificationErrorProp)
  }, [error])

  const signAxios = async ({ access_token, refresh_token }) => {
    const response = await axios.post('/backoffice/api/signIn', {
      access_token,
      refresh_token,
    })
    setDataSet(response.data)
    console.log({ response })
  }
  useEffect(() => {
    const check = clientConfig.getAuthFailed()
    if (check === 'true') {
      notification(notificationAuthErrorProp)
      clientConfig.removeAuthFailed()
    }
  }, [])
  useEffect(() => {
    if (data) {
      signAxios({
        access_token: data?.signIn?.access_token,
        refresh_token: data?.signIn?.refresh_token,
      })
    }
  }, [data])

  useEffect(() => {
    console.log('gererer')
    console.log({ dataSet })
    if (dataSet) {
      if (!dataSet.accessToken) {
        notification(notificationErrorProp)
        console.log('err auth')
        return () => {}
      }
      console.log('login success')

      localStorage.clear()
      const config = dataSet.config
      console.log({ config })
      if (config) {
        clientConfig.init(config, {
          userId: dataSet?.userId,
          username: dataSet?.username,
          accessToken: dataSet?.accessToken,
          refreshToken: dataSet?.refreshToken,
        })
      }
      notification(notificationSuccessProp)
      router.push({ pathname: homeRoute.path })
    }
  }, [dataSet])

  return {
    signIn,
    signInLoading: _loading,
  }
}

const useFormHandler = ({ notification, signIn }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<ILoginForm>({
    resolver: yupResolver(schema),
    defaultValues: {
      username: '',
      password: '',
    },
  })

  const onSubmit: SubmitHandler<ILoginForm> = (data) => {
    signIn({
      variables: {
        username: data.username,
        password: data.password,
      },
    })
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

import { OAuthUrlData, oAuthUrlMutation, signinMutation } from '@/core/gql/auth'
import { LoginResult, SigninVariables } from '@/core/model'
import { useMutation } from '@apollo/client'
import axios from 'axios'
import { useCallback, useEffect, useState } from 'react'
import * as clientConfig from '../../../config/client'
import router from 'next/router'
import { homeRoute } from '@/router/home'
import { useNotificationContext } from '@/context/notification'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { ILoginForm } from './interface'
import { schema } from './schema'
import {
  notificationSignInErrorProp,
  notificationSignInExpireErrorProp,
  notificationSignInSuccessProp,
} from '@/core/notification'

export const useLoginController = () => {
  const { notification } = useNotificationContext()
  const { signIn, signInLoading } = useSignInState({ notification })
  const { register, errors, onSubmit, control }: any = useFormHandler({
    notification,
    signIn,
  })
  const { signInOAuthHandle } = useSignInOAuth({ notification })
  return {
    signInState: {
      signIn,
      signInLoading,
    },
    formHandler: { register, errors, onSubmit, control },
    OAuth: {
      signInOAuthHandle,
    },
  }
}

const useSignInState = ({ notification }) => {
  const [dataSet, setDataSet] = useState<any>()
  const [signIn, { loading: _loading, error, data }] = useMutation<
    LoginResult,
    SigninVariables
  >(signinMutation)

  useEffect(() => {
    if (error) {
      notification(notificationSignInErrorProp)
    }
  }, [error, notification])

  const signAxios = async ({ access_token, refresh_token }) => {
    const response = await axios.post('/backoffice/api/signIn', {
      access_token,
      refresh_token,
    })
    setDataSet(response.data)
  }
  useEffect(() => {
    const check = clientConfig.getAuthFailed()
    if (check === 'true') {
      notification(notificationSignInExpireErrorProp)
      clientConfig.removeAuthFailed()
    }
  }, [notification])
  useEffect(() => {
    if (data) {
      if (data[Object?.keys(data)[0]] !== null) {
        signAxios({
          access_token: data?.signIn?.access_token,
          refresh_token: data?.signIn?.refresh_token,
        })
      }
    }
  }, [data])

  useEffect(() => {
    if (dataSet) {
      if (!dataSet.accessToken) {
        notification(notificationSignInErrorProp)
        return () => {}
      }
      clientConfig.clearLocal()
      // localStorage.clear()
      const config = dataSet.config
      if (config) {
        clientConfig.init(config, {
          userId: dataSet?.userId,
          username: dataSet?.username,
          accessToken: dataSet?.accessToken,
          refreshToken: dataSet?.refreshToken,
          functions: dataSet?.functions,
          shopName: dataSet?.shopName,
        })
      }
      notification(notificationSignInSuccessProp)
      router.push({ pathname: homeRoute.path })
    }
  }, [dataSet, notification])

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
    notification(notificationSignInErrorProp)
  }

  return {
    register,
    onSubmit: handleSubmit(onSubmit, onError),
    errors,
    control,
  }
}

const useSignInOAuth = ({ notification }) => {
  const [signInOAuth, { loading: _loading, error, data }] = useMutation<
    OAuthUrlData,
    any
  >(oAuthUrlMutation)

  const signInOAuthHandle = useCallback(() => {
    signInOAuth()
  }, [signInOAuth])

  useEffect(() => {
    if (data?.oAuthUrl) {
      window.location.assign(data.oAuthUrl)
    }
  }, [data])

  useEffect(() => {
    if (error) {
      console.log({ error })
      notification(notificationSignInErrorProp)
    }
  }, [error, notification])

  return {
    signInOAuthHandle,
  }
}
import { signinMutation } from '@/core/gql/auth'
import { LoginResult, SigninVariables } from '@/core/model'
import { useMutation } from '@apollo/client'
import axios from 'axios'
import { useEffect } from 'react'
import * as clientConfig from '../../config/client'
import router from 'next/router'
import { homeRoute } from '@/router/home'
import { EnumSeverity, useNotificationContext } from '@/context/notification'

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
export const useLoginController = () => {
  const { notification } = useNotificationContext()

  const { signIn } = useSignInState({ notification })
  return {
    signInState: {
      signIn,
    },
  }
}

const useSignInState = ({ notification }) => {
  const [signIn, { loading: _loading, error, data }] = useMutation<
    LoginResult,
    SigninVariables
  >(signinMutation)

  useEffect(() => {
    if (error) notification(notificationErrorProp)
  }, [error])

  const signAxios = async (access_token) => {
    const response = await axios.post('/backoffice/api/signIn', {
      access_token,
    })
    console.log({ response })
  }

  useEffect(() => {
    const _data = data?.signIn
    if (_data) {
      if (!_data.access_token) {
        notification(notificationErrorProp)
        console.log('err auth')
        return () => {}
      }
      console.log('login success')

      localStorage.clear()
      const config = _data
      if (config) {
        clientConfig.init(config, {
          userId: _data?.userId,
          username: _data?.username,
          accessToken: _data?.access_token,
        })
      }
      signAxios(_data?.access_token)
      notification(notificationSuccessProp)
      router.push({ pathname: homeRoute.path })
    }
  }, [data])

  return {
    signIn,
  }
}

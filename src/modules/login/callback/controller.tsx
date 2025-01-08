import { useNotificationContext } from '@/context/notification'
import { signInOAuthMutation } from '@/core/gql/auth'
import { SigninOAuthData, SigninOAuthVariables } from '@/core/model'
import { useMutation } from '@apollo/client'
import axios from 'axios'
import { useCallback, useEffect, useState } from 'react'
import * as clientConfig from '../../../config/client'
import router from 'next/router'
import { homeRoute } from '@/router/home'
import { noAccessRoute, uamLoginRoute } from '@/router/user'
import { useLoadingContext } from '@/context/loading'
import { useTranslation } from 'react-i18next'
import { notificationProp } from '@/core/notification/inventory/inventory/dialogCustom'
import { tkeys } from '@/translations/i18n'

export const useControllerCallback = () => {
  const { notification } = useNotificationContext()
  const { openLoading, closeLoading } = useLoadingContext()
  const { signInOAuthHandle } = useSignInOAuth({
    notification,
    openLoading,
    closeLoading,
  })
  useSignInOAuthGetParams({ signInOAuthHandle })
}

const useSignInOAuthGetParams = ({ signInOAuthHandle }) => {
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search)
    const codeValue = queryParams.get('code')
    if (codeValue?.length > 0) {
      signInOAuthHandle(codeValue)
    } else {
      router.push({ pathname: uamLoginRoute.path })
    }
  }, [signInOAuthHandle])
}

const useSignInOAuth = ({ notification, openLoading, closeLoading }) => {
  const { t: trans } = useTranslation()
  const [dataSet, setDataSet] = useState<any>()

  const [signInOAuth, { loading: _loading, error, data }] = useMutation<
    SigninOAuthData,
    SigninOAuthVariables
  >(signInOAuthMutation)

  const signInOAuthHandle = useCallback(
    (code: string) => {
      signInOAuth({ variables: { code: code } })
    },
    [signInOAuth],
  )

  useEffect(() => {
    if (_loading) {
      openLoading()
    } else {
    }
    return () => {
      closeLoading()
    }
  }, [_loading, closeLoading, openLoading])

  useEffect(() => {
    if (error) {
      notification(
        notificationProp(
          trans(tkeys.common.notification.signIn.title),
          trans(tkeys.common.notification.signIn.error),
          'error',
        ),
      )
      if (error.message === 'Unauthorized No Access') {
        router.push({ pathname: noAccessRoute.path })
      } else {
        router.push({ pathname: uamLoginRoute.path })
      }
    }
  }, [error, notification, trans])

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
      notification(
        notificationProp(
          trans(tkeys.common.notification.signIn.title),
          trans(tkeys.common.notification.signIn.expire),
          'error',
        ),
      )
      clientConfig.removeAuthFailed()
    }
  }, [notification, trans])

  useEffect(() => {
    if (data) {
      if (data[Object?.keys(data)[0]] !== null) {
        signAxios({
          access_token: data?.signInOAuth?.access_token,
          refresh_token: data?.signInOAuth?.refresh_token,
        })
      }
    }
  }, [data])

  useEffect(() => {
    if (dataSet) {
      if (!dataSet.accessToken) {
        notification(
          notificationProp(
            trans(tkeys.common.notification.signIn.title),
            trans(tkeys.common.notification.signIn.error),
            'error',
          ),
        )
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
          picture: dataSet?.picture,
        })
      }
      notification(
        notificationProp(
          trans(tkeys.common.notification.signIn.title),
          trans(tkeys.common.notification.signIn.success),
          'success',
        ),
      )
      router.push({ pathname: homeRoute.path })
    }
  }, [dataSet, notification, trans])

  return {
    signInOAuthHandle,
  }
}

import { signOutMutation } from '@/core/gql/auth'
import { ApolloProvider, useMutation } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import * as clientConfig from '@/config/client'
import router from 'next/router'
import LogoutIcon from '@mui/icons-material/Logout'
import { initApollo } from '@/core/apollo'
import dynamic from 'next/dynamic'
import { useTranslation } from 'react-i18next'
import { tkeys } from '@/translations/i18n'

type SignOut = {
  signOut: {
    id: string
  }
}

const Index = () => {
  const [signOut, { data }] = useMutation<SignOut, any>(signOutMutation)
  const { t: trans }: any = useTranslation()
  useEffect(() => {
    if (data?.signOut?.id) {
      clientConfig.removeAccessToken()
      clientConfig.removeRefreshToken()
      Cookies.remove('mbo-token')
      Cookies.remove('mbo-refresh')
      router.push({ pathname: clientConfig.getDefaultLoginPath() })
    }
  }, [data])
  const userId = clientConfig.getUserId()
  const handleSignOut = () => {
    signOut({
      variables: {
        id: userId,
      },
    })
  }

  return (
    <div className="text-right my-auto w-full">
      <div
        className={
          'flex lg:justify-center cursor-pointer gap-[10px] items-center justify-between'
        }
        onClick={handleSignOut}>
        <p className="m-0 lg:hidden text-xs font-semibold text-secondary ml-[2px]">
          {trans(tkeys.common.button.signOut)}
        </p>
        <LogoutIcon className="text-secondary my-auto lg:!text-lg !text-sm" />
      </div>
    </div>
  )
}

async function _initApollo(setClient) {
  const client = await initApollo()
  setClient(client)
}

const SignOut = (props: any) => {
  const [client, setClient] = useState(null)

  useEffect(() => {
    _initApollo(setClient)
  }, [])

  return (
    (client && (
      <ApolloProvider client={client}>
        <Index {...props} />
      </ApolloProvider>
    )) || <></>
  )
}

export default dynamic(() => Promise.resolve(React.memo(SignOut)), {
  ssr: false,
})

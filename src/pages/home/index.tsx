import { getUserId } from '@/config/client'
import { CookiesKey } from '@/constant'
import { initApollo } from '@/core/apollo'
import { signOutMutation } from '@/core/gql/auth'
import { ApolloProvider, useMutation } from '@apollo/client'
import { Button } from '@mui/material'
import { GetServerSidePropsContext } from 'next'
import { ParsedUrlQuery } from 'querystring'
import React, { useEffect, useState } from 'react'
import { Request, Response } from 'express'
import * as clientConfig from '@/config/client'
import { useRouter } from 'next/router'
import { getErrorServerSideProps } from '@/core/common'
import { getLoginRoute } from '@/router/auth'

type SignOut = {
  id: string
}

const Index = () => {
  const [signOut, { loading, error, data }] = useMutation<SignOut, SignOut>(
    signOutMutation,
  )
  const router = useRouter()
  const userId = getUserId()
  const handle = () => {
    signOut({
      variables: {
        id: userId,
      },
    })
  }

  useEffect(() => {
    if (data) {
      // clientConfig.removeAccessToken()
    }
  }, [data])

  return (
    <div>
      <div>home</div>
      <Button variant="outlined" onClick={handle}>
        Logout
      </Button>
    </div>
  )
}

export async function getServerSideProps(
  ctx: GetServerSidePropsContext<ParsedUrlQuery>,
) {
  const logPrefix = '[pages.home.getServerSideProps]'
  const req = ctx.req as Request
  const res = ctx.res as Response

  const accessToken = req.cookies[CookiesKey.accessToken]

  const code = ctx.query.code as string
  const sessionState = ctx.query.session_state as string

  console.log(logPrefix, { accessToken, code, sessionState })
  try {
    return {
      props: {},
    }
  } catch (e) {
    return getErrorServerSideProps(e?.response?.status, getLoginRoute().path)
  }
}

async function _initApollo(setClient: any) {
  const client = await initApollo()
  setClient(client)
}

function Container(props: any) {
  const [client, setClient] = useState(null)

  useEffect(() => {
    _initApollo(setClient)
  }, [])

  if (!client) {
    return <>Loading, please wait ...</>
  }

  return (
    <ApolloProvider client={client}>
      <Index {...props} />
    </ApolloProvider>
  )
}

export default Container

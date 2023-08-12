import ContainerCallback from '@/modules/login/callback/Container'
import React, { useEffect, useState } from 'react'
import { GetServerSidePropsContext } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { Request, Response } from 'express'
import { ApolloProvider } from '@apollo/client'
import { initApollo } from '@/core/apollo'
import { homeRoute } from '@/router/home'
import { CookiesKey } from '@/constant'
import { verifyAccessToken } from '@/core/services/auth'

const Index = () => {
  return (
    <>
      <ContainerCallback />
    </>
  )
}

export async function getServerSideProps(
  ctx: GetServerSidePropsContext<ParsedUrlQuery>,
) {
  const logPrefix = '[pages.uam.callback.getServerSideProps]'
  const req = ctx.req as Request
  const res = ctx.res as Response

  const accessToken = req.cookies[CookiesKey.accessToken]

  const code = ctx.query.code as string
  const sessionState = ctx.query.session_state as string

  console.log(logPrefix, { accessToken, code, sessionState })

  if (accessToken) {
    try {
      const response = await verifyAccessToken({ accessToken, res })
      console.log(logPrefix, { response })

      const uri = `${process.env.BASE_PATH}${homeRoute.path}`
      console.log(logPrefix, { uri })

      res.redirect(uri)
    } catch (error) {
      console.error(error, logPrefix)

      return {
        props: {
          errorMessage: error?.message,
        } as any,
      }
    }
    res.redirect('/backoffice/home')
  }

  return {
    props: {},
  }
}

async function _initApollo(setClient: any) {
  const client = await initApollo(process.env.authApiUrl)
  setClient(client)
}

function Container(props: any) {
  const [client, setClient] = useState(null)

  useEffect(() => {
    _initApollo(setClient)
  }, [])

  // if (!client) {
  //   return <>Loading, please wait ...</>
  // }

  return (
    <>
      {(client && (
        <ApolloProvider client={client}>
          <Index {...props} />
        </ApolloProvider>
      )) || <>loading, Please wait ...</>}
    </>
  )
}

export default Container

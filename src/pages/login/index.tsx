import { Button, Card, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import router from 'next/router'
import LoginForm from '../components/login/loginForm'
import { GetServerSidePropsContext } from 'next'
import { ParsedUrlQuery } from 'querystring'
import * as clientConfig from '../../config/client'
import { Request, Response } from 'express'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
  useQuery,
  useMutation,
} from '@apollo/client'
import { initApollo } from '@/core/apollo'
import { signinMutation } from '@/core/gql/auth'
import { LoginResult, SigninVariables } from '@/core/model'
import { homeRoute } from '@/router/home'
import axios from 'axios'
import { CookiesKey } from '@/constant'
import { verifyAccessToken } from '@/core/services/auth'

const Index = () => {
  const [signIn, { loading: _loading, error, data }] = useMutation<
    LoginResult,
    SigninVariables
  >(signinMutation)

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
        // alertError('Unauthorized', alertTitle)
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

      router.push({ pathname: homeRoute.path })
    }
  }, [data])

  return (
    <>
      <div className="bg-login">
        <div className="container mx-auto">
          <div className="layout-loginForm">
            <LoginForm signIn={signIn} />
          </div>
        </div>
      </div>
    </>
  )
}

export async function getServerSideProps(
  ctx: GetServerSidePropsContext<ParsedUrlQuery>,
) {
  const logPrefix = '[pages.uam.login.getServerSideProps]'
  const req = ctx.req as Request
  const res = ctx.res as Response

  const accessToken = req.cookies[CookiesKey.accessToken]

  const code = ctx.query.code as string
  const sessionState = ctx.query.session_state as string

  console.log(logPrefix, { accessToken, code, sessionState })

  if (accessToken) {
    try {
      const response = await verifyAccessToken({ accessToken })
      console.log(logPrefix, {})

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

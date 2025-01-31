import { CookiesKey } from '@/constant'
import { initApollo } from '@/core/apollo'
import { ApolloProvider } from '@apollo/client'
import { GetServerSidePropsContext } from 'next'
import { ParsedUrlQuery } from 'querystring'
import React, { useEffect, useState } from 'react'
import {
  Request,
  // Response
} from 'express'
import { getErrorServerSideProps } from '@/core/common'
import { getLoginRoute } from '@/router/auth'
import Layout from '@/layout/LayOutMarch'
import * as clientConfig from '@/config/client'
import EditorInventoryPage from '@/modules/inventory/editor/Editor'
import { EnumModeEditorPage } from '@/modules/interface'

const Index = () => {
  return (
    <>
      <EditorInventoryPage mode={EnumModeEditorPage.CREATE} />
    </>
  )
}

export async function getServerSideProps(
  ctx: GetServerSidePropsContext<ParsedUrlQuery>,
) {
  const logPrefix = '[pages.inventory.create.getServerSideProps]'
  const req = ctx.req as Request
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
  const client = await initApollo(clientConfig.getInventoryApiUrl())
  setClient(client)
}

function Container(props: any) {
  const [client, setClient] = useState(null)

  useEffect(() => {
    _initApollo(setClient)
  }, [])

  return (
    <Layout>
      {(client && (
        <ApolloProvider client={client}>
          <Index {...props} />
        </ApolloProvider>
      )) || <>loading, Please wait ...</>}
    </Layout>
  )
}

export default Container

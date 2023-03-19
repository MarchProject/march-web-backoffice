import { Button, Card, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import router from 'next/router'
import LoginForm from '../components/login/loginForm'
import { GetServerSidePropsContext } from 'next'
import { ParsedUrlQuery } from 'querystring'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
  useQuery,
} from '@apollo/client'
import { initApollo } from '@/core/apollo'
const GET_Inventory = gql`
  query getInventoryTypes {
    getInventoryTypes {
      id
      name
      description
      createdBy
      createdAt
      updatedBy
      updatedAt
    }
  }
`
function Index() {
  const { loading, error, data } = useQuery(GET_Inventory)
  console.log({ data, error })
  return (
    <>
      <div className="bg-login">
        <div className="container mx-auto">
          <div className="layout-loginForm">
            <LoginForm />
          </div>
        </div>
      </div>
    </>
  )
}

export async function getServerSideProps(
  ctx: GetServerSidePropsContext<ParsedUrlQuery>,
) {
  return {
    props: {},
  }
}

async function _initApollo(setClient: any) {
  const client = await initApollo('http://0.0.0.0:3001/graphql')
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

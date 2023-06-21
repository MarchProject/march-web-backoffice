// import { GraphQLError } from 'graphql-request/dist/types'

import { GraphQLError } from "graphql-request/build/esm/types"

// import { GraphQLError } from "graphql"

export function getErrorServerSideProps(status: number, signInPath: string) {
  if (!status) {
    return {
      props: { errorCode: 500 },
    }
  }

  if (status === 401) {
    return {
      redirect: {
        permanent: false,
        destination: signInPath,
      },
    }
  }

  return {
    props: { errorCode: status },
  }
}

export function handleGraphqlRequestError(
  error: any,
  logPrefix: string,
  bypassError?: boolean,
) {
  const { response } = error
  const { status, errors } = response ?? {}
  console.error(logPrefix, { error })

  if (errors) {
    const [error0] = errors as GraphQLError[]

    console.error(logPrefix, { status, error0, errorMessage: error0.message })

    if (!bypassError) {
      throw new Error(error0.message)
    }
  }

  console.error(logPrefix, { error })

  if (!bypassError) {
    throw new Error(error)
  }
}

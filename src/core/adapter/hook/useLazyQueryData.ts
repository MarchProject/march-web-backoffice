import { noop } from '@/utils/common/noop'
import { ApolloError, DocumentNode, useLazyQuery } from '@apollo/client'
import { plainToInstance } from 'class-transformer'
import { useCallback, useEffect } from 'react'

interface IUseLazyQueryData<T> {
  queryNode: DocumentNode
  classConstructor: new () => any
  onSuccess?: (data?: T) => void
  onError?: (error?: ApolloError) => void
}

export const useLazyQueryData = <T, U extends Record<string, any>, K = any>({
  onSuccess = noop,
  onError = noop,
  queryNode,
  classConstructor,
}: IUseLazyQueryData<T>) => {
  const [triggerMutation, { data, error, loading }] = useLazyQuery<U, K>(
    queryNode,
  )

  const triggerHandle = useCallback(
    (input?: K) => {
      triggerMutation({ variables: input })
    },
    [triggerMutation],
  )

  useEffect(() => {
    if (data) {
      const property = Object.keys(data)[0]
      onSuccess(plainToInstance(classConstructor, data[property]))
    }
  }, [classConstructor, data, onSuccess])

  useEffect(() => {
    if (error) {
      onError(error)
    }
  }, [error, onError])

  return {
    data,
    error,
    loading,
    trigger: triggerHandle,
  }
}

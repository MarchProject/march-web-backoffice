import { useLoadingContext } from '@/context/loading'
import { noop } from '@/utils/common/noop'
import { ApolloError, DocumentNode, useLazyQuery } from '@apollo/client'
import { plainToInstance } from 'class-transformer'
import { useCallback, useEffect } from 'react'

interface IUseLazyQueryData {
  queryNode: DocumentNode
  classConstructor: new () => any
  onSuccess?: (data?: any) => void
  onError?: (error?: ApolloError) => void
  globalLoading?: boolean
}

export const useLazyQueryDataOld = <U, K = any>({
  onSuccess = noop,
  onError = noop,
  queryNode,
  classConstructor,
  globalLoading = true,
}: IUseLazyQueryData) => {
  const { openLoading, closeLoading } = useLoadingContext()
  const [triggerMutation, { data, error, loading }] = useLazyQuery<U, K>(
    queryNode,
  )
  const _openLoading = globalLoading ? openLoading : noop
  const _closeLoading = globalLoading ? closeLoading : noop

  const triggerHandle = useCallback(
    (input?: K) => {
      _openLoading()
      triggerMutation({ variables: input })
      _closeLoading()
    },
    [_closeLoading, _openLoading, triggerMutation],
  )

  useEffect(() => {
    if (data) {
      const property = Object.keys(data)[0]
      onSuccess(plainToInstance(classConstructor, data[property]))
      _closeLoading()
    }
  }, [_closeLoading, classConstructor, data, onSuccess])

  useEffect(() => {
    if (error) {
      onError(error)
      _closeLoading()
    }
  }, [_closeLoading, error, onError])

  return {
    data,
    error,
    loading,
    trigger: triggerHandle,
  }
}

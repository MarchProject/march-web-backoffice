/* eslint-disable react-hooks/exhaustive-deps */
import { useLoadingContext } from '@/context/loading'
import { noop } from '@/utils/common/noop'
import { ApolloError, DocumentNode, useLazyQuery } from '@apollo/client'
import { useCallback, useEffect } from 'react'
import { IQueryPropsMock, IQueryProvider } from '../interface'
import { querySelector } from '../provider/selector'

type QueryFunction<T extends keyof IQueryPropsMock, U> = (
  provider: IQueryPropsMock[T],
  arg: U,
) => any

interface IOption {
  onSuccess?: (data?: any) => void
  onError?: (error?: any) => void
  globalLoading?: boolean
}

export const useLazyQueryData = <T extends keyof IQueryProvider, U, K>(
  QueryKey: T,
  query: QueryFunction<T, U>,
  queryNode: DocumentNode,
  option?: IOption,
) => {
  const { onError = () => {}, onSuccess = noop, globalLoading = false } = option
  const { openLoading, closeLoading } = useLoadingContext()
  const [triggerMutation, { data: QueryData, error, loading }] = useLazyQuery<
    U,
    K
  >(queryNode)
  const _openLoading = globalLoading ? openLoading : noop
  const _closeLoading = globalLoading ? closeLoading : noop

  const provider = querySelector(QueryKey)

  const handleError = useCallback(
    (error) => {
      if (error instanceof ApolloError) {
        onError(error.message)
      } else {
        onError(error.message)
      }
    },
    [onError],
  )

  const handleAdapter = useCallback(
    async (QueryData: U, provider: IQueryPropsMock[T]) => {
      try {
        const data = await query(provider, QueryData)
        onSuccess(data)
      } catch (error) {
        handleError(error)
      }
    },
    [handleError, onSuccess],
  )

  const triggerHandle = useCallback(
    (input?: K) => {
      _openLoading()
      triggerMutation({ variables: input })
      _closeLoading()
    },
    [_closeLoading, _openLoading, triggerMutation],
  )

  useEffect(() => {
    if (QueryData) {
      if (QueryData[Object?.keys(QueryData)[0]] !== null) {
        handleAdapter(QueryData, provider)
        _closeLoading()
      }
    }
  }, [QueryData, _closeLoading])

  useEffect(() => {
    if (error) {
      handleError(error)
      _closeLoading()
    }
  }, [_closeLoading, error])

  return {
    data: QueryData,
    error,
    loading,
    trigger: triggerHandle,
  }
}

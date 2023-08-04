/* eslint-disable react-hooks/exhaustive-deps */
import { useLoadingContext } from '@/context/loading'
import { noop } from '@/utils/common/noop'
import { ApolloError, DocumentNode, useMutation } from '@apollo/client'
import { useCallback, useEffect } from 'react'
import { IMutatePropsMock, IMutateProvider } from '../interface'
import { mutateSelector } from '../provider/selector'
import { errorTextTranform } from '@/core/utils/errorText'

type MutateFunction<T extends keyof IMutatePropsMock, U> = (
  provider: IMutatePropsMock[T],
  arg: U,
) => any

interface IOption {
  onSuccess?: (data?: any) => void
  onError?: (error?: any) => void
  globalLoading?: boolean
}

export const useMutationData = <T extends keyof IMutateProvider, U, K>(
  MutateKey: T,
  query: MutateFunction<T, U>,
  queryNode: DocumentNode,
  option?: IOption,
) => {
  const { onError = noop, onSuccess = noop, globalLoading = false } = option
  const { openLoading, closeLoading } = useLoadingContext()
  const [triggerMutation, { data: MutateData, error, loading }] = useMutation<
    U,
    K
  >(queryNode)

  const _openLoading = globalLoading ? openLoading : noop
  const _closeLoading = globalLoading ? closeLoading : noop

  const provider = mutateSelector(MutateKey)

  const handleError = useCallback(
    (error) => {
      if (error instanceof ApolloError) {
        onError(errorTextTranform(error.message))
      } else {
        onError(errorTextTranform(error.message))
      }
    },
    [onError],
  )

  const handleAdapter = useCallback(
    async (QueryData: U, provider: IMutatePropsMock[T]) => {
      try {
        if (query) {
          const data = await query(provider, QueryData)
          onSuccess(data)
        } else {
          onSuccess(QueryData)
        }
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
    if (MutateData) {
      if (MutateData[Object?.keys(MutateData)[0]] !== null) {
        handleAdapter(MutateData, provider)
        _closeLoading()
      }
    }
  }, [MutateData, _closeLoading])

  useEffect(() => {
    if (error) {
      handleError(error)
      _closeLoading()
    }
  }, [_closeLoading, error])

  return {
    data: MutateData,
    error,
    loading,
    trigger: triggerHandle,
  }
}

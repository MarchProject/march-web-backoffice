import { mutateProvider, queryProvider } from './provider'
import {
  IMutatePropsMock,
  IMutateProvider,
  IQueryPropsMock,
  IQueryProvider,
} from '../interface'

export const querySelector = <K extends keyof IQueryProvider>(
  QueryKey: K,
): IQueryPropsMock[K] => {
  const fn = queryProvider()[QueryKey]
  return fn
}

export const mutateSelector = <K extends keyof IMutateProvider>(
  QueryKey: K,
): IMutatePropsMock[K] => {
  const fn = mutateProvider()[QueryKey]
  return fn
}

import { FC, ReactElement } from 'react'
import combineProviders from '../utils/combineProvider'
import { NotificationContextProvider } from '@/context/notification'
import TabProvider from './TabProvider'
import { LoadingProvider } from '@/context/loading'

interface IContextProvider {
  children: ReactElement
}

const contextProviders = [
  NotificationContextProvider,
  TabProvider,
  LoadingProvider,
]

const ContextProvider: FC<IContextProvider> = ({ children }) => {
  return combineProviders({ children, providers: contextProviders })
}

export default ContextProvider

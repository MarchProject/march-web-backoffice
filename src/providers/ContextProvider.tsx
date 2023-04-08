import { FC, ReactElement } from 'react'
import combineProviders from '../utils/combineProvider'
import { NotificationContextProvider } from '@/context/notification'
import TabProvider from './TabProvider'

interface IContextProvider {
  children: ReactElement
}

const contextProviders = [NotificationContextProvider, TabProvider]

const ContextProvider: FC<IContextProvider> = ({ children }) => {
  return combineProviders({ children, providers: contextProviders })
}

export default ContextProvider

import { FC, ReactElement } from 'react'
import combineProviders from '../utils/combineProvider'
import dynamic from 'next/dynamic'
import ContextProvider from './ContextProvider'

const NotificationProvider = dynamic(() => import('./NotificationProvider'))

interface IProvider {
  children: ReactElement
}

const providers = [ContextProvider, NotificationProvider]

const Providers: FC<IProvider> = ({ children }) => {
  return combineProviders({ children, providers })
}

export default Providers

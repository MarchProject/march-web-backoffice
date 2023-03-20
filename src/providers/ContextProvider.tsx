


import { FC, ReactElement } from 'react'
import combineProviders from '../utils/combineProvider'
import { NotificationContextProvider } from '@/context/notification'



interface IContextProvider {
  children: ReactElement
}

const contextProviders = [NotificationContextProvider]

const ContextProvider: FC<IContextProvider> = ({ children }) => {
  return combineProviders({ children, providers: contextProviders })
}

export default ContextProvider

import { FC, ReactElement } from 'react'
import combineProviders from '../utils/combineProvider'
import { TabContextProvider } from '@/context/tabContext'

interface IContextProvider {
  children: ReactElement
}

const contextProviders = [TabContextProvider]

const TabProvider: FC<IContextProvider> = ({ children }) => {
  return combineProviders({ children, providers: contextProviders })
}

export default TabProvider

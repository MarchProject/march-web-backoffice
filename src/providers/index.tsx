import { FC, ReactElement } from 'react'
import combineProviders from '../utils/combineProvider'
import ContextProvider from './ContextProvider'

interface IProvider {
  children: ReactElement
}

const providers = [ContextProvider]

const Providers: FC<IProvider> = ({ children }) => {
  return combineProviders({ children, providers })
}

export default Providers

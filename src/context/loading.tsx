import {
  createContext,
  FC,
  ReactElement,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'
import { noop } from '../utils/common/noop'
import BlockUi from 'react-block-ui'
// import  Loader  from 'react-loaders'
import 'react-block-ui/style.css'
import 'loaders.css/loaders.min.css'
import Loader from 'react-loaders'
interface ILoadingProvider {
  children: ReactElement
}

interface ILoadingContext {
  openLoading: () => void
  closeLoading: () => void
  zIndexLoading: (value: number) => void
}

const LoadingContext = createContext<ILoadingContext>({
  openLoading: noop,
  closeLoading: noop,
  zIndexLoading: noop,
})

export const LoadingProvider: FC<ILoadingProvider> = (props) => {
  const { children } = props
  const [loading, setLoading] = useState(false)
  const [zIndex, setZIndex] = useState(9999)

  const openLoading = useCallback(() => {
    setLoading(true)
  }, [])

  const closeLoading = useCallback(() => {
    setTimeout(() => {
      setLoading(false)
    }, 600)
  }, [])

  const zIndexLoading = useCallback((value) => {
    setZIndex(value)
  }, [])

  const contextValue = useMemo(() => {
    return {
      closeLoading,
      openLoading,
      zIndexLoading,
    }
  }, [closeLoading, openLoading, zIndexLoading])
  const propsLoader = {
    color: '#a78bfa',
  }

  return (
    <LoadingContext.Provider value={contextValue}>
      <BlockUi
        tag="div"
        blocking={loading}
        style={{ zIndex: zIndex }}
        loader={<Loader active type={'ball-pulse'} {...propsLoader} />}>
        {children}
      </BlockUi>
    </LoadingContext.Provider>
  )
}

export const useLoadingContext = () => useContext(LoadingContext)

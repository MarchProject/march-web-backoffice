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
interface ITabProvider {
  children: ReactElement
}

interface ITabMenu {
  id: number
  label: string
  value: string
}

const TabMenu = [
  { id: 0, label: 'Home', value: 'home' },
  { id: 1, label: 'Sales', value: 'sales' },
  { id: 2, label: 'Inventory', value: 'inventory' },
  { id: 3, label: 'Customer', value: 'customer' },
  { id: 4, label: 'Dashboard', value: 'dashboard' },
]

interface ITabContext {
  handleTab: (tabIndex: string) => void
  tab: string
  TabMenu: ITabMenu[]
}

const TabContext = createContext<ITabContext>({
  handleTab: noop,
  tab: 'sales',
  TabMenu,
})

export const TabContextProvider: FC<ITabProvider> = (props) => {
  const { children } = props
  const [tab, setTab] = useState<string>('sales')
  const handleTab = useCallback((tabIndex: string) => {
    setTab(tabIndex.toLocaleLowerCase())
  }, [])

  const contextValue = useMemo(() => {
    return {
      handleTab,
      tab,
      TabMenu,
    }
  }, [handleTab, tab, TabMenu])

  return (
    <TabContext.Provider value={contextValue}>{children}</TabContext.Provider>
  )
}

export const useTabContext = () => useContext(TabContext)

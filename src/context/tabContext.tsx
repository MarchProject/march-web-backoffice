import { SnackbarCloseReason, SnackbarProps } from '@mui/material/Snackbar'
import {
  createContext,
  FC,
  ReactElement,
  SyntheticEvent,
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
  { id: 1, label: 'Sales', value: 'sales' },
  { id: 2, label: 'Inventory', value: 'inventory' },
  { id: 3, label: 'Customer', value: 'member' },
  { id: 4, label: 'Dashboard', value: 'dashboard' },
]

interface ITabContext {
  handleTab: (tabIndex: number) => void
  tab: number
  TabMenu: ITabMenu[]
}

const TabContext = createContext<ITabContext>({
  handleTab: noop,
  tab: 0,
  TabMenu,
})

export const TabContextProvider: FC<ITabProvider> = (props) => {
  const { children } = props
  const [tab, setTab] = useState<number>(0)

  const handleTab = useCallback((tabIndex: number) => {
    setTab(tabIndex)
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

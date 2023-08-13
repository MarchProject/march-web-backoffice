import { useCallback, useMemo, useState } from 'react'

export const useControllerUser = () => {
  const { userTabs, valueTab, handleValueTab, valueTabKey } = useTabsHandle()

  return {
    tabsHandle: { userTabs, valueTab, handleValueTab, valueTabKey },
  }
}

export interface IUserTab {
  id: number
  key: string
  Label: string
}

const useTabsHandle = () => {
  const [valueTab, setValueTab] = useState(0)
  const [valueTabKey, setValueTabKey] = useState('general')

  const userTabs: IUserTab[] = useMemo(() => {
    return [
      { id: 0, key: 'general', Label: 'General' },
      { id: 1, key: 'users', Label: 'Users' },
      { id: 3, key: 'role', Label: 'Role' },
      // { id: 4, key: 'plan', Label: 'Plan' },
      // { id: 5, key: 'billing', Label: 'Billing' },
      { id: 6, key: 'notification', Label: 'Notification' },
    ]
  }, [])

  const handleValueTab = useCallback(
    (value: number) => {
      setValueTab(value)
      setValueTabKey(userTabs.find((e) => e.id === value).key)
    },
    [userTabs],
  )

  return {
    userTabs,
    valueTab,
    handleValueTab,
    valueTabKey,
  }
}

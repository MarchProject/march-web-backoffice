import { inventoryCreateRoute } from '@/router/inventory'
import { UserOutlined } from '@ant-design/icons'
import { MenuProps } from 'antd'
import router from 'next/router'
import { useCallback } from 'react'

export const useMenuHandler = ({ handleOpen }) => {
  const items: MenuProps['items'] = [
    {
      label: '1st menu item',
      key: '1',
      icon: <UserOutlined />,
    },
    {
      label: '2nd menu item',
      key: '2',
      icon: <UserOutlined />,
      onClick: () => {
        handleOpen()
      },
    },
    {
      label: '3rd menu item',
      key: '3',
      icon: <UserOutlined />,
      danger: true,
    },
    {
      label: '4rd menu item',
      key: '4',
      icon: <UserOutlined />,
      danger: true,
      disabled: true,
    },
  ]

  const menuProps: MenuProps = {
    items,
    onClick: () => {},
  }

  const handleButtonClick = useCallback(() => {
    router.push({ pathname: inventoryCreateRoute.path })
  }, [])

  return {
    handleButtonClick,
    menuProps,
  }
}

import { inventoryCreateRoute } from '@/router/inventory'
import { tkeys } from '@/translations/i18n'
import { MenuProps } from 'antd'
import router from 'next/router'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { VscSettings } from 'react-icons/vsc'
import {
  IoAddCircleOutline,
  IoCloudUploadOutline,
  IoTrashBinOutline,
} from 'react-icons/io5'

export const useMenuHandler = ({
  handleOpenTransfer,
  handleOpenTrash,
  handleOpenBranch,
  handleOpenBrand,
  handleOpenType,
}) => {
  const { t: trans } = useTranslation()
  const tkeysMenu = tkeys.Inventory.MainPage.menu

  const handleAddItem = useCallback(() => {
    router.push({ pathname: inventoryCreateRoute.path })
  }, [])

  const items: MenuProps['items'] = [
    {
      label: trans(tkeysMenu.addItem),
      key: '1',
      icon: <IoAddCircleOutline className="text-[#a78bfa]" />,
      onClick: handleAddItem,
    },
    {
      label: trans(tkeysMenu.branch),
      key: '2',
      icon: <IoAddCircleOutline className="text-[#a78bfa]" />,
      onClick: handleOpenBranch,
    },
    {
      label: trans(tkeysMenu.brand),
      key: '3',
      icon: <IoAddCircleOutline className="text-[#a78bfa]" />,
      onClick: handleOpenBrand,
    },
    {
      label: trans(tkeysMenu.type),
      key: '4',
      icon: <IoAddCircleOutline className="text-[#a78bfa]" />,
      onClick: handleOpenType,
    },
    {
      label: trans(tkeysMenu.upload),
      key: '5',
      icon: <IoCloudUploadOutline className="text-[#a78bfa]" />,
      onClick: () => {},
    },
    {
      label: trans(tkeysMenu.tableConfig),
      key: '6',
      icon: <VscSettings className="text-[#a78bfa]" />,
      onClick: () => {
        handleOpenTransfer()
      },
    },
    {
      label: trans(tkeysMenu.trash),
      key: '7',
      icon: <IoTrashBinOutline className="text-[#a78bfa]" />,
      onClick: () => {
        handleOpenTrash()
      },
    },
  ]

  const menuProps: MenuProps = {
    items,
    onClick: () => {},
  }

  return {
    menuProps,
  }
}

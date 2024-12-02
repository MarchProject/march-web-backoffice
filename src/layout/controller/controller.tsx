import { getPicture, getShopName, getUsername } from '@/config/client'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { MenuProps } from 'antd'
import { RiHome4Line } from 'react-icons/ri'
import { FiDivideCircle } from 'react-icons/fi'
import { SlPeople } from 'react-icons/sl'
import { BsBoxSeam } from 'react-icons/bs'
import { RxDashboard } from 'react-icons/rx'
import { LiaUserShieldSolid } from 'react-icons/lia'
import * as clientConfig from '@/config/client'
import jwt from 'jsonwebtoken'
import { useTranslation } from 'react-i18next'
import router from 'next/router'

export interface ITabMenu {
  key: string
  label: string
  icon: React.ReactNode
  path: string
}

export const useLayoutController = () => {
  const { t: trans, i18n }: any = useTranslation()
  const {
    hide,
    setHide,
    tab,
    setTab,
    shopName,
    setShopName,
    tabMenu,
    setTabMenu,
    lg,
    setLg,
    urlPic,
    username,
  } = useGlobalState()

  const tranT = useCallback(
    (text: string) => {
      return trans(`common.Menu.${text}`)
    },
    [trans],
  )

  useEffect(() => {
    setShopName(getShopName())
  }, [setShopName])

  useEffect(() => {
    setLg(i18n.language)
  }, [i18n.language, setLg])

  const leftSide: React.CSSProperties = {
    flex: `0 0 ${!hide ? '220px' : '35px'}`,
    backgroundColor: 'red',
    transition: 'flex 0.5s ease',
  }
  const rightSide: React.CSSProperties = {
    flex: 1,
    overflowY: 'hidden',
    overflowX: 'hidden',
    backgroundColor: '#F5F3F7',
  }

  const lableFn = useCallback(
    (text: string) => {
      return tranT(text)
    },
    [tranT],
  )

  const styleIcon = useCallback(
    (value: string): React.CSSProperties => {
      return {
        color: hide ? '' : tab === value ? '#FFFFFF' : '#878787',
        backgroundColor: hide ? '' : tab === value ? '#a78bfa' : '',
        padding: hide ? '' : '4px',
        borderRadius: hide ? '' : '4px',
        fontSize: '28px',
      }
    },
    [tab, hide],
  )

  const TabMenu = useMemo(() => {
    return {
      'MENU:HOME': {
        key: '1',
        label: hide ? null : lableFn('Home'),
        icon: <RiHome4Line className="cursor-pointer" style={styleIcon('1')} />,
        path: 'home',
      },
      'MENU:SALES': {
        key: '2',
        label: hide ? null : lableFn('Sales'),
        icon: (
          <FiDivideCircle className="cursor-pointer" style={styleIcon('2')} />
        ),
        path: 'sales',
      },
      'MENU:INVENTORY': {
        key: '3',
        label: hide ? null : lableFn('Inventory'),
        icon: <BsBoxSeam className="cursor-pointer" style={styleIcon('3')} />,
        path: 'inventory',
      },
      'MENU:CUSTOMER': {
        key: '4',
        label: hide ? null : lableFn('Customer'),
        icon: <SlPeople className="cursor-pointer" style={styleIcon('4')} />,
        path: 'customer',
      },
      'MENU:DASHBOARD': {
        key: '5',
        label: hide ? null : lableFn('Dashboard'),
        icon: <RxDashboard className="cursor-pointer" style={styleIcon('5')} />,
        path: 'dashboard',
      },
      'MENU:USER': {
        key: '6',
        label: hide ? null : lableFn('User'),
        icon: (
          <LiaUserShieldSolid
            className="cursor-pointer"
            style={styleIcon('6')}
          />
        ),
        path: 'user',
      },
    }
  }, [hide, lableFn, styleIcon])

  useEffect(() => {
    const pathName = router.pathname.split('/')
    const _pathName = pathName[1]
    const numTab = 'MENU:' + _pathName.toUpperCase()
    setTab(TabMenu[numTab].key)
  }, [TabMenu, setTab])

  const getMenuMapping = useCallback(
    (scopes: string[]) => {
      const setTab = [
        {
          key: '1',
          label: hide ? null : tranT('Home'),
          icon: (
            <RiHome4Line className="cursor-pointer" style={styleIcon('1')} />
          ),
          path: 'home',
        },
      ]
      scopes?.forEach((scope) => {
        if (scope) {
          setTab.push(TabMenu[scope])
        }
      })
      setTabMenu(setTab)
    },
    [TabMenu, hide, setTabMenu, styleIcon, tranT],
  )

  useEffect(() => {
    const accessToken = clientConfig.getAccessToken()
    const decoded = jwt.decode(accessToken) as any
    const scopes = decoded?.info?.functions
    getMenuMapping(scopes)
  }, [getMenuMapping])

  const handlePath = (value) => {
    const pathName = router.pathname
    if (value === pathName.replace('/', '')) {
      return
    }
    router.replace({ pathname: '/' + value })
  }

  const onClickMenu: MenuProps['onClick'] = (e) => {
    const value = tabMenu.find((f) => f.key === e.key)
    handlePath(value.path)
  }

  return {
    globalState: {
      hide,
      setHide,
      tab,
      setTab,
      shopName,
      setShopName,
      tabMenu,
      setTabMenu,
      lg,
      setLg,
      urlPic,
      username,
    },
    styleSide: {
      leftSide,
      rightSide,
    },
    Menu: {
      onClick: onClickMenu,
      handlePath,
    },
    i18n,
  }
}

const useGlobalState = () => {
  const [hide, setHide] = useState(false)
  const [tab, setTab] = useState('1')
  const [shopName, setShopName] = useState('')
  const [tabMenu, setTabMenu] = useState<ITabMenu[]>([])
  const [lg, setLg] = useState('')

  const basePic = `${process.env.basePath}/man.png`
  const urlPic = getPicture() || basePic
  const username = getUsername()

  return {
    hide,
    setHide,
    tab,
    setTab,
    shopName,
    setShopName,
    tabMenu,
    setTabMenu,
    lg,
    setLg,
    urlPic,
    username,
  }
}

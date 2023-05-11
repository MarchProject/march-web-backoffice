/* eslint-disable @next/next/no-img-element */
import { Box, Tab, Tabs, Tooltip } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { getUsername } from '@/config/client'
import router from 'next/router'
import * as clientConfig from '@/config/client'
import StoreIcon from '@mui/icons-material/Store'
import CardMembershipIcon from '@mui/icons-material/CardMembership'
import HomeIcon from '@mui/icons-material/Home'
import jwt from 'jsonwebtoken'
import { orderBy, uniqBy } from 'lodash'
import dynamic from 'next/dynamic'
import { SignOut } from '@/components/logout/logout'
import { BsBoxSeam } from 'react-icons/bs'
import { RxDashboard } from 'react-icons/rx'

const TabMenu = {
  'MENU:HOME': { id: 0, label: 'Home', value: 'home' },
  'MENU:SALES': { id: 1, label: 'Sales', value: 'sales' },
  'MENU:INVENTORY': { id: 2, label: 'Inventory', value: 'inventory' },
  'MENU:CUSTOMER': { id: 3, label: 'Customer', value: 'customer' },
  'MENU:DASHBOARD': { id: 4, label: 'Dashboard', value: 'dashboard' },
}

function Layout({ children }) {
  const [tab, setTab] = useState(0)
  // const [menuM, setMenuM] = useState(false)
  const [tabMenu, setTabMenu] = useState([
    { id: 0, label: 'Home', value: 'home' },
  ])

  useEffect(() => {
    const pathName = router.pathname.replace('/', '')
    const numTab = 'MENU:' + pathName.toUpperCase()
    setTab(TabMenu[numTab].id)
  }, [])

  useEffect(() => {
    const accessToken = clientConfig.getAccessToken()
    const decoded = jwt.decode(accessToken) as any
    const scopes = decoded?.info?.functions
    getMenuMapping(scopes)
  }, [])

  function getMenuMapping(scopes: string[]) {
    scopes?.forEach((scope) => {
      if (scope) {
        setTabMenu((prev) => [...prev, TabMenu[scope]])
      }
    })
  }

  const IconTab = ({ value }) => {
    const styleIcon: React.CSSProperties = {
      color: tab === value ? '#FFFFFF' : '#878787',
      backgroundColor: tab === value ? '#9A73B5' : '#E9E4ED',
      padding: '4px',
      borderRadius: '4px',
      marginTop: 'auto',
      marginBottom: 'auto',
      fontSize: '20px',
    }
    return (
      <div className="">
        {value === 0 && (
          <HomeIcon className="cursor-pointer" style={styleIcon} />
        )}
        {value === 4 && (
          <RxDashboard className="cursor-pointer" style={styleIcon} />
        )}
        {value === 2 && (
          <BsBoxSeam className="cursor-pointer" style={styleIcon} />
        )}
        {value === 1 && (
          <StoreIcon className="cursor-pointer" style={styleIcon} />
        )}
        {value === 3 && (
          <CardMembershipIcon className="cursor-pointer" style={styleIcon} />
        )}
      </div>
    )
  }

  const handlePath = (value) => {
    const pathName = router.pathname
    if (value === pathName.replace('/', '')) {
      return
    }
    router.push({ pathname: value })
  }

  const TabM = (isMobile: boolean) => {
    const test = orderBy(
      uniqBy(tabMenu, 'id').map((t) => {
        const Lable = () => {
          return <div className="block text-xs mt-[5px] sm:mt-0">{t.label}</div>
        }
        const gapIcon = isMobile ? '0px' : '10px'
        const paddingInline = isMobile ? '0px' : '40px'
        const fontWeight = isMobile ? 'normal' : 'bold'
        return (
          <Tooltip title={t.value} key={t.id} arrow>
            <Tab
              style={{
                justifyContent: 'start',
                paddingInline: paddingInline,
                gap: gapIcon,
                color: tab === t.id ? '#121212' : '#878787',
                fontWeight,
                paddingTop: '0px',
                paddingBottom: '0px',
                minHeight: '50px',
              }}
              icon={<IconTab value={t.id} />}
              iconPosition={isMobile ? 'top' : 'start'}
              key={t.id}
              onClick={() => handlePath(t.value)}
              label={Lable()}
              value={t.value as any}
              defaultValue={t.value}
            />
          </Tooltip>
        )
      }),
      ['key'],
      ['asc'],
    )
    console.log({ test })
    return test
  }
  const UserUI = () => {
    const username = getUsername()
    return (
      <div className="mt-[20px] px-[40px] flex bg-white justify-between">
        <img
          className="max-w-[30px] max-h-[30px] my-auto  block"
          src={`${process.env.basePath}/man.png`}
          alt="user-icon"
        />

        <h3 className="text-center text-primary text-xs capitalize font-normal block">
          {username}
        </h3>
        <Tooltip title="Sign Out" arrow placement="top">
          <div className="my-auto">
            <SignOut />
          </div>
        </Tooltip>
      </div>
    )
  }

  return (
    <>
      <div className="sm:block w-full ">
        <Box
          className="flex h-full"
          style={{ backgroundColor: '#F5F3F7' }}
          sx={{
            flexGrow: 1,
            bgcolor: 'background.paper',
            display: 'flex',
            height: '100vh',
            // maxHeight: '100vh',
            backgroundColor: '#F5F3F7',
          }}>
          <div
            className="w-[30%] bg-white max-w-[260px] "
            style={{ borderRight: '1px solid #CCCCCC', overflowX: 'hidden' }}>
            <h2 className="text-left text-primary capitalize font-normal px-[40px]">
              CurryShop
            </h2>
            <h4 className="text-left text-xs text-primary capitalize font-normal my-0 px-[40px] mt-[30px]">
              MainMenu
            </h4>
            <Tabs
              className=""
              orientation="vertical"
              variant="scrollable"
              value={tab}
              aria-label="Vertical tabs example"
              sx={{
                borderRight: 1,
                borderColor: 'divider',
                width: '100%',
              }}>
              {TabM(false)}
            </Tabs>
            {/* <div className='pb-[30px]'>
              <SignOut />
            </div> */}
            <div className="bottom-0 fixed pb-[10px] w-[100%] max-w-[260px] cursor-pointer">
              <UserUI />
            </div>
          </div>
          <div className="w-[88%] mainBg">{children}</div>
        </Box>
      </div>
      {/* <div className="sm:hidden block ">
        <Box
          className="w-full h-screen mainBg"
          sx={{
            backgroundColor: '#F5F3F7',
          }}>
          <div className="sticky top-0" style={{ backgroundColor: '#F5F3F7' }}>
            <div className="px-[10px] mb-[0px] flex justify-between">
              <UserUI />
              <SignOut />
            </div>
          </div>
          {children}
          <Tabs
            className="mt-[30]"
            orientation="horizontal"
            variant="scrollable"
            value={tab}
            aria-label="Tabs Mobile"
            sx={{
              borderRight: 1,
              borderColor: 'divider',
              width: '100%',
              position: 'fixed',
              bottom: 0,
            }}>
            {TabM(true)}
          </Tabs>
        </Box>
      </div> */}
    </>
  )
}

// export default Layout
export default dynamic(() => Promise.resolve(Layout), { ssr: false })

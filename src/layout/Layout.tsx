/* eslint-disable @next/next/no-img-element */
import { Box, Tab, Tabs } from '@mui/material'
import React, { useEffect, useState } from 'react'
import DashboardIcon from '@mui/icons-material/Dashboard'
import { getUsername } from '@/config/client'
import router from 'next/router'
import * as clientConfig from '@/config/client'
import StoreIcon from '@mui/icons-material/Store'
import InventoryIcon from '@mui/icons-material/Inventory'
import CardMembershipIcon from '@mui/icons-material/CardMembership'
import HomeIcon from '@mui/icons-material/Home'
import jwt from 'jsonwebtoken'
import { uniqBy } from 'lodash'
import dynamic from 'next/dynamic'
import { SignOut } from '@/components/logout/logout'
const TabMenu = {
  'MENU:HOME': { id: 0, label: 'Home', value: 'home' },
  'MENU:SALES': { id: 1, label: 'Sales', value: 'sales' },
  'MENU:INVENTORY': { id: 2, label: 'Inventory', value: 'inventory' },
  'MENU:CUSTOMER': { id: 3, label: 'Customer', value: 'customer' },
  'MENU:DASHBOARD': { id: 4, label: 'Dashboard', value: 'dashboard' },
}

function Layout({ children }) {
  const [tab, setTab] = useState('home')
  const [menuM, setMenuM] = useState(false)
  const [tabMenu, setTabMenu] = useState([
    { id: 0, label: 'Home', value: 'home' },
  ])

  useEffect(() => {
    const pathName = router.pathname.replace('/', '')
    setTab(pathName)
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
    }
    return (
      <>
        {value === 'home' && (
          <HomeIcon className="cursor-pointer" style={styleIcon} />
        )}
        {value === 'dashboard' && (
          <DashboardIcon className="cursor-pointer" style={styleIcon} />
        )}
        {value === 'inventory' && (
          <InventoryIcon className="cursor-pointer" style={styleIcon} />
        )}
        {value === 'sales' && (
          <StoreIcon className="cursor-pointer" style={styleIcon} />
        )}
        {value === 'customer' && (
          <CardMembershipIcon
            className="cursor-pointer"
            style={{
              color: tab === value ? '#FFFFFF' : '#878787',
              backgroundColor: tab === value ? '#9A73B5' : '#E9E4ED',
              padding: '4px',
              borderRadius: '4px',
              marginTop: 'auto',
              marginBottom: 'auto',
            }}
          />
        )}
      </>
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
    return uniqBy(tabMenu, 'id').map((t) => {
      const Lable = () => {
        return (
          <div className="block text-xs sm:text-sm mt-[5px] sm:mt-0">
            {t.label}
          </div>
        )
      }
      const gapIcon = isMobile ? '0px' : '25px'
      const paddingInline = isMobile ? '0px' : '30px'
      const fontWeight = isMobile ? 'normal' : 'bold'
      return (
        <Tab
          style={{
            justifyContent: 'start',
            paddingInline: paddingInline,
            gap: gapIcon,
            color: tab === t.value ? '#121212' : '#878787',
            fontWeight,
          }}
          icon={<IconTab value={t.value} />}
          iconPosition={isMobile ? 'top' : 'start'}
          key={t.id}
          onClick={() => handlePath(t.value)}
          label={Lable()}
          value={t.value as any}
          defaultValue={t.value}
        />
      )
    })
  }
  const UserUI = () => {
    const username = getUsername()
    return (
      <div className="md:p-[20px] p-[10px] md:mt-[20px] sm:block flex">
        <img
          className="sm:max-w-[50px]  max-w-[30px] m-auto block"
          src={`${process.env.basePath}/man.png`}
          alt="user-icon"
        />
        <h3 className="text-center text-primary capitalize font-normal sm:block hidden">
          {username}
        </h3>
      </div>
    )
  }

  const handleMenuM = () => {
    setMenuM(!menuM)
  }
  return (
    <>
      <div className="hidden sm:block w-full ">
        <Box
          className="flex  h-screen"
          style={{ backgroundColor: '#F5F3F7' }}
          sx={{
            flexGrow: 1,
            bgcolor: 'background.paper',
            display: 'flex',
            height: '100vh',
            maxHeight: '100vh',
            backgroundColor: '#F5F3F7',
          }}>
          <div
            style={{ borderRight: '1px solid #CCCCCC', overflowX: 'hidden' }}>
            <UserUI />
            <Tabs
              className="mt-[30] "
              orientation="vertical"
              variant="scrollable"
              value={tab}
              aria-label="Vertical tabs example"
              sx={{
                borderRight: 1,
                borderColor: 'divider',
                width: '300px',
                maxWidth: '300px',
              }}>
              {TabM(false)}
            </Tabs>

            <SignOut />
          </div>
          {children}
        </Box>
      </div>
      <div className="sm:hidden block ">
        <Box
          className="w-full h-screen"
          sx={{
            backgroundColor: '#F5F3F7',
          }}>
          <div className="sticky top-0" style={{ backgroundColor: '#F5F3F7' }}>
            <div className="px-[10px] mb-[0px] flex justify-between">
              {/* <MenuIcon
                className="cursor-pointer"
                onClick={handleMenuM}
                style={{
                  color: !menuM ? '#FFFFFF' : '#878787',
                  backgroundColor: !menuM ? '#9A73B5' : '#E9E4ED',
                  padding: '4px',
                  borderRadius: '4px',
                  marginTop: 'auto',
                  marginBottom: 'auto',
                  cursor: 'pointer',
                }}
              /> */}
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
      </div>
    </>
  )
}

// export default Layout
export default dynamic(() => Promise.resolve(Layout), { ssr: false })

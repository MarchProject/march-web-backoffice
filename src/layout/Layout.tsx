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
import Image from 'next/image'
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

  const TabM = uniqBy(tabMenu, 'id').map((t) => {
    return (
      <Tab
        style={{
          justifyContent: 'start',
          paddingInline: '30px',
          gap: '25px',
          color: tab === t.value ? '#121212' : '#878787',
          fontWeight: 'bold',
        }}
        icon={<IconTab value={t.value} />}
        iconPosition="start"
        key={t.id}
        onClick={() => handlePath(t.value)}
        label={t.label}
        value={t.value as any}
        defaultValue={t.value}
      />
    )
  })

  const UserUI = () => {
    const username = getUsername()
    return (
      <div className="p-[20px] mt-[20px]">
        <Image
          className="max-w-[50px] m-auto block"
          src={`${process.env.basePath}/man.png`}
          alt="user-icon"
          width={50}
          height={50}
        />
        <h3 className="text-center text-primary capitalize">{username}</h3>
      </div>
    )
  }

  return (
    <div className="hidden sm:block">
      <Box
        sx={{
          flexGrow: 1,
          bgcolor: 'background.paper',
          display: 'flex',
          height: '100vh',
          maxHeight: '100vh',
          backgroundColor: '#F5F3F7',
        }}>
        <div style={{ borderRight: '1px solid #CCCCCC' }}>
          <UserUI />
          <Tabs
            className="mt-[30%]"
            orientation="vertical"
            variant="scrollable"
            value={tab}
            aria-label="Vertical tabs example"
            sx={{
              borderRight: 1,
              borderColor: 'divider',
              width: '100%',
              maxWidth: '250px',
              minWidth: '220px',
            }}>
            {TabM}
          </Tabs>
          <SignOut />
        </div>
        {children}
      </Box>
    </div>
  )
}

// export default Layout
export default dynamic(() => Promise.resolve(Layout), { ssr: false })

/* eslint-disable @next/next/no-img-element */
import { Box, Tab, Tabs } from '@mui/material'
import React, { useEffect, useState } from 'react'
import DashboardIcon from '@mui/icons-material/Dashboard'
import { getUserId, getUsername } from '@/config/client'
import LogoutIcon from '@mui/icons-material/Logout'
import { useMutation } from '@apollo/client'
import { signOutMutation } from '@/core/gql/auth'
import { useRouter } from 'next/router'
import * as clientConfig from '@/config/client'
import Cookies from 'js-cookie'
import BlockUi from 'react-block-ui'
import StoreIcon from '@mui/icons-material/Store'
import InventoryIcon from '@mui/icons-material/Inventory'
import CardMembershipIcon from '@mui/icons-material/CardMembership'
// enum EnumTabs {
//   Dashboard = 'dashboard',
//   Inventory = 'inventory',
//   Sales = 'sales',
// }

type SignOut = {
  signOut: {
    id: string
  }
}

const TabMenu = [
  { id: 1, label: 'Sales', value: 'sales' },
  { id: 2, label: 'Inventory', value: 'inventory' },
  { id: 3, label: 'Customer', value: 'member' },
  { id: 4, label: 'Dashboard', value: 'dashboard' },
]

function Layout({ children }) {
  const [tab, setTab] = useState(0)

  const [signOut, { loading, data }] = useMutation<SignOut, any>(
    signOutMutation,
  )

  const handleChange = (e, index) => {
    console.log({ e: e.target })
    setTab(index)
  }

  const IconTab = ({ value, index }) => {
    return (
      <>
        {value === 'dashboard' && (
          <DashboardIcon
            className="cursor-pointer"
            style={{
              color: tab === index ? '#FFFFFF' : '#878787',
              backgroundColor: tab === index ? '#9A73B5' : '#E9E4ED',
              padding: '4px',
              borderRadius: '4px',
              marginTop: 'auto',
              marginBottom: 'auto',
            }}
          />
        )}
        {value === 'inventory' && (
          <InventoryIcon
            className="cursor-pointer"
            style={{
              color: tab === index ? '#FFFFFF' : '#878787',
              backgroundColor: tab === index ? '#9A73B5' : '#E9E4ED',
              padding: '4px',
              borderRadius: '4px',
              marginTop: 'auto',
              marginBottom: 'auto',
            }}
          />
        )}
        {value === 'sales' && (
          <StoreIcon
            className="cursor-pointer"
            style={{
              color: tab === index ? '#FFFFFF' : '#878787',
              backgroundColor: tab === index ? '#9A73B5' : '#E9E4ED',
              padding: '4px',
              borderRadius: '4px',
              marginTop: 'auto',
              marginBottom: 'auto',
            }}
          />
        )}
        {value === 'member' && (
          <CardMembershipIcon
            className="cursor-pointer"
            style={{
              color: tab === index ? '#FFFFFF' : '#878787',
              backgroundColor: tab === index ? '#9A73B5' : '#E9E4ED',
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

  const TabM = TabMenu.map((t, index) => {
    return (
      <div
        key={index}
        onClick={() => {
          setTab(index)
        }}
        style={{ display: 'flex', paddingInline: 30, paddingBlock: 5 }}>
        <IconTab value={t.value} index={index} />
        <Tab
          style={{
            alignItems: 'self-start',
            color: tab === index ? '#121212' : '#878787',
            fontWeight: 'bold',
          }}
          key={t.id}
          label={t.label}
          value={index}
        />
      </div>
    )
  })

  const UserUI = () => {
    const username = getUsername()
    return (
      <div className="p-[20px] mt-[20px]">
        <img
          className="max-w-[50px] m-auto block"
          src={`${process.env.basePath}/public/man.png`}
          alt="user-icon"
        />
        <h3 className="text-center text-primary capitalize">{username}</h3>
      </div>
    )
  }

  const LogoutUI = () => {
    const router = useRouter()
    const userId = getUserId()

    useEffect(() => {
      if (data?.signOut?.id) {
        clientConfig.removeAccessToken()
        clientConfig.removeRefreshToken()
        Cookies.remove('mbo-token')
        Cookies.remove('mbo-refresh')
        router.push({ pathname: clientConfig.getDefaultLoginPath() })
      }
    }, [data])

    const handleSignOut = () => {
      signOut({
        variables: {
          id: userId,
        },
      })
    }

    return (
      <div className="text-center p-[30px] mt-[40%]">
        <div
          className="flex justify-center cursor-pointer"
          onClick={handleSignOut}>
          <LogoutIcon className="text-secondary my-auto" />
          <h4 className="text-secondary font-normal px-[10px]">Log Out</h4>
        </div>
      </div>
    )
  }

  return (
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
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{
            borderRight: 1,
            borderColor: 'divider',
            width: '100%',
            maxWidth: '250px',
          }}>
          {TabM}
        </Tabs>
        <LogoutUI />
      </div>
      <BlockUi tag="div" blocking={loading}>
        {children}
      </BlockUi>
    </Box>
  )
}

export default Layout

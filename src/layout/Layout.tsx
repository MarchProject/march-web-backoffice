/* eslint-disable @next/next/no-img-element */
import { Tab, Tabs, Tooltip } from '@mui/material'
import React, { memo, useEffect, useState } from 'react'
import { getUsername } from '@/config/client'
import router from 'next/router'
import * as clientConfig from '@/config/client'
import jwt from 'jsonwebtoken'
import { orderBy, uniqBy } from 'lodash'
import dynamic from 'next/dynamic'
import SignOut from '@/components/logout/logout'
import { BsBoxSeam } from 'react-icons/bs'
import { RxDashboard } from 'react-icons/rx'
import { RiHome4Line } from 'react-icons/ri'
import { FiDivideCircle } from 'react-icons/fi'
import { FcWorkflow } from 'react-icons/fc'
import { SlPeople } from 'react-icons/sl'

const TabMenu = {
  'MENU:HOME': { id: 0, label: 'Home', value: 'home' },
  'MENU:SALES': { id: 1, label: 'Sales', value: 'sales' },
  'MENU:INVENTORY': { id: 2, label: 'Inventory', value: 'inventory' },
  'MENU:CUSTOMER': { id: 3, label: 'Customer', value: 'customer' },
  'MENU:DASHBOARD': { id: 4, label: 'Dashboard', value: 'dashboard' },
}

function Layout({ children }) {
  const [tab, setTab] = useState(0)
  const [hide, setHide] = useState(false)
  const [tabMenu, setTabMenu] = useState([
    { id: 0, label: 'Home', value: 'home' },
  ])

  useEffect(() => {
    // const pathName = router.pathname.replace('/', '')
    const pathName = router.pathname.split('/')
    const _pathName = pathName[1]
    const numTab = 'MENU:' + _pathName.toUpperCase()
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
      backgroundColor: tab === value ? '#9A73B5' : '', //#E9E4ED
      padding: '4px',
      borderRadius: '4px',
      marginTop: 'auto',
      marginBottom: 'auto',
      fontSize: '20px',
    }
    return (
      <div className={hide ? 'mx-auto' : '' + ' min-w-0'}>
        {value === 0 && (
          <RiHome4Line className="cursor-pointer" style={styleIcon} />
        )}
        {value === 4 && (
          <RxDashboard className="cursor-pointer" style={styleIcon} />
        )}
        {value === 2 && (
          <BsBoxSeam className="cursor-pointer" style={styleIcon} />
        )}
        {value === 1 && (
          <FiDivideCircle className="cursor-pointer" style={styleIcon} />
        )}
        {value === 3 && (
          <SlPeople className="cursor-pointer" style={styleIcon} />
        )}
      </div>
    )
  }

  const handlePath = (value) => {
    const pathName = router.pathname
    if (value === pathName.replace('/', '')) {
      return
    }
    console.log({ valuepath: value })
    router.replace({ pathname: '/' + value })
  }

  const TabM = (isMobile: boolean) => {
    const test = orderBy(
      uniqBy(tabMenu, 'id').map((t) => {
        const Lable = () => {
          return (
            <div
              className={
                'text-xs mt-[5px] sm:mt-0 ' +
                (!hide
                  ? 'block opacity-100'
                  : 'overflow-hidden opacity-0 w-0 h-0 absolute')
              }
              style={{
                transition: 'opacity 1s ease-in',
              }}>
              {t.label}
            </div>
          )
        }
        const gapIcon = isMobile ? '0px' : '10px'
        const paddingInline = !hide ? '20px' : ''
        const fontWeight = isMobile ? 'normal' : 'bold'
        return (
          <Tooltip title={t.value} key={t.id} arrow>
            <Tab
              sx={{
                '& .MuiTab-labelIcon': {
                  minWidth: 0,
                },
              }}
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
    return test
  }
  const UserUI = () => {
    const username = getUsername()
    return (
      <div
        className={
          'mt-[20px] flex bg-white justify-between mx-auto ' +
          (hide ? 'max-w-[40px]' : 'px-[40px]')
        }>
        <img
          className={
            'max-w-[30px] max-h-[30px] my-auto block ' +
            (hide ? ' mx-auto' : '')
          }
          src={`${process.env.basePath}/man.png`}
          alt="user-icon"
        />
        <h3
          className={
            'text-center text-primary text-xs capitalize font-normal ' +
            (!hide
              ? 'block opacity-100'
              : 'overflow-hidden opacity-0 w-0 h-0 absolute')
          }
          style={{ transition: 'opacity 1s ease-in' }}>
          {username}
        </h3>

        <Tooltip title="Sign Out" arrow placement="top">
          <div
            className={
              'my-auto ' +
              (!hide
                ? 'block opacity-100'
                : 'overflow-hidden opacity-0 w-0 h-0 absolute')
            }
            style={{ transition: 'opacity 1s ease-in' }}>
            <SignOut />
          </div>
        </Tooltip>
      </div>
    )
  }
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
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div style={leftSide}>
        <div
          className={'flex flex-col justify-between bg-white ' + 'h-full'}
          onMouseEnter={() => setHide(false)}
          onMouseLeave={() => setHide(true)}
          style={{
            borderRight: '1px solid #CCCCCC',
            overflowX: 'hidden',
            transition: 'width 0.7s',
          }}>
          <div>
            <div className="flex justify-between py-[20px]">
              <div className={'flex ' + (!hide ? 'px-[20px]' : 'mx-auto ')}>
                <FcWorkflow className="my-auto" style={{ fontSize: '30px' }} />
                <h3
                  className={
                    'text-left text-primary capitalize font-normal ml-[5px] my-auto ' +
                    (!hide ? 'block' : 'hidden')
                  }
                  style={{
                    transition: 'opacity 0.7s',
                  }}>
                  CurryShop
                </h3>
              </div>
            </div>
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
                '& .MuiTab-labelIcon': {
                  minWidth: 0,
                },
              }}>
              {TabM(false)}
            </Tabs>
          </div>
          <div className="pb-[10px] w-[100%] max-w-[260px] cursor-pointer">
            <UserUI />
          </div>
        </div>
      </div>
      <div
        style={rightSide}
        onMouseEnter={() => setHide(true)}
        // onMouseLeave={() => setHide(false)}
      >
        <div
          className={'mainBg overflow-y-auto'}
          style={{ overflowY: 'scroll' }}>
          {children}
        </div>
      </div>
    </div>
  )
}

export default dynamic(() => Promise.resolve(memo(Layout)), { ssr: false })

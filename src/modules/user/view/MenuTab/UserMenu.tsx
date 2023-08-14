import { Tab, Tabs } from '@mui/material'
import React from 'react'
import { IUserTab } from '../../controller'

interface IUserMenuProps {
  userTabs: IUserTab[]
  handleValueTab: (value: number) => void
  valueTab: number
}

const UserMenu = ({ userTabs, handleValueTab, valueTab }: IUserMenuProps) => {
  const TabUser = (nameTab) => {
    const Tabs = nameTab.map((n) => {
      return (
        <Tab
          key={n.key}
          label={n.Label}
          className="!normal-case"
          style={{
            marginTop: '5px',
            borderRadius: '5px',
            zIndex: 2,
            fontWeight: 600,
          }}
          onClick={() => {
            handleValueTab(n.id)
          }}
          value={n.id}
        />
      )
    })
    return Tabs
  }

  return (
    <div className="mt-[10px]">
      <Tabs
        className="bg-gray-100 rounded-xl gap-[10px] h-[56px]"
        sx={{
          '& .MuiTabs-flexContainer': {
            justifyContent: 'start',
          },
          '& .MuiTabs-scroller': {
            marginInline: '4px',
            overflow: 'auto !important',
          },
        }}
        // variant="fullWidth"
        value={valueTab}
        TabIndicatorProps={{
          style: {
            backgroundColor: 'white',
            marginBottom: 4,
            height: '48px',
            zIndex: 1,
            borderRadius: '12px',
            textAlign: 'center',
          },
        }}>
        {TabUser(userTabs)}
      </Tabs>
    </div>
  )
}

export default UserMenu

import { Tab, Tabs } from '@mui/material'
import React, { useState } from 'react'

const UserMenu = () => {
  const [value, setValue] = useState(0)
  const userTabs = [
    { id: 0, key: 'details', Label: 'Details' },
    { id: 1, key: 'profile', Label: 'Profile' },
    { id: 2, key: 'team', Label: 'Team' },
    { id: 3, key: 'role', Label: 'Role' },
    { id: 4, key: 'plan', Label: 'Plan' },
    { id: 5, key: 'billing', Label: 'Billing' },
    { id: 6, key: 'notification', Label: 'Notification' },
  ]

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
            // maxWidth: '120px',
          }}
          onClick={() => {
            setValue(n.id)
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
          },
        }}
        value={value}
        // variant="fullWidth"
        TabIndicatorProps={{
          style: {
            backgroundColor: 'white',
            marginBottom: 4,
            // paddingInline: 4,
            height: '48px',
            zIndex: 1,
            borderRadius: '12px',
            textAlign: 'center',
            // margin: '5px',
            // padding: '5px',
          },
        }}>
        {TabUser(userTabs)}
      </Tabs>
      {/* {TrashOBJView(trashObjs, recoveryHardDeletedHandle, type)} */}
    </div>
  )
}

export default UserMenu

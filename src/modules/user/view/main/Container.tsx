import React from 'react'
import GeneralTabUser from './subMain/General'
import UsersTabUser from './subMain/User'
import RoleTabUser from './subMain/Role'
import NotiTabUser from './subMain/Notification'

interface IMainUsersProps {
  valueTabKey: string
  generalProps?: any
  usersProps?: any
  roleProps?: any
  notiProps?: any
}

const MainUsers = ({
  valueTabKey,
  generalProps,
  usersProps,
  roleProps,
  notiProps,
}: IMainUsersProps) => {
  const MenuTab = (valueTabKey: string) => {
    switch (valueTabKey) {
      case 'general': {
        return <GeneralTabUser generalProps={generalProps} />
      }
      case 'users': {
        return <UsersTabUser usersProps={usersProps} />
      }
      case 'role': {
        return <RoleTabUser roleProps={roleProps} />
      }
      case 'notification': {
        return <NotiTabUser notiProps={notiProps} />
      }
      default: {
        return null
      }
    }
  }

  return <div className="overflow-y-auto">{MenuTab(valueTabKey)}</div>
}

export default MainUsers

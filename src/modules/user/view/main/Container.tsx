import React from 'react'
import GeneralTabUser from './subMain/General'
import UsersTabUser from './subMain/user/Container'
import RoleTabUser from './subMain/Role'
import NotiTabUser from './subMain/Notification'
import { userManagementController } from './controller'

interface IMainUsersProps {
  valueTabKey: string
}

const MainUsers = ({ valueTabKey }: IMainUsersProps) => {
  const { generalProps, usersProps, roleProps, notiProps } =
    userManagementController()

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

  return (
    <div className="">
      {MenuTab(valueTabKey)}
    </div>
  )
}

export default MainUsers

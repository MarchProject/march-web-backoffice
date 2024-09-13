import { Group, User } from '@/core/model/user'
import React from 'react'
import Users from './views/Users'
import Pending from './views/Pending'
import InviteTeam from './views/Modals/InviteTeam'
import { useUserTabController } from './controller'

interface IUsersTabUser {
  usersProps: { users: User[]; triggerPermissionHandler: () => void }
  roleProps: {
    roles: Group[]
  }
}

const UsersTabUser = ({ usersProps, roleProps }: IUsersTabUser) => {
  const { inviteModalHandler, formHandler, revokeSubUserHandle } =
    useUserTabController({
      roles: roleProps.roles,
      triggerPermissionHandler: usersProps.triggerPermissionHandler,
    })
  return (
    <>
      <InviteTeam
        open={inviteModalHandler.open}
        handleClose={inviteModalHandler.handleClose}
        onCancel={inviteModalHandler.handleClose}
        onInvite={inviteModalHandler.onSubmit}
        control={formHandler.control}
        dataRoles={inviteModalHandler.dataRoles}
      />
      <Users
        users={usersProps.users}
        handleModalInvite={inviteModalHandler.handleOpen}
      />
      <hr className="border-slate-50 mt-[25px]"></hr>
      <Pending
        users={usersProps.users}
        revokeSubUserHandle={revokeSubUserHandle}
      />
    </>
  )
}

export default UsersTabUser

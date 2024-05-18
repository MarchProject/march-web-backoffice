import { User } from '@/core/model/user'
import React from 'react'
import Users from './views/Users'
import Pending from './views/Pending'

interface IUsersTabUser {
  usersProps: { users: User[] }
}

const UsersTabUser = ({ usersProps }: IUsersTabUser) => {

  return (
    <>
      <Users users={usersProps.users} />
      <hr className="border-slate-50 mt-[25px]"></hr>
      <Pending users={usersProps.users} />
    </>
  )
}

export default UsersTabUser

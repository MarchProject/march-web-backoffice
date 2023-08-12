import { styleIconMarch } from '@/utils/style/utill'
import React from 'react'
import { LiaUserShieldSolid } from 'react-icons/lia'

const NavbarUser = () => {
  return (
    <div id="navbar-user" className="flex justify-between w-[100%]">
      <div className="flex gap-[15px] my-auto w-[25%]">
        <LiaUserShieldSolid style={styleIconMarch} />
        <p className="text-base text-primary font-medium">User Management</p>
      </div>
    </div>
  )
}

export default NavbarUser

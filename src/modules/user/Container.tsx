import NavbarUser from '@/components/user/NavbarUser'
import React from 'react'
import UserMenu from './view/MenuTab/UserMenu'

const ContainerUser = () => {
//   const {} = useControllerUser()
  return (
    <div className="w-full mainBg h-screen" style={{ height: '100%' }}>
      <div className="p-[15px]">
        <div className="bg-white m-0 rounded-lg p-[15px] " style={{ height: '100%' }}>
          <div className="mb-[0px] h-full">
            <NavbarUser />
            <UserMenu />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContainerUser

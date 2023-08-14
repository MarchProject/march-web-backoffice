import NavbarUser from '@/components/user/NavbarUser'
import React from 'react'
import UserMenu from './view/MenuTab/UserMenu'
import MainUsers from './view/main/Container'
import { useControllerUser } from './controller'

const ContainerUser = () => {
  const {
    tabsHandle: { userTabs, valueTab, handleValueTab, valueTabKey },
  } = useControllerUser()

  return (
    <div
      className={`w-full mainBg min-h-[calc(100vh + 10px)] h-auto lg:h-[calc(100vh)] `}>
      <div id="navbar-user" className="p-[15px]">
        <div
          className={`bg-white m-0 rounded-lg p-[15px] lg:min-h-[calc(100vh-63px)] min-h-[calc(100vh-56px)]`}>
          <div className="mb-[0px]">
            <NavbarUser />
            <UserMenu
              userTabs={userTabs}
              valueTab={valueTab}
              handleValueTab={handleValueTab}
            />
            <MainUsers valueTabKey={valueTabKey} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContainerUser

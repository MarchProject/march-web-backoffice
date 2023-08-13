import NavbarUser from '@/components/user/NavbarUser'
import React from 'react'
import UserMenu from './view/MenuTab/UserMenu'
import { useResize } from '@/core/utils/hook/resizeHook'
import MainUsers from './view/main/Container'
import { useControllerUser } from './controller'

const ContainerUser = () => {
  const {
    tabsHandle: { userTabs, valueTab, handleValueTab, valueTabKey },
  } = useControllerUser()
  const hSize = useResize()

  return (
    <div className="w-full mainBg h-screen">
      <div id="navbar-user" className="p-[15px]">
        <div
          className="bg-white m-0 rounded-lg p-[15px]"
          style={{ height: `${hSize}px` }}>
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

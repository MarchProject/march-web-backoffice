import { setLanguage } from '@/config/client'
import React, { memo } from 'react'
import { FcOk, FcWorkflow } from 'react-icons/fc'
import { MdLanguage } from 'react-icons/md'
import { Menu } from 'antd'
import dynamic from 'next/dynamic'
import NewAppBarMobile from './views/NewAppBarMobile'
import { useLayoutController } from './controller/controller'
import SignOut from '@/components/logout/logout'
import { Image } from 'antd'
// import UserUI from './views/UserUI'

type UserUIPropsType = {
  hide: boolean
  urlPic: string
  username: string
}

const UserUI = ({ hide, urlPic, username }: UserUIPropsType) => {
  return (
    <div
      className={`mt-[20px] flex bg-white justify-between mx-auto ${
        hide ? 'max-w-[40px]' : 'px-[40px]'
      }`}>
      <Image
        className={
          'max-w-[30px] max-h-[30px] my-auto block !border-2! border-violet-500 border-solid rounded-full ' +
          (hide ? ' mx-auto' : '')
        }
        preview={false}
        width={30}
        src={urlPic}
        alt="user-icon"
      />
      {!hide ? (
        <h3
          className={
            'text-center text-primary text-xs capitalize font-normal ' +
            (!hide
              ? 'block opacity-100'
              : 'overflow-hidden opacity-0 w-0 h-0 absolute')
          }>
          {username}
        </h3>
      ) : null}
      {!hide ? (
        <div
          className={
            'my-auto ' +
            (!hide
              ? 'block opacity-100'
              : 'overflow-hidden opacity-0 w-0 h-0 absolute')
          }>
          <SignOut />
        </div>
      ) : null}
    </div>
  )
}

const LayOut = ({ children }) => {
  const {
    globalState: {
      hide,
      setHide,
      tab,
      shopName,
      tabMenu,
      lg,
      urlPic,
      username,
    },
    styleSide: { leftSide, rightSide },
    Menu: { onClick, handlePath },
    i18n,
  } = useLayoutController()

  return (
    <>
      <div style={{ height: '100vh' }} className="lg:flex hidden">
        <div style={leftSide}>
          <div
            className={'flex flex-col justify-between bg-white ' + 'h-full'}
            onMouseEnter={() => setHide(false)}
            onMouseLeave={() => setHide(true)}
            style={{
              borderRight: '1px solid #CCCCCC',
              overflowX: 'hidden',
              transition: 'width 3.9s',
            }}>
            <div>
              <div className="flex justify-between py-[20px]">
                <div className={'flex ' + (!hide ? 'px-[20px]' : 'mx-auto ')}>
                  <FcWorkflow
                    className="my-auto"
                    style={{ fontSize: '30px' }}
                  />
                  <h3
                    className={
                      'text-left text-primary capitalize font-normal ml-[5px] my-auto ' +
                      (!hide ? 'block' : 'hidden')
                    }
                    style={{
                      transition: 'opacity 0.7s',
                    }}>
                    {shopName}
                  </h3>
                  <FcOk
                    className={
                      'my-auto ml-[5px] ' + (!hide ? 'block' : 'hidden')
                    }
                  />
                  <div
                    className={
                      'flex cursor-pointer ' + (!hide ? 'block' : 'hidden')
                    }
                    onClick={() => {
                      setLanguage(lg === 'th' ? 'en' : 'th')
                      i18n.changeLanguage(lg === 'th' ? 'en' : 'th')
                    }}>
                    <MdLanguage
                      color="rgb(135 135 135)"
                      className={
                        'my-auto ml-[15px] ' + (!hide ? 'block' : 'hidden')
                      }
                    />
                    <p className="text-xs font-semibold text-secondary ml-[2px]">
                      {lg.toUpperCase()}
                    </p>
                  </div>
                </div>
              </div>
              <Menu
                defaultSelectedKeys={['1']}
                selectedKeys={[tab]}
                mode={'inline'}
                onClick={onClick}
                theme={'light'}
                items={tabMenu}
                inlineCollapsed={hide}
              />
            </div>
            <div className="pb-[10px] w-[100%] max-w-[260px] cursor-pointer">
              <UserUI hide={hide} urlPic={urlPic} username={username} />
            </div>
          </div>
        </div>
        <div style={rightSide} onMouseEnter={() => setHide(true)}>
          <div className={'mainBg overflow-y-auto'}>{children}</div>
        </div>
      </div>
      <div style={{ height: '100vh' }} className="block lg:hidden">
        <NewAppBarMobile
          tabMenu={tabMenu}
          handlePath={handlePath}
          profiles={{ pic: urlPic, userName: username }}
        />
        {children}
      </div>
    </>
  )
}
export default dynamic(() => Promise.resolve(memo(LayOut)), { ssr: false })

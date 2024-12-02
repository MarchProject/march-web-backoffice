import { Image } from 'antd'
import SignOut from '@/components/logout/logout'

type UserUIPropsType = {
  hide: boolean
  urlPic: string
  username: string
}

const UserUI = ({ hide, urlPic, username }: UserUIPropsType) => {
  return (
    <div
      className={
        'mt-[20px] flex bg-white justify-between mx-auto ' +
        (hide ? 'max-w-[40px]' : 'px-[40px]')
      }>
      <Image
        className={
          'max-w-[30px] max-h-[30px] my-auto block !border-2! border-violet-500 border-solid rounded-full ' +
          (hide ? ' mx-auto' : '')
        }
        preview={false}
        src={urlPic}
        alt="user-icon"
      />
      <h3
        className={
          'text-center text-primary text-xs capitalize font-normal' +
          (!hide
            ? 'block opacity-100'
            : 'overflow-hidden opacity-0 w-0 h-0 absolute')
        }
        >
        {username}
      </h3>

      <div
        className={
          'my-auto ' +
          (!hide
            ? 'block opacity-100'
            : 'overflow-hidden opacity-0 w-0 h-0 absolute')
        }
        >
        <SignOut />
      </div>
    </div>
  )
}

export default UserUI

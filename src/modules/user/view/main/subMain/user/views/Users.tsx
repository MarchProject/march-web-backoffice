/* eslint-disable @next/next/no-img-element */
import { User } from '@/core/model/user'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { tkeys } from '@/translations/i18n'
import ButtonForm from '@/components/common/Button/button'
import * as clientConfig from '@/config/client'
import { SlPeople } from 'react-icons/sl'

interface IUsersTab {
  users: User[]
  handleModalInvite: () => void
}

const styleIcon: React.CSSProperties = {
  color: '#a78bfa',
  backgroundColor: '#fff',
  padding: '0px',
  borderRadius: '50%',
  marginTop: '5px',
  marginLeft: '5px',
  fontSize: '40px',
}

const mapUser = (users: User[]) => {
  const userId = clientConfig.getUserId()

  const usersAnother = users
    ?.sort((a, b) => Number(b.isSuperAdmin) - Number(a.isSuperAdmin))
    .filter((e) => e.isRegistered)
    .map((user, index) => {
      const isYou = user.id === userId ? ' (You)' : ''
      return (
        <div key={user.username + index}>
          <div className="w-full">
            <div className="flex flex-row gap-5 p-5">
              <div className="pic">
                {user.picture ? (
                  <img
                    className={
                      'max-w-[50px] max-h-[50px] my-auto block !border-2 border-violet-500 border-solid rounded-full '
                    }
                    src={user.picture}
                    alt="user-icon"
                  />
                ) : (
                  <div
                    className={
                      'w-full max-w-[50px] max-h-[50px] my-auto block !border-2 border-violet-500 border-solid rounded-full '
                    }>
                    <SlPeople style={styleIcon} />
                  </div>
                )}
              </div>
              <div className="profiles flex flex-col gap-1">
                <p className="text-base text-primary m-0 font-bold">
                  {user.username + isYou}
                </p>

                <p className="text-base text-primary font-medium m-0">
                  {user.email}
                </p>
              </div>
            </div>
          </div>
        </div>
      )
    })

  return (
    <div className="flex flex-col  bg-slate-50 rounded-xl overflow-auto max-h-[400px]">
      {usersAnother}
    </div>
  )
}

const Users = ({ users, handleModalInvite }: IUsersTab) => {
  const { t: trans }: any = useTranslation()
  const keys = tkeys.User
  return (
    <div className="grid grid-cols-5 h-[400px]">
      <div className="w-full col-span-2">
        <div className="p-5">
          <p className="text-base text-primary font-medium">
            {trans(keys.user.Users)}
          </p>
          <p className="text-secondary font-medium text-sm">
            {trans(keys.user.Text)}
          </p>
          <div className="mt-[30px]">
            <ButtonForm
              classNames="!w-[120px] !h-[40px] !w-[100%] !normal-case"
              label={trans(tkeys.common.button.invite)}
              color={'primary'}
              variant="contained"
              onClick={handleModalInvite}
            />
          </div>
        </div>
      </div>
      <div className="w-full col-span-3">
        <div className="mt-5">{mapUser(users)}</div>
      </div>
    </div>
  )
}

export default Users

import ButtonForm from '@/components/common/Button/button'
import { DialogM } from '@/components/common/Dialog/DialogM'
import { InputForm } from '@/components/common/Input'
import { tkeys } from '@/translations/i18n'
import { max } from '@/utils/common/normalizeInput'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Control, FieldValues } from 'react-hook-form'
import { Group } from '@/core/model/user'
import { IRadioOption, RadioGroupForm } from '@/components/common/Radio/Radio'

interface IInviteTeamProps {
  open: boolean
  handleClose: () => void
  onCancel: () => void
  onInvite: () => void
  control: Control<FieldValues, any>
  dataRoles: IRadioOption[]
}

const InviteTeam = ({
  open,
  handleClose,
  onCancel,
  onInvite,
  control,
  dataRoles,
}: IInviteTeamProps) => {
  const { t: trans }: any = useTranslation()
  return (
    <>
      <DialogM
        dialogTitle={trans(tkeys.User.user.Modals.invite.header)}
        open={open}
        maxWidth="sm"
        handleClose={handleClose}
        dialogContentTextRender={() => {
          return <></>
        }}
        contentRender={() => {
          return (
            <div className="p-5">
              <div className="grid grid-cols-2 gap-3">
                <InputForm
                  control={control}
                  classNames=""
                  id="firstname"
                  name="firstname"
                  // rows={6}
                  // multiline
                  inputLabel={{
                    label: trans(tkeys.User.user.Modals.invite.firstname),
                    required: true,
                    classNames: 'text-base !text-secondary !font-semibold',
                    classInput: '!rounded-md',
                  }}
                  type={'text'}
                  variant={'outlined'}
                  normalizes={[max(40)]}
                />
                <InputForm
                  control={control}
                  classNames=""
                  id="lastname"
                  name="lastname"
                  // rows={6}
                  // multiline
                  inputLabel={{
                    label: trans(tkeys.User.user.Modals.invite.lastname),
                    required: true,
                    classNames: 'text-base !text-secondary !font-semibold',
                    classInput: '!rounded-md',
                  }}
                  type={'text'}
                  variant={'outlined'}
                  normalizes={[max(40)]}
                />
              </div>
              <div className="mt-5">
                <InputForm
                  control={control}
                  classNames=""
                  id="email"
                  name="email"
                  // rows={6}
                  // multiline
                  inputLabel={{
                    label: trans(tkeys.User.user.Modals.invite.email),
                    required: true,
                    classNames: 'text-base !text-secondary !font-semibold',
                    classInput: '!rounded-md',
                  }}
                  type={'text'}
                  variant={'outlined'}
                  normalizes={[max(40)]}
                />
              </div>
              <div className="mt-5">
                <RadioGroupForm
                  id="role"
                  name="role"
                  label={trans(tkeys.User.user.Modals.invite.role)}
                  control={control}
                  options={dataRoles}
                />
              </div>
              <div className="mt-5">
                <InputForm
                  control={control}
                  id="description"
                  name="description"
                  rows={3}
                  multiline
                  inputLabel={{
                    label: trans(tkeys.User.user.Modals.invite.description),
                    required: false,
                    classNames: 'text-base !text-secondary !font-semibold',
                    classInput: '!rounded-md',
                  }}
                  type={'text'}
                  variant={'outlined'}
                  normalizes={[max(100)]}
                />
              </div>
            </div>
          )
        }}
        actionRender={() => {
          return (
            <div className="px-3 flex gap-3">
              <ButtonForm
                classNames="!w-[120px] !h-[40px] !w-[100%] !normal-case"
                label={trans(tkeys.common.button.back)}
                color={'primary'}
                variant="outlined"
                disabled={false}
                onClick={onCancel}
              />
              <ButtonForm
                classNames="!w-[120px] !h-[40px] !w-[100%] !normal-case"
                label={trans(tkeys.User.user.Modals.invite.button.invite)}
                color={'primary'}
                variant="contained"
                disabled={false}
                onClick={onInvite}
              />
            </div>
          )
        }}
      />
    </>
  )
}

export default InviteTeam

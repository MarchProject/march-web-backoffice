import { Group } from '@/core/model/user'
import { UseFormHandleSubmit, UseFormReset } from 'react-hook-form'

export interface IInviteDataForm {
  firstname: string
  lastname: string
  email: string
  role: string
  description: string
}

export interface IUseUserTabControllerProps {
  roles: Group[]
  triggerPermissionHandler: () => void
}
export interface IUseInviteModalHandlerProps {
  roles: Group[]
  handleSubmit: UseFormHandleSubmit<IInviteDataForm, any>
  formValue: IInviteDataForm
  createSubUserHandle: (data: IInviteDataForm) => void
  reset: UseFormReset<IInviteDataForm>
}

import { useCallback, useState } from 'react'
import {
  IInviteDataForm,
  IUseInviteModalHandlerProps,
  IUseUserTabControllerProps,
} from './interface'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { schemaInvite } from './schema'
import { useCreateSubUserHandler } from '../fetcher/useInviteSubUser'
import { useRevokeSubUserHandler } from '../fetcher/useRevokeSubUser'

export const useUserTabController = ({
  roles,
  triggerPermissionHandler,
}: IUseUserTabControllerProps) => {
  const formHandler: any = useFormHandler()

  const formValue = formHandler.watch()

  const { createSubUserHandle } = useCreateSubUserHandler({
    triggerPermissionHandler,
  })

  const { revokeSubUserHandle } = useRevokeSubUserHandler({
    triggerPermissionHandler,
  })
  const inviteModalHandler = useInviteModalHandler({
    roles,
    handleSubmit: formHandler.handleSubmit,
    formValue,
    createSubUserHandle,
    reset: formHandler.reset,
  })

  return {
    inviteModalHandler,
    formHandler,
    revokeSubUserHandle,
  }
}

const useFormHandler = () => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    getValues,
    setError,
    clearErrors,
    setValue,
    formState: { errors },
    reset,
  } = useForm<IInviteDataForm>({
    defaultValues: {
      firstname: '',
      lastname: '',
      email: '',
      role: '',
      description: '',
    },
    resolver: yupResolver(schemaInvite),
    reValidateMode: 'onSubmit',
    mode: 'all',
  })

  return {
    register,
    handleSubmit,
    control,
    watch,
    getValues,
    setError,
    clearErrors,
    setValue,
    errors,
    reset,
  }
}

const useInviteModalHandler = ({
  roles,
  handleSubmit,
  formValue,
  createSubUserHandle,
  reset,
}: IUseInviteModalHandlerProps) => {
  const [open, setOpen] = useState(false)

  const dataRoles = roles.map((r) => {
    return {
      value: r.id,
      label: r.name,
      description: 'Reviewer',
    }
  })

  const handleClose = useCallback(() => {
    setOpen(false)
  }, [])

  const handleOpen = useCallback(() => {
    setOpen(true)
  }, [])

  const onSubmit = useCallback(() => {
    console.log('submit', formValue)
    createSubUserHandle(formValue)
    reset()
    handleClose()
  }, [createSubUserHandle, formValue, handleClose, reset])

  return {
    open,
    handleClose,
    handleOpen,
    dataRoles,
    onSubmit: handleSubmit(onSubmit),
  }
}

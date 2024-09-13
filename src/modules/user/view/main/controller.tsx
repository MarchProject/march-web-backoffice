import { useCallback, useState } from 'react'
import { IUseUserManangementHandler } from './interface'
import { useGetPermission } from './subMain/fetcher/useGetPermission'

export const userManagementController = () => {
  const [triggerGetPermission, setTriggerGetPermission] = useState(false)

  const triggerPermissionHandler = useCallback(() => {
    console.log('trigger')
    setTriggerGetPermission(!triggerGetPermission)
  }, [triggerGetPermission])

  const { getPermissionData } = useGetPermission({
    triggerGetPermission,
  })

  const { users } = useUserManangementHandler({ getPermissionData })
  const { roles } = useRoleManangementHandler({ getPermissionData })

  console.log({ getPermissionData })

  return {
    generalProps: {},
    usersProps: {
      users,
      triggerPermissionHandler,
    },
    roleProps: {
      roles,
    },
    notiProps: {},
  }
}

const useRoleManangementHandler = ({
  getPermissionData,
}: IUseUserManangementHandler) => {
  const roles = getPermissionData?.shop?.groups

  return {
    roles,
  }
}

const useUserManangementHandler = ({
  getPermissionData,
}: IUseUserManangementHandler) => {
  const users = getPermissionData?.shop?.users

  return {
    users,
  }
}

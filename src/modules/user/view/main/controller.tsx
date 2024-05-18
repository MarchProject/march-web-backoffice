import { IUseUserManangementHandler } from './interface'
import { useGetPermission } from './subMain/fetcher/useGetPermission'

export const userManagementController = () => {
  const triggerGetPermission = true

  const { getPermissionData } = useGetPermission({
    triggerGetPermission,
  })

  const { users } = useUserManangementHandler({ getPermissionData })

  console.log({ getPermissionData })

  return {
    generalProps: {},
    usersProps: {
      users,
    },
    roleProps: {},
    notiProps: {},
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

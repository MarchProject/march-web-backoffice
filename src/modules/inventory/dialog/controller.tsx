import { EnumSeverity, useNotificationContext } from '@/context/notification'
import {
  DeleteTypeDataVariables,
  DeleteTypeData,
  deleteInventoryTypeMutation,
  upsertInventoryTypeMutation,
  UpsertInventoryType,
  UpsertInventoryBrandTypeVariables,
} from '@/core/gql/inventory'
import { EnumErrorType } from '@/core/utils/ErrorType'
import { useMutation } from '@apollo/client'
import { useCallback, useEffect } from 'react'
import { ModeDialog } from './DialogEditor'

const notificationDeleteSuccessProp = {
  severity: EnumSeverity.success,
  title: 'Product Type',
  message: 'Delete Success',
}
const notificationTypeUsedDeleteErrorProp = {
  severity: EnumSeverity.error,
  title: 'Product Type',
  message: 'Delete Failed. This type already use in product',
}
const notificationDeleteErrorProp = {
  severity: EnumSeverity.error,
  title: 'Product Type',
  message: 'Delete Failed.',
}

const notificationUpdateSuccessProp = (type = 'type') => {
  return {
    severity: EnumSeverity.success,
    title: `Product ${type === 'type' ? 'type' : 'brand'}`,
    message: 'Update Success',
  }
}

const notificationUpdateErrorProp = (type = 'type') => {
  return {
    severity: EnumSeverity.error,
    title: `Product ${type === 'type' ? 'type' : 'brand'}`,
    message: 'Update Failed.',
  }
}

export const useDialogController = ({ triggerType, setEditType }) => {
  const { notification } = useNotificationContext()
  const { deleteInventoryType, deleteInventoryTypeLoading, deleteTypeHandle } =
    useDeleteTypeHandle({
      notification,
      triggerType,
      setEditType,
    })
  const {
    upsertInventoryType,
    upsertInventoryTypeData,
    upsertInventoryTypeLoading,
    updateTypeHandle,
  } = useUpdateTypeHandle({ notification, triggerType, setEditType })
  return {
    deleteTypeHandle: {
      deleteInventoryType,
      deleteInventoryTypeLoading,
      deleteTypeHandle,
    },
    upsertTypeHandle: {
      upsertInventoryType,
      updateTypeHandle,
      upsertInventoryTypeData,
      upsertInventoryTypeLoading,
    },
  }
}


const useDeleteTypeHandle = ({ notification, triggerType, setEditType }) => {
  const [
    deleteInventoryType,
    { loading, error, data: deleteInventoryTypeData },
  ] = useMutation<DeleteTypeData, DeleteTypeDataVariables>(
    deleteInventoryTypeMutation,
  )

  const deleteTypeHandle = useCallback(
    (data) => {
      deleteInventoryType({
        variables: {
          id: data,
        },
      })
    },
    [deleteInventoryType],
  )

  useEffect(() => {
    if (error) {
      if (error?.message === EnumErrorType.BADHAVETYPE) {
        notification(notificationTypeUsedDeleteErrorProp)
      } else {
        notification(notificationDeleteErrorProp)
      }
    }
  }, [error, notification])

  useEffect(() => {
    if (deleteInventoryTypeData?.deleteInventoryType?.id) {
      notification(notificationDeleteSuccessProp)
      setEditType(ModeDialog.VIEW)
      triggerType()
    }
  }, [deleteInventoryTypeData, notification])

  return {
    deleteInventoryType,
    deleteInventoryTypeLoading: loading,
    deleteInventoryTypeData,
    deleteTypeHandle,
  }
}

const useUpdateTypeHandle = ({ notification, triggerType, setEditType }) => {
  const [
    upsertInventoryType,
    { loading, error, data: upsertInventoryTypeData },
  ] = useMutation<UpsertInventoryType, UpsertInventoryBrandTypeVariables>(
    upsertInventoryTypeMutation,
  )

  const updateTypeHandle = useCallback(
    (data) => {
      upsertInventoryType({
        variables: {
          input: {
            id: data?.id,
            name: data.name,
            description: data.description,
          },
        },
      })
    },
    [upsertInventoryType],
  )

  useEffect(() => {
    if (error) {
      notification(notificationUpdateErrorProp())
      setEditType(ModeDialog.VIEW)
    }
  }, [error, notification])

  useEffect(() => {
    if (upsertInventoryTypeData?.upsertInventoryType?.id) {
      notification(notificationUpdateSuccessProp())
      setEditType(ModeDialog.VIEW)
      triggerType()
    }
  }, [upsertInventoryTypeData, notification])

  return {
    upsertInventoryType,
    updateTypeHandle,
    upsertInventoryTypeLoading: loading,
    upsertInventoryTypeData,
  }
}

import { useNotificationContext } from '@/context/notification'
import {
  DeleteTypeDataVariables,
  DeleteTypeData,
  deleteInventoryTypeMutation,
  upsertInventoryTypeMutation,
  UpsertInventoryType,
  UpsertInventoryBrandTypeVariables,
  upsertBrandTypeMutation,
  UpsertBrandType,
  deleteBrandTypeMutation,
  DeleteBrandData,
} from '@/core/gql/inventory'
import { EnumErrorType } from '@/core/utils/ErrorType'
import { useMutation } from '@apollo/client'
import { useCallback, useEffect, useState } from 'react'
import {
  notificationTypeUsedDeleteErrorProp,
  notificationDeleteErrorProp,
  notificationDeleteSuccessProp,
  notificationUpdateErrorProp,
  notificationUpdateSuccessProp,
} from './notification'

export enum TypeDialog {
  TYPE = 'type',
  BRAND = 'brand',
}

export enum ModeDialog {
  EDIT = 'edit',
  CREATE = 'create',
  VIEW = 'view',
}

export const useDialogController = ({ setTriggerType, setTriggerBrand }) => {
  const triggerType = useCallback(() => {
    setTriggerType((e: boolean) => !e)
  }, [setTriggerType])

  const triggerBrand = useCallback(() => {
    setTriggerBrand((e: boolean) => !e)
  }, [setTriggerBrand])

  const { notification } = useNotificationContext()

  const {
    setEditType,
    editType,
    openDialogMain,
    typeDialogMain,
    idType,
    setIdType,
    handleCloseTypeBrandDialog,
    handleOpenType,
    handleOpenBrand,
    handleTypeDialogCreate,
  } = useHandleDialogMain()

  const { deleteInventoryType, deleteInventoryTypeLoading, deleteTypeHandle } =
    useDeleteTypeHandle({
      notification,
      triggerType,
      setEditType,
    })
  const { deleteBrandType, deleteInventoryBrandLoading, deleteBrandHandle } =
    useDeleteBrandHandle({
      notification,
      triggerBrand,
      setEditType,
    })
  const {
    upsertInventoryType,
    upsertInventoryTypeData,
    upsertInventoryTypeLoading,
    updateTypeHandle,
  } = useUpdateTypeHandle({ notification, triggerType, setEditType })

  const {
    upsertBrandType,
    updateBrandHandle,
    upsertInventoryBrandLoading,
    upsertInventoryBrandData,
  } = useUpdateBransHandle({ notification, triggerBrand, setEditType })

  const { openDialogCsv, handleOpenCsv, handleCloseCsv } = useHandleDialogCsv()

  return {
    deleteTypeHandle: {
      deleteInventoryType,
      deleteInventoryTypeLoading,
      deleteTypeHandle,
    },
    deletBrandHandle: {
      deleteBrandType,
      deleteInventoryBrandLoading,
      deleteBrandHandle,
    },
    upsertTypeHandle: {
      upsertInventoryType,
      updateTypeHandle,
      upsertInventoryTypeData,
      upsertInventoryTypeLoading,
    },
    upsertBrandHandle: {
      upsertBrandType,
      updateBrandHandle,
      upsertInventoryBrandLoading,
      upsertInventoryBrandData,
    },
    dialogCsv: {
      openDialogCsv,
      handleOpenCsv,
      handleCloseCsv,
    },
    dialogMain: {
      setEditType,
      editType,
      openDialogMain,
      typeDialogMain,
      idType,
      setIdType,
      handleCloseTypeBrandDialog,
      handleOpenType,
      handleOpenBrand,
      handleTypeDialogCreate,
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
  const [flagCreate, setFlagCreate] = useState(true)
  const [
    upsertInventoryType,
    { loading, error, data: upsertInventoryTypeData },
  ] = useMutation<UpsertInventoryType, UpsertInventoryBrandTypeVariables>(
    upsertInventoryTypeMutation,
  )

  const updateTypeHandle = useCallback(
    (data) => {
      if (data.id) {
        setFlagCreate(false)
      } else {
        setFlagCreate(true)
      }
      upsertInventoryType({
        variables: {
          input: {
            id: data?.id,
            name: data.name.trim(),
            description: data.description.trim(),
          },
        },
      })
    },
    [upsertInventoryType],
  )

  useEffect(() => {
    if (error) {
      notification(notificationUpdateErrorProp('type', flagCreate))
      setEditType(ModeDialog.VIEW)
    }
  }, [error, notification])

  useEffect(() => {
    if (upsertInventoryTypeData?.upsertInventoryType?.id) {
      notification(notificationUpdateSuccessProp('type', flagCreate))
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

const useDeleteBrandHandle = ({ notification, triggerBrand, setEditType }) => {
  const [deleteBrandType, { loading, error, data: deleteBrandTypeData }] =
    useMutation<DeleteBrandData, DeleteTypeDataVariables>(
      deleteBrandTypeMutation,
    )

  const deleteBrandHandle = useCallback(
    (data) => {
      deleteBrandType({
        variables: {
          id: data,
        },
      })
    },
    [deleteBrandType],
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
    if (deleteBrandTypeData?.deleteBrandType?.id) {
      notification(notificationDeleteSuccessProp)
      setEditType(ModeDialog.VIEW)
      triggerBrand()
    }
  }, [deleteBrandTypeData, notification])

  return {
    deleteBrandType,
    deleteInventoryBrandLoading: loading,
    deleteBrandTypeData,
    deleteBrandHandle,
  }
}

const useUpdateBransHandle = ({ notification, triggerBrand, setEditType }) => {
  const [flagCreate, setFlagCreate] = useState(true)
  const [upsertBrandType, { loading, error, data: upsertInventoryBrandData }] =
    useMutation<UpsertBrandType, UpsertInventoryBrandTypeVariables>(
      upsertBrandTypeMutation,
    )

  const updateBrandHandle = useCallback(
    (data) => {
      if (data.id) {
        setFlagCreate(false)
      } else {
        setFlagCreate(true)
      }
      upsertBrandType({
        variables: {
          input: {
            id: data?.id,
            name: data.name.trim(),
            description: data.description.trim(),
          },
        },
      })
    },
    [upsertBrandType],
  )

  useEffect(() => {
    if (error) {
      notification(notificationUpdateErrorProp('brand', flagCreate))
      setEditType(ModeDialog.VIEW)
    }
  }, [error, notification])

  useEffect(() => {
    if (upsertInventoryBrandData?.upsertBrandType?.id) {
      notification(notificationUpdateSuccessProp('brand', flagCreate))
      setEditType(ModeDialog.VIEW)
      triggerBrand()
    }
  }, [upsertInventoryBrandData, notification])

  return {
    upsertBrandType,
    updateBrandHandle,
    upsertInventoryBrandLoading: loading,
    upsertInventoryBrandData,
  }
}

const useHandleDialogCsv = () => {
  const [openDialogCsv, setOpenDialogCsv] = useState(false)

  const handleOpenCsv = useCallback(() => {
    setOpenDialogCsv(true)
  }, [])

  const handleCloseCsv = useCallback(() => {
    setOpenDialogCsv(false)
  }, [])

  return {
    openDialogCsv,
    handleOpenCsv,
    handleCloseCsv,
  }
}

const useHandleDialogMain = () => {
  const [open, setOpen] = useState(false)
  const [typeD, setTypeD] = useState<TypeDialog>(TypeDialog.TYPE)
  const [editType, setEditType] = useState<ModeDialog>(ModeDialog.VIEW)
  const [idType, setIdType] = useState('')

  const handleCloseTypeBrandDialog = () => {
    setOpen(false)
    setEditType(ModeDialog.VIEW)
  }

  const handleOpenType = () => {
    setTypeD(TypeDialog.TYPE)
    setOpen(true)
  }
  const handleOpenBrand = () => {
    setTypeD(TypeDialog.BRAND)
    setOpen(true)
  }

  const handleTypeDialogCreate = () => {
    setEditType(ModeDialog.CREATE)
  }

  return {
    editType,
    openDialogMain: open,
    typeDialogMain: typeD,
    idType,
    setIdType,
    setEditType,
    handleCloseTypeBrandDialog,
    handleOpenType,
    handleOpenBrand,
    handleTypeDialogCreate,
  }
}

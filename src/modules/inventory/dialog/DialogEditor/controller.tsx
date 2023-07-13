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
} from '@/core/gql/inventory/inventory'
import { EnumErrorType } from '@/core/utils/ErrorType'
import { useCallback, useEffect, useState } from 'react'
import {
  notificationTypeUsedDeleteErrorProp,
  notificationDeleteErrorProp,
  notificationDeleteSuccessProp,
  notificationUpdateErrorProp,
  notificationUpdateSuccessProp,
  notificationTrashFetchErrorProp,
} from './notification'
import { useMutationData } from '@/core/adapter/hook/useMutationData'
import { MutateKey, QueryKey } from '@/core/adapter/interface'
import { useLazyQueryData } from '@/core/adapter/hook/useLazyData'
import {
  GetInventoryAllDeletedData,
  getInventoryAllDeletedQuery,
} from '@/core/gql/inventory/inventoryTrash'
import { InventoryTrash } from '@/core/model/inventory'

export enum TypeDialog {
  TYPE = 'type',
  BRAND = 'brand',
}

export enum ModeDialog {
  EDIT = 'edit',
  CREATE = 'create',
  VIEW = 'view',
}

export const useDialogController = ({
  setTriggerType,
  setTriggerBrand,
  setTriggerInventory,
}) => {
  const triggerInventory = useCallback(() => {
    setTriggerInventory((e: boolean) => !e)
  }, [setTriggerInventory])
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
  const { trashData, setTriggerTrash } = useQueryTrash({ notification })
  const { deleteInventoryType, deleteInventoryTypeLoading, deleteTypeHandle } =
    useDeleteTypeHandle({
      notification,
      triggerType,
      setEditType,
      setTriggerTrash,
    })
  const { deleteBrandType, deleteInventoryBrandLoading, deleteBrandHandle } =
    useDeleteBrandHandle({
      notification,
      triggerBrand,
      setEditType,
      setTriggerTrash,
    })
  const {
    upsertInventoryType,
    upsertInventoryTypeData,
    upsertInventoryTypeLoading,
    updateTypeHandle,
  } = useUpdateTypeHandle({
    notification,
    triggerType,
    setEditType,
  })

  const {
    upsertBrandType,
    updateBrandHandle,
    upsertInventoryBrandLoading,
    upsertInventoryBrandData,
  } = useUpdateBransHandle({
    notification,
    triggerBrand,
    setEditType,
  })

  const { openDialogCsv, handleOpenCsv, handleCloseCsv } = useHandleDialogCsv()
  const { openDialogTrash, handleCloseTrash, handleOpenTrash } =
    useHandleDialogTrash()
  const {} = useTrashHandle({ triggerInventory, triggerBrand, triggerType })
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
    dialogTrash: { openDialogTrash, handleCloseTrash, handleOpenTrash },
    trashHanddle: {
      trashData,
    },
  }
}

const useDeleteTypeHandle = ({
  notification,
  triggerType,
  setEditType,
  setTriggerTrash,
}) => {
  const {
    trigger: deleteInventoryType,
    loading,
    data: deleteInventoryTypeData,
  } = useMutationData<
    MutateKey.inventory,
    DeleteTypeData,
    DeleteTypeDataVariables
  >(MutateKey.inventory, null, deleteInventoryTypeMutation, {
    onSuccess: () => {
      notification(notificationDeleteSuccessProp('type'))
      setEditType(ModeDialog.VIEW)
      triggerType()
      setTriggerTrash()
    },
    onError: (error) => {
      if (error === EnumErrorType.BADHAVETYPE) {
        notification(notificationTypeUsedDeleteErrorProp('type'))
      } else {
        notification(notificationDeleteErrorProp('type'))
      }
    },
    globalLoading: true,
  })

  const deleteTypeHandle = useCallback(
    (data) => {
      deleteInventoryType({
        id: data,
      })
    },
    [deleteInventoryType],
  )

  return {
    deleteInventoryType,
    deleteInventoryTypeLoading: loading,
    deleteInventoryTypeData,
    deleteTypeHandle,
  }
}

const useUpdateTypeHandle = ({ notification, triggerType, setEditType }) => {
  const [flagCreate, setFlagCreate] = useState(true)

  const {
    trigger: upsertInventoryType,
    loading,
    data: upsertInventoryTypeData,
  } = useMutationData<
    MutateKey.inventory,
    UpsertInventoryType,
    UpsertInventoryBrandTypeVariables
  >(MutateKey.inventory, null, upsertInventoryTypeMutation, {
    onSuccess: () => {
      notification(notificationUpdateSuccessProp('type', flagCreate))
      setEditType(ModeDialog.VIEW)
      triggerType()
    },
    onError: (error) => {
      notification(notificationUpdateErrorProp('type', flagCreate, error))
      setEditType(ModeDialog.VIEW)
    },
    globalLoading: true,
  })

  const updateTypeHandle = useCallback(
    (data) => {
      if (data?.id) {
        setFlagCreate(false)
      } else {
        setFlagCreate(true)
      }
      upsertInventoryType({
        input: {
          id: data?.id,
          name: data?.name?.trim(),
          description: data?.description?.trim(),
        },
      })
    },
    [upsertInventoryType],
  )

  return {
    upsertInventoryType,
    updateTypeHandle,
    upsertInventoryTypeLoading: loading,
    upsertInventoryTypeData,
  }
}

const useDeleteBrandHandle = ({
  notification,
  triggerBrand,
  setEditType,
  setTriggerTrash,
}) => {
  const {
    trigger: deleteBrandType,
    loading,
    data: deleteBrandTypeData,
  } = useMutationData<
    MutateKey.inventory,
    DeleteBrandData,
    DeleteTypeDataVariables
  >(MutateKey.inventory, null, deleteBrandTypeMutation, {
    onSuccess: () => {
      notification(notificationDeleteSuccessProp('brand'))
      setEditType(ModeDialog.VIEW)
      triggerBrand()
      setTriggerTrash()
    },
    onError: (error) => {
      if (error === EnumErrorType.BADHAVETYPE) {
        notification(notificationTypeUsedDeleteErrorProp('brand'))
      } else {
        notification(notificationDeleteErrorProp('brand'))
      }
    },
    globalLoading: true,
  })

  const deleteBrandHandle = useCallback(
    (data) => {
      deleteBrandType({
        id: data,
      })
    },
    [deleteBrandType],
  )

  return {
    deleteBrandType,
    deleteInventoryBrandLoading: loading,
    deleteBrandTypeData,
    deleteBrandHandle,
  }
}

const useUpdateBransHandle = ({ notification, triggerBrand, setEditType }) => {
  const [flagCreate, setFlagCreate] = useState(true)

  const {
    trigger: upsertBrandType,
    loading,
    data: upsertInventoryBrandData,
  } = useMutationData<
    MutateKey.inventory,
    UpsertBrandType,
    UpsertInventoryBrandTypeVariables
  >(MutateKey.inventory, null, upsertBrandTypeMutation, {
    onSuccess: () => {
      notification(notificationUpdateSuccessProp('brand', flagCreate))
      setEditType(ModeDialog.VIEW)
      triggerBrand()
    },
    onError: () => {
      notification(notificationUpdateErrorProp('brand', flagCreate, 'error'))
      setEditType(ModeDialog.VIEW)
    },
    globalLoading: true,
  })

  const updateBrandHandle = useCallback(
    (data) => {
      if (data?.id) {
        setFlagCreate(false)
      } else {
        setFlagCreate(true)
      }
      upsertBrandType({
        input: {
          id: data?.id,
          name: data?.name?.trim(),
          description: data?.description?.trim(),
        },
      })
    },
    [upsertBrandType],
  )

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

const useHandleDialogTrash = () => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  return {
    openDialogTrash: open,
    handleOpenTrash: handleOpen,
    handleCloseTrash: handleClose,
  }
}

const useQueryTrash = ({ notification }) => {
  const [trashData, setTrashData] = useState<InventoryTrash>(null)
  const [trigger, setTrigger] = useState(true)
  const { trigger: getInventoryAllDeleted } = useLazyQueryData<
    QueryKey.inventory,
    GetInventoryAllDeletedData,
    any
  >(
    QueryKey.inventory,
    (tranform, data) => {
      return tranform.inventoryTrash(data)
    },
    getInventoryAllDeletedQuery,
    {
      onSuccess: (data) => {
        setTrashData(data)
      },
      onError: () => {
        notification(notificationTrashFetchErrorProp)
      },
      globalLoading: true,
    },
  )

  const getInventoryTrashHandle = useCallback(() => {
    getInventoryAllDeleted()
  }, [getInventoryAllDeleted])

  useEffect(() => {
    getInventoryTrashHandle()
  }, [getInventoryTrashHandle, trigger])

  return {
    trashData,
    setTriggerTrash: setTrigger,
  }
}

const useTrashHandle = ({ triggerInventory, triggerBrand, triggerType }) => {
  console.log({ triggerInventory, triggerBrand, triggerType })
  //todo trash  recoveryHardDeleted
  return {}
}

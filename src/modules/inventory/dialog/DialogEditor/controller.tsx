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
import { useCallback, useState } from 'react'
import {
  notificationTypeUsedDeleteErrorProp,
  notificationDeleteErrorProp,
  notificationDeleteSuccessProp,
  notificationUpdateErrorProp,
  notificationUpdateSuccessProp,
  notificationTrashMutateErrorProp,
  notificationTrashMutateSuccessProp,
} from './notification'
import { useMutationData } from '@/core/adapter/hook/useMutationData'
import { MutateKey } from '@/core/adapter/interface'
import {
  EnumDeletedMode,
  EnumDeletedType,
  RecoveryHardDeletedData,
  RecoveryHardDeletedVariable,
  recoveryHardDeletedMutation,
} from '@/core/gql/inventory/inventoryTrash'

export const useDialogController = ({
  setTriggerType,
  setTriggerBrand,
  setTriggerInventory,
  setTriggerTrash,
}) => {
  const triggerTrash = useCallback(() => {
    setTriggerTrash((e: boolean) => !e)
  }, [setTriggerTrash])
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

  const { deleteInventoryType, deleteInventoryTypeLoading, deleteTypeHandle } =
    useDeleteTypeHandle({
      notification,
      triggerType,
      triggerTrash,
    })
  const { deleteBrandType, deleteInventoryBrandLoading, deleteBrandHandle } =
    useDeleteBrandHandle({
      notification,
      triggerBrand,
      triggerTrash,
    })
  const {
    upsertInventoryType,
    upsertInventoryTypeData,
    upsertInventoryTypeLoading,
    updateTypeHandle,
  } = useUpdateTypeHandle({
    notification,
    triggerType,
  })

  const {
    upsertBrandType,
    updateBrandHandle,
    upsertInventoryBrandLoading,
    upsertInventoryBrandData,
  } = useUpdateBransHandle({
    notification,
    triggerBrand,
  })

  const { openDialogCsv, handleOpenCsv, handleCloseCsv } = useHandleDialogCsv()
  const { openDialogTrash, handleCloseTrash, handleOpenTrash } =
    useHandleDialogTrash()
  const { openDialogType, handleCloseType, handleOpenType } =
    useHandleDialogType()
  const { openDialogBrand, handleCloseBrand, handleOpenBrand } =
    useHandleDialogBrand()
  const { recoveryHardDeletedHandle } = useTrashHandle({
    triggerInventory,
    triggerBrand,
    triggerType,
    triggerTrash,
    notification,
  })
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
    dialogTrash: {
      openDialogTrash,
      handleCloseTrash,
      handleOpenTrash,
      recoveryHardDeletedHandle,
    },
    dialogType: {
      openDialogType,
      handleCloseType,
      handleOpenType,
    },
    dialogBrand: {
      openDialogBrand,
      handleCloseBrand,
      handleOpenBrand,
    },
  }
}

const useDeleteTypeHandle = ({ notification, triggerType, triggerTrash }) => {
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
      triggerType()
      triggerTrash()
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

const useUpdateTypeHandle = ({ notification, triggerType }) => {
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
      triggerType()
    },
    onError: (error) => {
      notification(notificationUpdateErrorProp('type', flagCreate, error))
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

const useDeleteBrandHandle = ({ notification, triggerBrand, triggerTrash }) => {
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
      triggerBrand()
      triggerTrash()
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

const useUpdateBransHandle = ({ notification, triggerBrand }) => {
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
      triggerBrand()
    },
    onError: () => {
      notification(notificationUpdateErrorProp('brand', flagCreate, 'error'))
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

// const useHandleDialogMain = () => {
//   const [open, setOpen] = useState(false)
//   const [typeD, setTypeD] = useState<TypeDialog>(TypeDialog.TYPE)
//   const [editType, setEditType] = useState<ModeDialog>(ModeDialog.VIEW)
//   const [idType, setIdType] = useState('')

//   const handleCloseTypeBrandDialog = () => {
//     setOpen(false)
//     setEditType(ModeDialog.VIEW)
//   }

//   const handleOpenType = () => {
//     setTypeD(TypeDialog.TYPE)
//     setOpen(true)
//   }
//   const handleOpenBrand = () => {
//     setTypeD(TypeDialog.BRAND)
//     setOpen(true)
//   }

//   const handleTypeDialogCreate = () => {
//     setEditType(ModeDialog.CREATE)
//   }

//   return {
//     editType,
//     openDialogMain: open,
//     typeDialogMain: typeD,
//     idType,
//     setIdType,
//     setEditType,
//     handleCloseTypeBrandDialog,
//     handleOpenType,
//     handleOpenBrand,
//     handleTypeDialogCreate,
//   }
// }

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

const useHandleDialogType = () => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  return {
    openDialogType: open,
    handleOpenType: handleOpen,
    handleCloseType: handleClose,
  }
}

const useHandleDialogBrand = () => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  return {
    openDialogBrand: open,
    handleOpenBrand: handleOpen,
    handleCloseBrand: handleClose,
  }
}

const useTrashHandle = ({
  triggerInventory,
  triggerBrand,
  triggerType,
  triggerTrash,
  notification,
}) => {
  const { trigger: recoveryHardDeleted } = useMutationData<
    MutateKey.inventory,
    RecoveryHardDeletedData,
    RecoveryHardDeletedVariable
  >(MutateKey.inventory, null, recoveryHardDeletedMutation, {
    onSuccess: (data) => {
      notification(
        notificationTrashMutateSuccessProp(data?.recoveryHardDeleted?.mode),
      )
      triggerType()
      triggerBrand()
      triggerInventory()
      triggerTrash()
    },
    onError: () => {
      notification(notificationTrashMutateErrorProp)
    },
    globalLoading: true,
  })

  const recoveryHardDeletedHandle = useCallback(
    (id: string, type: EnumDeletedType, mode: EnumDeletedMode) => {
      recoveryHardDeleted({
        input: {
          id: id,
          type: type,
          mode: mode,
        },
      })
    },
    [recoveryHardDeleted],
  )

  return {
    recoveryHardDeletedHandle,
  }
}

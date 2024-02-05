import { useNotificationContext } from '@/context/notification'
import { useCallback, useState } from 'react'
import { useUpsertTypeHandle } from '../../fetcher/useUpsertType'
import { useUpsertBrandHandler } from '../../fetcher/useUpsertBrand'
import { useDeleteBrandInventoryHandler } from '../../fetcher/useDeleteBrand'
import { useDeleteTypeInventoryHandler } from '../../fetcher/useDeleteType'
import { useRecoveryTrashHandler } from '../../fetcher/useRecoveryTrash'

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
    useDeleteTypeInventoryHandler({
      notification,
      triggerType,
      triggerTrash,
    })

  const { deleteBrandType, deleteInventoryBrandLoading, deleteBrandHandle } =
    useDeleteBrandInventoryHandler({
      triggerBrand,
      triggerTrash,
    })
  const {
    upsertInventoryType,
    upsertInventoryTypeData,
    upsertInventoryTypeLoading,
    updateTypeHandle,
  } = useUpsertTypeHandle({
    triggerType,
  })

  const {
    upsertBrandType,
    updateBrandHandle,
    upsertInventoryBrandLoading,
    upsertInventoryBrandData,
  } = useUpsertBrandHandler({
    triggerBrand,
  })

  const { openDialogCsv, handleOpenCsv, handleCloseCsv } = useHandleDialogCsv()
  const { openDialogTrash, handleCloseTrash, handleOpenTrash } =
    useHandleDialogTrash()
  const { openDialogType, handleCloseType, handleOpenType } =
    useHandleDialogType()
  const { openDialogBrand, handleCloseBrand, handleOpenBrand } =
    useHandleDialogBrand()
  const { recoveryHardDeletedHandle } = useRecoveryTrashHandler({
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

export const useHandleDialogType = () => {
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

export const useHandleDialogBrand = () => {
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

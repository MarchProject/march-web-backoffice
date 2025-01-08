import { useNotificationContext } from '@/context/notification'
import { useCallback, useState } from 'react'
import { useUpsertTypeHandle } from '../../fetcher/useUpsertType'
import { useUpsertBrandHandler } from '../../fetcher/useUpsertBrand'
import { useDeleteBrandInventoryHandler } from '../../fetcher/useDeleteBrand'
import { useDeleteTypeInventoryHandler } from '../../fetcher/useDeleteType'
import { useRecoveryTrashHandler } from '../../fetcher/useRecoveryTrash'
import { useUpsertBranchHandler } from '../../fetcher/useUpsertBranch'
import { useDeleteBranchInventoryHandler } from '../../fetcher/useDeleteBranch'

export const useDialogController = ({
  setTriggerType,
  setTriggerBrand,
  setTriggerBranch,
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

  const triggerBranch = useCallback(() => {
    setTriggerBranch((e: boolean) => !e)
  }, [setTriggerBranch])

  const { notification } = useNotificationContext()

  const { deleteInventoryType, deleteInventoryTypeLoading, deleteTypeHandle } =
    useDeleteTypeInventoryHandler({
      notification,
      triggerType,
      triggerTrash,
    })

  const {
    deleteInventoryBrand,
    deleteInventoryBrandLoading,
    deleteBrandHandle,
  } = useDeleteBrandInventoryHandler({
    triggerBrand,
    triggerTrash,
  })

  const {
    deleteInventoryBranch,
    deleteInventoryBranchLoading,
    deleteBranchHandle,
  } = useDeleteBranchInventoryHandler({
    triggerBranch,
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
    upsertInventoryBrand,
    updateBrandHandle,
    upsertInventoryBrandLoading,
    upsertInventoryBrandData,
  } = useUpsertBrandHandler({
    triggerBrand,
  })

  const {
    upsertInventoryBranch,
    updateBranchHandle,
    upsertInventoryBranchLoading,
    upsertInventoryBranchData,
  } = useUpsertBranchHandler({
    triggerBranch,
  })

  const { openDialogCsv, handleOpenCsv, handleCloseCsv } = useHandleDialogCsv()
  const { openDialogTrash, handleCloseTrash, handleOpenTrash } =
    useHandleDialogTrash()
  const { openDialogType, handleCloseType, handleOpenType } =
    useHandleDialogType()
  const { openDialogBrand, handleCloseBrand, handleOpenBrand } =
    useHandleDialogBrand()
  const { openDialogBranch, handleCloseBranch, handleOpenBranch } =
    useHandleDialogBranch()
  const { recoveryHardDeletedHandle } = useRecoveryTrashHandler({
    triggerInventory,
    triggerBrand,
    triggerBranch,
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
      deleteInventoryBrand,
      deleteInventoryBrandLoading,
      deleteBrandHandle,
    },
    deletBranchHandle: {
      deleteInventoryBranch,
      deleteInventoryBranchLoading,
      deleteBranchHandle,
    },
    upsertTypeHandle: {
      upsertInventoryType,
      updateTypeHandle,
      upsertInventoryTypeData,
      upsertInventoryTypeLoading,
    },
    upsertBrandHandle: {
      upsertInventoryBrand,
      updateBrandHandle,
      upsertInventoryBrandLoading,
      upsertInventoryBrandData,
    },
    upsertBranchHandle: {
      upsertInventoryBranch,
      updateBranchHandle,
      upsertInventoryBranchLoading,
      upsertInventoryBranchData,
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
    dialogBranch: {
      openDialogBranch,
      handleCloseBranch,
      handleOpenBranch,
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

export const useHandleDialogBranch = () => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  return {
    openDialogBranch: open,
    handleOpenBranch: handleOpen,
    handleCloseBranch: handleClose,
  }
}

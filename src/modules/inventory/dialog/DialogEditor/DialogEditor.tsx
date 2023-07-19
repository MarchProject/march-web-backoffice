import ButtonForm from '@/components/common/Button/button'
import { DialogM } from '@/components/common/Dialog/DialogM'
import React, { useState } from 'react'
import { ModeDialog, TypeDialog, useDialogController } from './controller'
import { AutocompleteInputChangeReason, MenuItem } from '@mui/material'
import TypeDialogElement from './DialogBrandType/TypeDialogElement'
import BrandDialogElement from './DialogBrandType/BrandDialogElement'
import DialogUploadCsv from './DialogUploadCsv/DialogUploadCsv'
import {
  BrandType,
  InventoryNamesClass,
  InventoryTrash,
  InventoryType,
} from '@/core/model/inventory'
import { DialogTrash } from './DialogTrash/DialogTrash'
import { DialogType } from './DialogType/DialogType'

interface IDialogEditor {
  setTriggerType: (e: any) => void
  inventoriesTypeData: InventoryType[]
  setTriggerBrand: (e: any) => void
  setTriggerInventory: (e: any) => void
  setTriggerGetInventoryNames: (e: boolean) => void
  inventoriesBrandData: BrandType[]
  inventoryNamesData: InventoryNamesClass[]
  handleSearchInventoryType: (
    event: React.SyntheticEvent,
    value: string,
    reason: AutocompleteInputChangeReason,
  ) => void
  handleSearchInventoryBrand: (
    event: React.SyntheticEvent,
    value: string,
    reason: AutocompleteInputChangeReason,
  ) => void
  trashData: InventoryTrash
  setTriggerTrash: (e: boolean) => void
}

const DialogEditor = ({
  setTriggerType,
  inventoriesTypeData,
  setTriggerBrand,
  setTriggerInventory,
  inventoriesBrandData,
  inventoryNamesData,
  setTriggerGetInventoryNames,
  handleSearchInventoryType,
  handleSearchInventoryBrand,
  trashData,
  setTriggerTrash,
}: IDialogEditor) => {
  const {
    deleteTypeHandle: { deleteInventoryTypeLoading, deleteTypeHandle },
    upsertTypeHandle: { upsertInventoryTypeLoading, updateTypeHandle },
    upsertBrandHandle: { upsertInventoryBrandLoading, updateBrandHandle },
    deletBrandHandle: { deleteInventoryBrandLoading, deleteBrandHandle },
    dialogCsv: { openDialogCsv, handleOpenCsv, handleCloseCsv },
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
    dialogTrash: {
      openDialogTrash,
      handleCloseTrash,
      handleOpenTrash,
      recoveryHardDeletedHandle,
    },
  } = useDialogController({
    setTriggerType,
    setTriggerBrand,
    setTriggerInventory,
    setTriggerTrash,
  })

  const [open, setOpen] = useState(false)
  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <DialogTrash
        open={openDialogTrash}
        handleClose={handleCloseTrash}
        trashData={trashData}
        recoveryHardDeletedHandle={recoveryHardDeletedHandle}
      />
      <DialogUploadCsv
        open={openDialogCsv}
        handleOpen={handleOpenCsv}
        handleClose={handleCloseCsv}
        inventoriesTypeData={inventoriesTypeData}
        inventoriesBrandData={inventoriesBrandData}
        inventoryNamesData={inventoryNamesData}
        setTriggerGetInventoryNames={setTriggerGetInventoryNames}
      />
      <DialogType
        open={open}
        handleClose={handleClose}
        inventoriesTypeData={inventoriesTypeData}
        deleteTypeHandle={deleteTypeHandle}
        updateTypeHandle={updateTypeHandle}
      />
      <DialogM
        open={openDialogMain}
        dialogTitle={
          typeDialogMain === TypeDialog.TYPE
            ? 'Inventory Type'
            : 'Inventory Brand'
        }
        handleClose={handleCloseTypeBrandDialog}
        maxWidth="sm"
        contentRender={() => {
          return (
            <div className="px-[24px]">
              {typeDialogMain === TypeDialog.TYPE ? (
                <TypeDialogElement
                  inventoriesTypeData={inventoriesTypeData}
                  idType={idType}
                  setIdType={setIdType}
                  setEditType={setEditType}
                  editType={editType}
                  deleteInventoryTypeLoading={deleteInventoryTypeLoading}
                  upsertInventoryTypeLoading={upsertInventoryTypeLoading}
                  deleteTypeHandle={deleteTypeHandle}
                  updateTypeHandle={updateTypeHandle}
                  handleSearchInventoryType={handleSearchInventoryType}
                />
              ) : (
                <BrandDialogElement
                  inventoriesBrandData={inventoriesBrandData}
                  idType={idType}
                  setIdType={setIdType}
                  setEditType={setEditType}
                  editType={editType}
                  deleteInventoryBrandLoading={deleteInventoryBrandLoading}
                  upsertInventoryBrandLoading={upsertInventoryBrandLoading}
                  deleteBrandHandle={deleteBrandHandle}
                  updateBrandHandle={updateBrandHandle}
                  handleSearchInventoryBrand={handleSearchInventoryBrand}
                />
              )}
            </div>
          )
        }}
        actionRender={() => {
          return (
            <>
              {editType === ModeDialog.VIEW && (
                <ButtonForm
                  classNames="!normal-case max-w-[180px] !mr-[16px]"
                  label={'Create'}
                  variant="contained"
                  onClick={handleTypeDialogCreate}
                />
              )}
            </>
          )
        }}
      />
      <MenuItem
        className="!mx-3 hover:!bg-violet-400 hover:!text-white !rounded-xl "
        onClick={handleOpenCsv}>
        Upload CSV
      </MenuItem>
      <MenuItem
        className="!mx-3 hover:!bg-violet-400 hover:!text-white !rounded-xl"
        onClick={handleOpen}>
        Type
      </MenuItem>
      <MenuItem
        className="!mx-3 hover:!bg-violet-400 hover:!text-white !rounded-xl"
        onClick={handleOpenBrand}>
        Brand
      </MenuItem>
      <MenuItem
        className="!mx-3 hover:!bg-violet-400 hover:!text-white !rounded-xl !mb-[3px]"
        onClick={handleOpenTrash}>
        Trash
      </MenuItem>
    </>
  )
}

export default DialogEditor

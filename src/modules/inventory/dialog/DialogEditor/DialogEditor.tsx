import ButtonForm from '@/components/common/Button/button'
import { DialogM } from '@/components/common/Dialog/DialogM'
import React from 'react'
import { ModeDialog, TypeDialog, useDialogController } from './controller'
import { AutocompleteInputChangeReason, MenuItem } from '@mui/material'
import { GetInventoryTypes } from '@/core/gql/inventory'
import TypeDialogElement from './DialogBrandType/TypeDialogElement'
import { warningDelete } from '@/constant'
import BrandDialogElement from './DialogBrandType/BrandDialogElement'
import DialogUploadCsv from './DialogUploadCsv/DialogUploadCsv'
import {
  BrandType,
  InventoryNamesClass,
  InventoryType,
} from '@/core/model/inventory'

interface IDialogEditor {
  setTriggerType: (e: any) => void
  inventoriesTypeData: InventoryType[]
  setTriggerBrand: (e: any) => void
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
}

const DialogEditor = ({
  setTriggerType,
  inventoriesTypeData,
  setTriggerBrand,
  inventoriesBrandData,
  inventoryNamesData,
  setTriggerGetInventoryNames,
  handleSearchInventoryType,
  handleSearchInventoryBrand
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
  } = useDialogController({ setTriggerType, setTriggerBrand })

  return (
    <>
      <DialogUploadCsv
        open={openDialogCsv}
        handleOpen={handleOpenCsv}
        handleClose={handleCloseCsv}
        inventoriesTypeData={inventoriesTypeData}
        inventoriesBrandData={inventoriesBrandData}
        inventoryNamesData={inventoryNamesData}
        setTriggerGetInventoryNames={setTriggerGetInventoryNames}
      />
      <DialogM
        open={openDialogMain}
        dialogTitle={
          typeDialogMain === TypeDialog.TYPE
            ? 'Inventory Type'
            : 'Inventory Brand'
        }
        handleClose={handleCloseTypeBrandDialog}
        contentRender={() => {
          return (
            <div className="px-[30px]">
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
              <p className="text-primary text-xs mb-0 pb-0">{warningDelete}</p>
            </div>
          )
        }}
        actionRender={() => {
          return (
            <>
              {editType === ModeDialog.VIEW && (
                <ButtonForm
                  classNames="!normal-case max-w-[80px]"
                  label={'Create'}
                  variant="text"
                  onClick={handleTypeDialogCreate}
                />
              )}
              <ButtonForm
                classNames="!normal-case max-w-[80px]"
                label={'Close'}
                variant="text"
                onClick={handleCloseTypeBrandDialog}
              />
            </>
          )
        }}
      />
      <MenuItem onClick={handleOpenType}>Type</MenuItem>
      <MenuItem onClick={handleOpenBrand}>Brand</MenuItem>
      <MenuItem onClick={handleOpenCsv}>Upload CSV</MenuItem>
    </>
  )
}

export default DialogEditor

import React from 'react'
import { useDialogController } from './controller'
import { AutocompleteInputChangeReason, MenuItem } from '@mui/material'
import DialogUploadCsv from './DialogUploadCsv/DialogUploadCsv'
import {
  BrandType,
  InventoryNamesClass,
  InventoryTrash,
  InventoryType,
} from '@/core/model/inventory'
import { DialogTrash } from './DialogTrash/DialogTrash'
import { DialogType } from './DialogType/DialogType'
import { DialogBrand } from './DialogBrand/DialogBrand'

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
    deleteTypeHandle: { deleteTypeHandle },
    upsertTypeHandle: { updateTypeHandle },
    upsertBrandHandle: { updateBrandHandle },
    deletBrandHandle: { deleteBrandHandle },
    dialogCsv: { openDialogCsv, handleOpenCsv, handleCloseCsv },
    dialogTrash: {
      openDialogTrash,
      handleCloseTrash,
      handleOpenTrash,
      recoveryHardDeletedHandle,
    },
    dialogType: { openDialogType, handleCloseType, handleOpenType },
    dialogBrand: { openDialogBrand, handleCloseBrand, handleOpenBrand },
  } = useDialogController({
    setTriggerType,
    setTriggerBrand,
    setTriggerInventory,
    setTriggerTrash,
  })

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
        open={openDialogType}
        handleClose={handleCloseType}
        inventoriesTypeData={inventoriesTypeData}
        deleteTypeHandle={deleteTypeHandle}
        updateTypeHandle={updateTypeHandle}
        handleSearchInventoryType={handleSearchInventoryType}
      />
      <DialogBrand
        open={openDialogBrand}
        handleClose={handleCloseBrand}
        inventoriesBrandData={inventoriesBrandData}
        deleteBrandHandle={deleteBrandHandle}
        updateBrandHandle={updateBrandHandle}
        handleSearchInventoryBrand={handleSearchInventoryBrand}
      />
      <MenuItem
        className="!mx-3 hover:!bg-violet-400 hover:!text-white !rounded-xl "
        onClick={handleOpenCsv}>
        Upload CSV
      </MenuItem>
      <MenuItem
        className="!mx-3 hover:!bg-violet-400 hover:!text-white !rounded-xl"
        onClick={handleOpenType}>
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

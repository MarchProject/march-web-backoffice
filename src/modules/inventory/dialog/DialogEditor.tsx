import ButtonForm from '@/components/common/Button/button'
import { DialogM } from '@/components/common/Dialog/DialogM'
import React, { useCallback, useState } from 'react'
import { useDialogController } from './controller'
import { MenuItem } from '@mui/material'
import { GetInventoryTypes } from '@/core/gql/inventory'
import TypeDialogElement from './TypeDialogElement'
import { warningDelete } from '@/constant'
import BrandDialogElement from './BrandDialogElement'

enum TypeDialog {
  TYPE = 'type',
  BRAND = 'brand',
}

export enum ModeDialog {
  EDIT = 'edit',
  CREATE = 'create',
  VIEW = 'view',
}

interface IDialogEditor {
  setTriggerType: (e: any) => void
  inventoriesTypeData: GetInventoryTypes[]
  setTriggerBrand: (e: any) => void
  inventoriesBrandData: GetInventoryTypes[]
}

const DialogEditor = ({
  setTriggerType,
  inventoriesTypeData,
  setTriggerBrand,
  inventoriesBrandData,
}: IDialogEditor) => {
  const [open, setOpen] = useState(false)
  const [typeD, setTypeD] = useState<TypeDialog>(TypeDialog.TYPE)
  const [editType, setEditType] = useState<ModeDialog>(ModeDialog.VIEW)
  const [idType, setIdType] = useState('')

  const triggerType = useCallback(() => {
    setTriggerType((e: boolean) => !e)
  }, [setTriggerType])

  const triggerBrand = useCallback(() => {
    setTriggerBrand((e: boolean) => !e)
  }, [setTriggerBrand])

  const {
    deleteTypeHandle: { deleteInventoryTypeLoading, deleteTypeHandle },
    upsertTypeHandle: { upsertInventoryTypeLoading, updateTypeHandle },
    upsertBrandHandle: { upsertInventoryBrandLoading, updateBrandHandle },
    deletBrandHandle: { deleteInventoryBrandLoading, deleteBrandHandle },
  } = useDialogController({ triggerType, setEditType, triggerBrand })

  return (
    <>
      <DialogM
        open={open}
        dialogTitle={
          typeD === TypeDialog.TYPE ? 'Inventory Type' : 'Inventory Brand'
        }
        handleClose={() => {
          setOpen(false)
        }}
        contentRender={() => {
          return (
            <div className="px-[30px]">
              {typeD === TypeDialog.TYPE ? (
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
                  onClick={() => {
                    setEditType(ModeDialog.CREATE)
                  }}
                />
              )}
              <ButtonForm
                classNames="!normal-case max-w-[80px]"
                label={'Close'}
                variant="text"
                onClick={() => {
                  setOpen(false)
                  setEditType(ModeDialog.VIEW)
                }}
              />
            </>
          )
        }}
      />
      <MenuItem
        onClick={() => {
          setTypeD(TypeDialog.TYPE)
          setOpen(true)
        }}>
        Type
      </MenuItem>
      <MenuItem
        onClick={() => {
          setTypeD(TypeDialog.BRAND)
          setOpen(true)
        }}>
        Brand
      </MenuItem>
    </>
  )
}

export default DialogEditor

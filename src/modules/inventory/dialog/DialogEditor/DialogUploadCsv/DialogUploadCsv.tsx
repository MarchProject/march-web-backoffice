import React from 'react'
import { DialogM } from '../../../../../components/common/Dialog/DialogM'
import ButtonForm from '../../../../../components/common/Button/button'
import { dataTemplateCsv, headersTemplateCsv } from '@/constant/csvData'
import DownLoadCsv from '@/components/common/DownLoad/DownLoadCsv'
import { UploadCsvView } from './view/UploadCsvView'
import { useControllerUplaod } from './controller'
import { BrandType, InventoryNamesClass, InventoryType } from '@/core/model/inventory'
interface IDialogUploadCsv {
  open: boolean
  handleOpen: () => void
  handleClose: () => void
  setTriggerGetInventoryNames: (value: boolean) => void
  inventoriesTypeData: InventoryType[]
  inventoriesBrandData: BrandType[]
  inventoryNamesData: InventoryNamesClass[]
}

const DialogUploadCsv = ({
  open,
  handleClose,
  inventoriesTypeData,
  inventoriesBrandData,
  inventoryNamesData,
  setTriggerGetInventoryNames,
}: IDialogUploadCsv) => {
  const { uploadHandle, isValid, onUploadHandle } = useControllerUplaod({
    inventoriesTypeData,
    inventoriesBrandData,
    setTriggerGetInventoryNames,
  })
  return (
    <>
      <DialogM
        dialogTitle="Import Items"
        open={open}
        maxWidth="md"
        handleClose={handleClose}
        dialogContentTextRender={() => {
          return (
            <>
              <p className="text-secondary m-0 px-[24px] text-base">
                Upload a CSV to import item data to your inventory.
              </p>
            </>
          )
        }}
        contentRender={() => {
          return (
            <>
              <UploadCsvView
                uploadHandle={uploadHandle}
                inventoriesTypeData={inventoriesTypeData}
                inventoriesBrandData={inventoriesBrandData}
                inventoryNamesData={inventoryNamesData}
              />
            </>
          )
        }}
        actionRender={() => {
          return (
            <>
              <ButtonForm
                classNames="!w-[60px] !h-[40px] !w-[100%] !normal-case"
                label={'Upload'}
                color={'primary'}
                disabled={!isValid}
                variant="text"
                onClick={onUploadHandle}
              />
              <DownLoadCsv
                data={dataTemplateCsv}
                headers={headersTemplateCsv}
                contents={() => {
                  return (
                    <ButtonForm
                      classNames="!w-[170px] !h-[40px] !w-[100%] !normal-case"
                      label={'Download Template'}
                      color={'primary'}
                      variant="text"
                      onClick={handleClose}
                    />
                  )
                }}
              />
              <ButtonForm
                classNames="!w-[60px] !h-[40px] !w-[100%] !normal-case"
                label={'Close'}
                color={'primary'}
                variant="text"
                onClick={handleClose}
              />
            </>
          )
        }}
      />
      {/* <div className="flex px-[16px] py-[6px] cursor-pointer">
        <label className="cursor-pointer" onClick={() => setOpen(true)}>
          Upload CSV
        </label>
      </div> */}
    </>
  )
}

export default DialogUploadCsv

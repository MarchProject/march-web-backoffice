import React from 'react'
import { DialogM } from '../../../../../components/common/Dialog/DialogM'
import ButtonForm from '../../../../../components/common/Button/button'
import { dataTemplateCsv, headersTemplateCsv } from '@/constant/csvData'
import DownLoadCsv from '@/components/common/DownLoad/DownLoadCsv'
import { UploadCsvView } from './view/UploadCsvView'
import { useControllerUplaod } from './controller'
import {
  BrandType,
  InventoryNamesClass,
  InventoryType,
} from '@/core/model/inventory'
import { useTranslation } from 'react-i18next'
import { tkeys } from '@/translations/i18n'
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
  const { t: trans }: any = useTranslation()
  const keys = tkeys.Inventory.MainPage.dialog.upload
  const { uploadHandle, isValid, onUploadHandle, isPass } = useControllerUplaod(
    {
      inventoriesTypeData,
      inventoriesBrandData,
      setTriggerGetInventoryNames,
      handleClose,
    },
  )
  return (
    <>
      <DialogM
        dialogTitle={trans(keys.header.lable)}
        open={open}
        maxWidth="md"
        handleClose={handleClose}
        dialogContentTextRender={() => {
          return (
            <>
              <p className="text-secondary m-0 px-[24px] text-base">
                {trans(keys.header.sub)}
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
                isPass={isPass}
              />
            </>
          )
        }}
        actionRender={() => {
          return (
            <>
              <ButtonForm
                classNames="!w-[170px] !h-[40px] !w-[100%] !normal-case !mr-[16px]"
                label={trans(tkeys.button.upload)}
                color={'primary'}
                disabled={!isValid || !isPass}
                variant={!isValid || !isPass ? 'text' : 'contained'}
                onClick={onUploadHandle}
              />
              <DownLoadCsv
                data={dataTemplateCsv}
                headers={headersTemplateCsv}
                contents={() => {
                  return (
                    <ButtonForm
                      classNames="!w-[170px] !h-[40px] !w-[100%] !normal-case !mr-[16px] !no-underline"
                      label={trans(tkeys.button.downloadTemp)}
                      color={'primary'}
                      variant="outlined"
                      onClick={handleClose}
                    />
                  )
                }}
              />
              {/* <ButtonForm
                classNames="!w-[60px] !h-[40px] !w-[100%] !normal-case"
                label={'Close'}
                color={'primary'}
                variant="text"
                onClick={handleClose}
              /> */}
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

import { UploadCsv } from '@/components/common/Upload/UploadCsv'
import { IDataTemplateCsv } from '@/constant/csvData'
import React from 'react'
import { useControllerUploadCsvView } from './controller'
import { BsFiletypeCsv } from 'react-icons/bs'
import { TiDelete } from 'react-icons/ti'
import { IValidatedValues } from './interface'
import { capitalizeFirstLetter } from '@/utils/common/utils'
import {
  BrandType,
  InventoryNamesClass,
  InventoryType,
} from '@/core/model/inventory'
import AlertToast from '@/components/common/Alert/alert'
import { warningDup } from '@/constant'

interface IUploadCsvView {
  inventoriesTypeData: InventoryType[]
  inventoriesBrandData: BrandType[]
  uploadHandle: (value: IValidatedValues[]) => void
  inventoryNamesData: InventoryNamesClass[]
  isPass?: boolean
}
export const styleIconUploadFileFailed = (
  status: boolean,
): React.CSSProperties => {
  return {
    color: status ? '#61398F' : '#f00',
    backgroundColor: '#fff',
    borderColor: status ? '#61398F' : '#f00',
    borderWidth: '2px',
    borderStyle: 'solid',
    padding: '4px',
    borderRadius: '4px',
    marginTop: 'auto',
    marginBottom: 'auto',
    fontSize: '42px',
  }
}

const UploadCsvView = ({
  inventoriesTypeData,
  inventoriesBrandData,
  uploadHandle,
  inventoryNamesData,
  isPass = true,
}: IUploadCsvView) => {
  const { onCompleteValue, onChangeFile, validatedValues, removeItem } =
    useControllerUploadCsvView({
      inventoriesTypeData,
      inventoriesBrandData,
      inventoryNamesData,
      uploadHandle,
    })

  const ValidateView = () => {
    const ui = validatedValues.map((v, index) => {
      if (v.inValidData.length > 0) {
        console.log({ inValidData: v.inValidData, valid: v.validData })
        const inValids = v.inValidData.map((invalid, index) => {
          const message = invalid.message.map((inv, index) => {
            return (
              <div key={`${inv.name}-${index}`}>
                <div className="flex border-solid border-2 border-violet-300 px-[5px] py-[5px] rounded-lg text-black">
                  <p className="m-0 ml-[5px]">
                    {`${capitalizeFirstLetter(inv.name)}: ${inv.message}`}
                  </p>
                </div>
              </div>
            )
          })
          return (
            <div
              className="mb-[10px] px-4 bg-white p-[20px] rounded-xl drop-shadow-md"
              key={`${invalid.id}-${index}`}>
              <p className="m-0 mb-[5px] p-[5px] border-solidx border-2 border-blue-500  rounded-lg max-w-[20%]">
                id: {invalid.id}
              </p>
              <div className="grid grid-cols-2 gap-[5px]">{message}</div>
            </div>
          )
        })
        return (
          <div
            key={v.name}
            className="drop-shadow-md mb-[10px] w-full bg-violet-200 mx-auto rounded-lg border-2">
            <div className="p-[10px] flex justify-between px-[30px] py-[30px]">
              <div className="flex gap-[15px]">
                <BsFiletypeCsv
                  size={40}
                  style={styleIconUploadFileFailed(false)}
                />
                <p className="m-0 my-auto text-red-400">{v.name}</p>
              </div>
              <TiDelete
                size={30}
                className="cursor-pointer my-auto text-gray-400"
                onClick={() => {
                  removeItem(index)
                }}
              />
            </div>
            <div className="p-[15px]">{inValids}</div>
          </div>
        )
      } else {
        if (v.validData.length > 0) {
          return (
            <div
              key={v.name}
              className={`mb-[10px] w-full  mx-auto rounded-lg border-2 ${
                isPass ? 'bg-violet-200' : 'bg-red-200'
              }`}>
              <div className="p-[10px] flex justify-between px-[30px] pt-[30px] py-[30px]">
                <div className="flex gap-[15px]">
                  <BsFiletypeCsv
                    size={40}
                    style={styleIconUploadFileFailed(isPass)}
                  />
                  <p
                    className={`m-0 my-auto text-${
                      isPass ? 'violet' : 'red'
                    }-500`}>
                    {v.name}
                  </p>
                </div>
                <TiDelete
                  size={30}
                  className={`cursor-pointer my-auto text-${
                    isPass ? 'gray' : 'red'
                  }-400`}
                  onClick={() => {
                    removeItem(index)
                  }}
                />
              </div>
            </div>
          )
        } else {
          return <></>
        }
      }
    })
    return (
      <div className="p-0 max-h-[300px]" style={{ overflowY: 'auto' }}>
        {ui}
      </div>
    )
  }

  return (
    <>
      <UploadCsv<IDataTemplateCsv>
        onCompleteValueObj={onCompleteValue}
        onChangeFile={onChangeFile}
      />
      <div className="px-[24px] mt-[20px] my-[12px]">
        <AlertToast
          classNames="mx-auto"
          severity="warning"
          variant="standard"
          title="Duplicate!"
          message={warningDup}
        />
      </div>
      <div className="px-[24px] ">
        {validatedValues.length > 0 && (
          <>
            <p className="text-xl m-0 mt-[0px] mb-[10px] text-primary ">
              Validated files
              <span className="text-secondary text-base ">
                (please remove invalid files or duplicate name before upload)
              </span>
            </p>
            <ValidateView />
          </>
        )}
      </div>
    </>
  )
}

export default UploadCsvView

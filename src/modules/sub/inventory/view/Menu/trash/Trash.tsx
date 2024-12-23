import Modal from '@/components/commonAntd/Modal/Modal'
import { tkeys } from '@/translations/i18n'
import { Table } from 'antd'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useTrashController } from './controller'
import { GetInventoryAllDeletedType } from '@/core/gql/inventory/getInventoryAllDeletedQuery'
import {
  EnumDeletedType,
  EnumDeletedMode,
} from '@/core/gql/inventory/recoveryHardDeletedMutation'

type TableTranshPropsType = {
  modalProps: {
    open: boolean
    handleOK?: () => void
    handleCancel?: () => void
  }
  trashData: GetInventoryAllDeletedType
  recoveryHardDeletedHandler: (
    id: string,
    type: EnumDeletedType,
    mode: EnumDeletedMode,
  ) => void
  recoveryHardDeletedLoading: boolean
}

const Trash = ({
  modalProps: { open, handleOK, handleCancel },
  trashData,
  recoveryHardDeletedHandler,
  recoveryHardDeletedLoading,
}: TableTranshPropsType) => {
  const { t: trans } = useTranslation()
  const { data, columns } = useTrashController({
    data: trashData,
    recoveryHardDeletedHandler,
  })
  return (
    <>
      <Modal
        title={trans(tkeys.Inventory.MainPage.dialog.trash.header.lable)}
        open={open}
        handleOk={handleOK}
        handleCancel={handleCancel}
        contentRender={() => {
          return (
            <div className="w-full pb-[0px]">
              <p className="text-secondary m-0 px-[0px] text-base">
                {trans(tkeys.Inventory.MainPage.dialog.trash.header.sub)}
              </p>
              <div className="mt-[10px] px-0 w-full flex justify-center">
                <Table
                  className="w-full"
                  columns={columns}
                  dataSource={data}
                  pagination={false}
                  scroll={{
                    y: 425,
                    x: true,
                  }}
                  bordered
                  loading={recoveryHardDeletedLoading}
                  rowKey={(record: any) => record?.id}
                  showSorterTooltip={{ target: 'sorter-icon' }}
                />
              </div>
            </div>
          )
        }}
        footerRender={() => <></>}
      />
    </>
  )
}

export default Trash

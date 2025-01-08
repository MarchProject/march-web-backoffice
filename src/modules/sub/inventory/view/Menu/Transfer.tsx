import Modal from '@/components/commonAntd/Modal/Modal'
import TransferList from '@/components/commonAntd/Transfer/TransferList'
import { InventoriesData } from '@/core/gql/inventory/getInventoriesQuery'
import { tkeys } from '@/translations/i18n'
import { ColumnsType } from 'antd/es/table'
import React from 'react'
import { useTranslation } from 'react-i18next'

type TableTransferPropsType = {
  userColumn: ColumnsType<InventoriesData>
  dataSource: ColumnsType<InventoriesData>
  updateTable: (selected: ColumnsType<InventoriesData>) => void
  modalProps: {
    open: boolean
    handleOK?: () => void
    handleCancel?: () => void
  }
}

const Transfer = ({
  updateTable,
  userColumn,
  dataSource,
  modalProps: { open, handleOK, handleCancel },
}: TableTransferPropsType) => {
  const { t: trans } = useTranslation()
  return (
    <>
      <Modal
        title={trans(tkeys.Inventory.MainPage.menu.tableConfig)}
        open={open}
        handleOk={handleOK}
        handleCancel={handleCancel}
        contentRender={() => {
          return (
            <div className="w-full pb-[0px]">
              <div className="px-0 w-full flex justify-center">
                <TransferList
                  dataSource={dataSource}
                  selected={userColumn}
                  updateTable={updateTable}
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

export default Transfer

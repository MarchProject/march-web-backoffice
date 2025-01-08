import Modal from '@/components/commonAntd/Modal/Modal'
import { tkeys } from '@/translations/i18n'
import { Table } from 'antd'
import React from 'react'
import { useTranslation } from 'react-i18next'
import {
  ColumnTypes,
  useBranchModalController as useMainModalController,
} from './controller'
import Button from '@/components/commonAntd/Button/Button'

type TableTranshPropsType<T> = {
  modalProps: {
    open: boolean
    handleOK?: () => void
    handleCancel?: () => void
  }
  data: T[]
  loading: boolean
  updateHandle: (data: {
    id?: string
    name: string
    description?: string
  }) => void
  deleteHandle: (id: string) => void
  mode: 'type' | 'branch' | 'brand'
}

const MainModal = <T extends any>({
  modalProps: { open, handleOK, handleCancel },
  data,
  loading,
  updateHandle,
  deleteHandle,
  mode,
}: TableTranshPropsType<T>) => {
  const { t: trans } = useTranslation()
  const { columns, components, handleAdd } = useMainModalController({
    updateHandle,
    data,
    deleteHandle,
  })

  return (
    <>
      <Modal
        title={trans(tkeys.Inventory.MainPage.dialog[mode].header.lable)}
        open={open}
        handleOk={handleOK}
        handleCancel={handleCancel}
        width={900}
        contentRender={() => {
          return (
            <div className="w-full pb-[0px]">
              <p className="text-secondary m-0 px-[0px] text-base mb-[10px]">
                {trans(tkeys.Inventory.MainPage.dialog[mode].header.sub)}
              </p>
              <Button
                onClick={handleAdd}
                type="primary"
                style={{ marginBottom: 16 }}
                label={trans(tkeys.common.addNew)}
              />
              <div className=" px-0 w-full flex justify-center">
                <Table
                  components={components}
                  className="w-full"
                  columns={columns as ColumnTypes}
                  dataSource={data}
                  pagination={false}
                  scroll={{
                    y: 425,
                    x: true,
                  }}
                  bordered
                  loading={loading}
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

export default MainModal

import React, {  } from 'react'
import type { TableColumnsType } from 'antd'
import { Pagination, Table } from 'antd'
import { useResize } from '@/core/utils/hook/resizeHook'
import { useTranslation } from 'react-i18next'
import { tkeys } from '@/translations/i18n'

type TablePropsType<T> = {
  data: T[]
  columns: TableColumnsType<T>
  onChangePagination: (page: number, pageSize: number) => void
  totalRow: number
  loading: boolean
}

const Container = <T extends object>({
  data,
  columns,
  onChangePagination,
  totalRow,
  loading,
}: TablePropsType<T>) => {
  const gridHeight = useResize('idNav')
  const { t: trans }: any = useTranslation()
  return (
    <div
      key="idNav"
      id="idNav"
      style={{ height: gridHeight }}
      className={`flex flex-col justify-between`}>
      <Table<T>
        columns={columns}
        dataSource={data}
        pagination={false}
        scroll={{ scrollToFirstRowOnChange: true, y: gridHeight - 120 }}
        bordered
        loading={loading}
        rowKey={(record: any) => record?.id}
      />
      <div className="mx-auto mt-[5px]">
        <Pagination
          defaultPageSize={15}
          total={totalRow}
          pageSizeOptions={[15, 20]}
          showSizeChanger
          locale={{ items_per_page: trans(tkeys.common.table.footer.page) }}
          showTotal={(total) => {
            return `${trans(tkeys.common.table.footer.show)} ${total} ${trans(
              tkeys.common.table.footer.of,
            )} ${totalRow} ${trans(tkeys.common.table.footer.results)}`
          }}
          onChange={onChangePagination}
        />
      </div>
    </div>
  )
}

export default Container

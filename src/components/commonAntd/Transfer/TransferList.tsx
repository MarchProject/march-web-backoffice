import { InventoriesData } from '@/core/gql/inventory/getInventoriesQuery'
import { tkeys } from '@/translations/i18n'
import { TransferProps, Transfer } from 'antd'
import { ColumnsType } from 'antd/es/table'
import React, { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

type TransferListPropsType = {
  selected: ColumnsType<InventoriesData>
  dataSource: ColumnsType<InventoriesData>
  updateTable: (selected: ColumnsType<InventoriesData>) => void
}

const TransferList = ({
  dataSource,
  selected,
  updateTable,
}: TransferListPropsType) => {
  const { t: trans } = useTranslation()
  const selectedKey = useMemo(
    () => selected.map((item) => item.key),
    [selected],
  )
  const [targetKeys, setTargetKeys] = useState(selectedKey)
  const data = dataSource.map((item, i) => ({
    key: item.key,
    title: item.title.toString(),
    description: `description of content${i + 1}`,
  }))

  useEffect(() => {
    if (selectedKey.length) setTargetKeys(selectedKey)
  }, [selectedKey])

  const onChange: TransferProps['onChange'] = (nextTargetKeys) => {
    const newData = nextTargetKeys.map((nextTargetKey) => {
      return dataSource.find((item) => item.key === nextTargetKey)
    })
    console.log({ newData })
    setTargetKeys(nextTargetKeys)
    updateTable(newData)
  }

  return (
    <Transfer
      dataSource={data}
      titles={[
        trans(tkeys.common.table.config.unused),
        trans(tkeys.common.table.config.used),
      ]}
      targetKeys={targetKeys}
      onChange={onChange}
      render={(item) => item.title}
    />
  )
}

export default TransferList

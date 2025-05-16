import { dateFormatSlash, dateTimeFormat } from '@/core/common'
import { InventoriesData } from '@/core/gql/inventory/getInventoriesQuery'
import { inventoryUpdateRoute, inventoryViewRoute } from '@/router/inventory'
import { tkeys } from '@/translations/i18n'
import { SearchOutlined } from '@ant-design/icons'
import {
  Button,
  Input,
  InputRef,
  Space,
  TableColumnsType,
  TableColumnType,
} from 'antd'
import { FilterDropdownProps } from 'antd/es/table/interface'
import dayjs from 'dayjs'
import router from 'next/router'
import { useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { AiOutlineEye } from 'react-icons/ai'
import { FcLikePlaceholder, FcLike } from 'react-icons/fc'
import { RiEdit2Line } from 'react-icons/ri'

type ColumnsPropsType = {
  favoriteInventoryHandler: (id: string) => void
}

export const useColumns = ({ favoriteInventoryHandler }: ColumnsPropsType) => {
  const { t: trans }: any = useTranslation()
  const keys = tkeys.Inventory.MainPage.table

  type DataIndex = keyof InventoriesData
  const [_searchText, setSearchText] = useState('')
  const [_searchedColumn, setSearchedColumn] = useState('')
  const searchInput = useRef<InputRef>(null)

  const handleSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps['confirm'],
    dataIndex: DataIndex,
  ) => {
    confirm()
    setSearchText(selectedKeys[0])
    setSearchedColumn(dataIndex)
  }

  const handleReset = (clearFilters: () => void) => {
    clearFilters()
    setSearchText('')
  }

  const getColumnSearchProps = (
    dataIndex: DataIndex,
  ): TableColumnType<InventoriesData> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}>
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}>
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false })
              setSearchText((selectedKeys as string[])[0])
              setSearchedColumn(dataIndex)
            }}>
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close()
            }}>
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
    ),
    onFilter: (value, record) => {
      return record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase())
    },
    filterDropdownProps: {
      onOpenChange(open) {
        if (open) {
          setTimeout(() => searchInput.current?.select(), 100)
        }
      },
    },
    render: (text) => text,
  })

  const columns: TableColumnsType<InventoriesData> = [
    {
      title: trans(keys.name),
      dataIndex: 'name',
      key: 'name',
      width: 200,
      fixed: 'left',
      // width: '30%',
      ...getColumnSearchProps('name'),
    },
    {
      title: trans(keys.type),
      dataIndex: 'inventoryType',
      key: 'inventoryType',
      width: 170,
      // width: '20%',
      ...getColumnSearchProps('inventoryType'),
      render: (value) => {
        return <>{value.name}</>
      },
    },
    {
      title: trans(keys.brand),
      dataIndex: 'inventoryBrand',
      key: 'inventoryBrand',
      width: 170,
      ...getColumnSearchProps('inventoryBrand'),
      sorter: (a, b) =>
        a.inventoryBrand.name.length - b.inventoryBrand.name.length,
      sortDirections: ['descend', 'ascend'],
      render: (value) => {
        return <>{value.name}</>
      },
    },
    {
      title: trans(keys.serialNumber),
      dataIndex: 'serialNumber',
      key: 'serialNumber',
      width: 200,
      ...getColumnSearchProps('serialNumber'),
      // sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: trans(keys.branch),
      dataIndex: 'inventoryBranch',
      key: 'inventoryBranch',
      width: 170,
      ...getColumnSearchProps('inventoryBranch'),
      // sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ['descend', 'ascend'],
      render: (value) => {
        return <>{value.name}</>
      },
    },
    {
      title: trans(keys.amount),
      dataIndex: 'amount',
      key: 'amount',
      width: 170,
      ...getColumnSearchProps('amount'),
      // sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: trans(keys.sold),
      dataIndex: 'sold',
      key: 'sold',
      width: 170,
      ...getColumnSearchProps('sold'),
    },
    {
      title: trans(keys.price),
      dataIndex: 'price',
      key: 'price',
      width: 170,
      ...getColumnSearchProps('price'),
    },
    {
      title: trans(keys.priceMember),
      dataIndex: 'priceMember',
      key: 'priceMember',
      width: 170,
      ...getColumnSearchProps('priceMember'),
    },
    {
      title: trans(keys.reorderLevel),
      dataIndex: 'reorderLevel',
      key: 'reorderLevel',
      width: 170,
      ...getColumnSearchProps('reorderLevel'),
    },
    {
      title: trans(keys.sku),
      dataIndex: 'sku',
      key: 'sku',
      width: 170,
      ...getColumnSearchProps('sku'),
    },
    {
      title: trans(keys.expiryDate),
      dataIndex: 'expiryDate',
      key: 'expiryDate',
      width: 170,
      align: 'center',
      ...getColumnSearchProps('expiryDate'),
      render: (value) => {
        return (
          <>
            {value
              ? dayjs(value, dateTimeFormat)
                  .locale('th')
                  .format(dateFormatSlash)
              : ''}
          </>
        )
      },
    },
    {
      title: trans(keys.description),
      dataIndex: 'description',
      key: 'description',
      width: 170,
      ...getColumnSearchProps('description'),
    },
    {
      title: trans(keys.action),
      dataIndex: 'action',
      width: 120,
      key: 'action',
      align: 'center',
      fixed: 'right',
      // ...getColumnSearchProps('address'),
      render: (_value, record) => {
        return (
          <div className="flex gap-[15px] justify-between">
            <RiEdit2Line
              onClick={() => {
                router.push({
                  pathname: inventoryUpdateRoute.pathWithParam(record.id),
                })
              }}
              className="cursor-pointer text-primary200"
              size={18}
            />

            <AiOutlineEye
              className="cursor-pointer text-accent200"
              size={18}
              onClick={() => {
                router.push({
                  pathname: inventoryViewRoute.pathWithParam(record.id),
                })
              }}
            />
            <div
              onClick={() => {
                favoriteInventoryHandler(record.id)
              }}>
              {!record.favorite ? (
                <FcLikePlaceholder
                  className="cursor-pointer text-secondary"
                  size={18}
                />
              ) : (
                <FcLike className="cursor-pointer text-secondary" size={18} />
              )}
            </div>
          </div>
        )
      },
    },
  ]

  return columns
}

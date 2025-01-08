// import { InventoriesData } from '@/core/gql/inventory'
import { Tooltip } from '@mui/material'
import { GridColDef } from '@mui/x-data-grid'
import { CSSProperties } from 'react'
import { RiEdit2Line } from 'react-icons/ri'
import router from 'next/router'
import { inventoryUpdateRoute, inventoryViewRoute } from '@/router/inventory'
import { AiOutlineEye } from 'react-icons/ai'
import { FcLike, FcLikePlaceholder } from 'react-icons/fc'
import { useTranslation } from 'react-i18next'
import { tkeys } from '@/translations/i18n'
import { Inventory } from '@/core/model/inventory'

const styleColumns: CSSProperties = {
  textOverflow: 'ellipsis',
  overflow: 'hidden',
}

interface ColumnInventory {
  favoriteInventoryHandle: (value: string) => void
}

export const mainTableColumns = ({
  favoriteInventoryHandle,
}: ColumnInventory): GridColDef<Inventory>[] => {
  const { t: trans }: any = useTranslation()

  const keys = tkeys.Inventory.MainPage.table

  const mainInventoryColumn: GridColDef[] = [
    {
      field: 'name',
      headerName: trans(keys.name),
      flex: 1,
      minWidth: 160,
      valueGetter: (params) => params.row?.name,
      renderCell: (params) => {
        const name = params.row?.name
        return (
          <Tooltip title={name} arrow placement="top" enterTouchDelay={0}>
            <p style={styleColumns}>{name}</p>
          </Tooltip>
        )
      },
    },
    {
      field: 'inventoryType',
      headerName: trans(keys.type),
      flex: 1,
      minWidth: 150,
      valueGetter: (params) => params.row?.inventoryType?.name,
      renderCell: (params) => {
        const type = params.row?.inventoryType?.name
        return (
          <Tooltip title={type} arrow placement="top" enterTouchDelay={0}>
            <p style={styleColumns}>{type}</p>
          </Tooltip>
        )
      },
    },
    {
      field: 'inventoryBrand',
      headerName: trans(keys.brand),
      flex: 1,
      minWidth: 150,
      valueGetter: (params) => params.row?.inventoryBrand?.name,
      renderCell: (params) => {
        const brand = params.row?.inventoryBrand?.name
        return (
          <Tooltip title={brand} arrow placement="top" enterTouchDelay={0}>
            <p style={styleColumns}>{brand}</p>
          </Tooltip>
        )
      },
    },
    {
      field: 'serialNumber',
      headerName: trans(keys.serialNumber),
      flex: 1,
      minWidth: 150,
      sortable: true,
      valueGetter: (params) => params.row?.serialNumber,
      renderCell: (params) => {
        const serialNumber = params.row?.serialNumber
        return (
          <Tooltip
            title={serialNumber}
            arrow
            placement="top"
            enterTouchDelay={0}>
            <p style={styleColumns}>{serialNumber}</p>
          </Tooltip>
        )
      },
    },
    {
      field: 'inventoryBranch',
      headerName: trans(keys.branch),
      flex: 1,
      minWidth: 150,
      sortable: true,
      valueGetter: (params) => params.row?.inventoryBranch?.name,
      renderCell: (params) => {
        const branch = params.row?.inventoryBranch?.name
        return (
          <Tooltip title={branch} arrow placement="top" enterTouchDelay={0}>
            <p style={styleColumns}>{branch}</p>
          </Tooltip>
        )
      },
    },
    {
      field: 'amount',
      headerName: trans(keys.amount),
      flex: 1,
      minWidth: 150,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'sold',
      headerName: trans(keys.sold),
      type: 'number',
      flex: 1,
      minWidth: 120,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'price',
      headerName: trans(keys.price),
      type: 'number',
      flex: 1,
      minWidth: 120,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'priceMember',
      headerName: trans(keys.priceMember),
      type: 'number',
      flex: 1,
      minWidth: 120,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'reorderLevel',
      headerName: trans(keys.reorderLevel),
      type: 'number',
      flex: 1,
      minWidth: 120,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'sku',
      headerName: trans(keys.sku),
      type: 'string',
      flex: 1,
      minWidth: 200,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'formattedExpiryDate',
      headerName: trans(keys.expiryDate),
      sortable: false,
      flex: 1,
      minWidth: 150,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'description',
      headerName: trans(keys.description),
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      flex: 1,
      minWidth: 150,
      align: 'center',
      headerAlign: 'center',
      valueGetter: (params) => params.row?.description,
      renderCell: (params) => {
        const description = params.row?.description
        return (
          <Tooltip
            title={description}
            arrow
            placement="top"
            enterTouchDelay={0}>
            <p style={styleColumns}>{description}</p>
          </Tooltip>
        )
      },
    },
    {
      field: 'action',
      headerName: trans(keys.action),
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      // flex: 1,
      minWidth: 90,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => {
        return (
          <div className="flex gap-[15px]">
            <RiEdit2Line
              onClick={() => {
                router.push({
                  pathname: inventoryUpdateRoute.pathWithParam(params.row?.id),
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
                  pathname: inventoryViewRoute.pathWithParam(params.row?.id),
                })
              }}
            />
            <div
              onClick={() => {
                favoriteInventoryHandle(params.row?.id)
              }}>
              {!params.row?.favorite ? (
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

  return mainInventoryColumn
}

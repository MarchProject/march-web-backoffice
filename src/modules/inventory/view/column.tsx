// import { InventoriesData } from '@/core/gql/inventory'
import { Tooltip } from '@mui/material'
import { GridColDef } from '@mui/x-data-grid'
import { CSSProperties } from 'react'
import { RiEdit2Line } from 'react-icons/ri'
import router from 'next/router'
import { inventoryUpdateRoute, inventoryViewRoute } from '@/router/inventory'
import { AiOutlineEye } from 'react-icons/ai'
import { FcLike, FcLikePlaceholder } from 'react-icons/fc'

const styleColumns: CSSProperties = {
  textOverflow: 'ellipsis',
  overflow: 'hidden',
}

interface ColumnInventory {
  favoriteInventoryHandle: (value: string) => void
}

export const columns = ({
  favoriteInventoryHandle,
}: ColumnInventory): GridColDef[] => {
  return [
    //   {
    //     field: 'id',
    //     headerName: 'ID',
    //     width: 90,
    //     align: 'center',
    //     headerAlign: 'center',
    //   },
    {
      field: 'name',
      headerName: 'Item Name',
      flex: 1,
      minWidth: 100,
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
      headerName: 'Item Type',
      flex: 1,
      minWidth: 100,
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
      field: 'brandType',
      headerName: 'Item Brand',
      flex: 1,
      minWidth: 100,
      renderCell: (params) => {
        const brand = params.row?.brandType?.name
        return (
          <Tooltip title={brand} arrow placement="top" enterTouchDelay={0}>
            <p style={styleColumns}>{brand}</p>
          </Tooltip>
        )
      },
    },
    {
      field: 'amount',
      headerName: 'On Hand',
      flex: 1,
      minWidth: 100,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'sold',
      headerName: 'Sold',
      type: 'number',
      flex: 1,
      minWidth: 100,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'price',
      headerName: 'Price',
      type: 'number',
      flex: 1,
      minWidth: 100,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'formattedExpiryDate',
      headerName: 'Expiry Date',
      sortable: false,
      flex: 1,
      minWidth: 120,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'description',
      headerName: 'Description',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      flex: 1,
      minWidth: 100,
      align: 'center',
      headerAlign: 'center',
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
      headerName: 'Actions',
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
                <FcLike
                  className="cursor-pointer text-secondary"
                  size={18}
                />
              )}
            </div>
          </div>
        )
      },
    },
  ]
}

import { InventoriesData } from '@/core/gql/inventory'
import { Tooltip } from '@mui/material'
import { GridColDef } from '@mui/x-data-grid'
import { CSSProperties } from 'react'
import { RiEdit2Line } from 'react-icons/ri'
import { CiCircleMore } from 'react-icons/ci'
type InventoriesDataColumn = {
  row: InventoriesData
}

const styleColumns: CSSProperties = {
  textOverflow: 'ellipsis',
  overflow: 'hidden',
}

export const columns = (): GridColDef[] => {
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
      headerName: 'Type',
      flex: 1,
      minWidth: 100,
      // valueGetter: (params: InventoriesDataColumn) => {
      //   return `${params.row?.inventoryType?.name}`
      //   // .split('|')[0]}`
      // },
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
      headerName: 'Brand',
      flex: 1,
      minWidth: 100,
      // valueGetter: (params: InventoriesDataColumn) => {
      //   return `${params.row?.brandType?.name?.split('|')[0]}223`
      // },
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
      // description: 'This column has a value getter and is not sortable.',
      // sortable: false,
      flex: 1,
      minWidth: 100,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'formattedExpiryDate',
      headerName: 'Expiry Date',
      // description: 'This column has a value getter and is not sortable.',
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
      renderCell: () => {
        return (
          <div className="flex gap-[15px]">
            <RiEdit2Line className="cursor-pointer text-secondary" size={18} />
            <CiCircleMore className="cursor-pointer text-secondary" size={18} />
          </div>
        )
      },
    },
  ]
}

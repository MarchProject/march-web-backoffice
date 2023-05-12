import { InventoriesData } from '@/core/gql/inventory'
import { Tooltip } from '@mui/material'
import { GridColDef } from '@mui/x-data-grid'
type InventoriesDataColumn = {
  row: InventoriesData
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
      headerName: 'Name',
      flex: 2,
      minWidth: 100,
      renderCell: (params) => {
        const name = params.row?.name?.split('|')[0]
        return (
          <Tooltip title={name} arrow placement="top" enterTouchDelay={0}>
            <p
              style={{
                textOverflow: 'ellipsis',
                overflow: 'hidden',
              }}>
              {name}
            </p>
          </Tooltip>
        )
      },
    },
    {
      field: 'amount',
      headerName: 'Amount',
      flex: 1,
      minWidth: 100,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'inventoryType',
      headerName: 'Type',
      flex: 2,
      minWidth: 100,
      valueGetter: (params: InventoriesDataColumn) => {
        return `${params.row?.inventoryType?.name?.split('|')[0]}`
      },
    },
    {
      field: 'brandType',
      headerName: 'Brand',
      flex: 1,
      minWidth: 100,
      valueGetter: (params: InventoriesDataColumn) => {
        return `${params.row?.brandType?.name?.split('|')[0]}`
      },
      renderCell: (params) => {
        const brand = params.row?.brandType?.name?.split('|')[0]
        return (
          <Tooltip title={brand} arrow placement="top" enterTouchDelay={0}>
            <p
              style={{
                textOverflow: 'ellipsis',
                overflow: 'hidden',
              }}>
              {brand}
            </p>
          </Tooltip>
        )
      },
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
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      flex: 1,
      minWidth: 100,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'expiryDate',
      headerName: 'Expiry Date',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      flex: 1,
      minWidth: 100,
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
    },
    {
      field: 'action',
      headerName: 'Action',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      flex: 1,
      minWidth: 100,
      renderCell: () => {
        return (
          <Tooltip title="action" arrow placement="top">
            <a className="cursor-pointer">action</a>
          </Tooltip>
        )
      },
    },
  ]
}

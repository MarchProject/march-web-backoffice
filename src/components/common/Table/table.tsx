import * as React from 'react'
import {
  DataGrid,
  GridCallbackDetails,
  GridPaginationModel,
  GridRowSelectionModel,
} from '@mui/x-data-grid'


type DataTableMarchProps = {
  rows: any[]
  columns: any[]
  onRow: (
    rowSelectionModel: GridRowSelectionModel,
    details: GridCallbackDetails<any>,
  ) => void
  onPaginationModelChange: (
    model: GridPaginationModel,
    details: GridCallbackDetails<any>,
  ) => void
}

export default function DataTableMarch({
  rows,
  columns,
  onRow,
  onPaginationModelChange,
}: DataTableMarchProps) {
  return (
    <div className="w-full" style={{ height: 'calc(100vh - 120px)' }}>
      <DataGrid
        sx={{
          '& .MuiDataGrid-columnHeaders': {
            color: 'text100.main',
            backgroundColor: '#f3f4f6',
          },
          '& .MuiDataGrid-row': {
            color: 'text200.main',
          },
        }}
        rows={rows}
        columns={columns}
        onRowSelectionModelChange={onRow}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        onPaginationModelChange={onPaginationModelChange}
        pageSizeOptions={[5, 10, 15]}
        checkboxSelection
        disableRowSelectionOnClick
        disableColumnMenu
        disableColumnSelector
      />
    </div>
  )
}

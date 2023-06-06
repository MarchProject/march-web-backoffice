import * as React from 'react'
import {
  DataGrid,
  GridCallbackDetails,
  GridFooterContainer,
  GridPagination,
  GridPaginationModel,
  GridRowSelectionModel,
  useGridApiRef,
} from '@mui/x-data-grid'
import { Pagination } from '@mui/material'
import { useEffect, useState } from 'react'

type DataTableMarchProps = {
  rows: any[]
  columns: any[]
  pageCount: number
  onRow: (
    rowSelectionModel: GridRowSelectionModel,
    details: GridCallbackDetails<any>,
  ) => void
  onPaginationModelChange: (
    model: GridPaginationModel,
    details: GridCallbackDetails<any>,
  ) => void
  page: number
  setPage: (value: number) => void
  loading: boolean
  limit: number
  totalRow: number
}

export default function DataTableMarch({
  rows = [],
  columns,
  onRow,
  pageCount = 1,
  onPaginationModelChange,
  setPage,
  page,
  loading,
  limit,
  totalRow = 1,
}: DataTableMarchProps) {
  const apiRef = useGridApiRef()

  const CustomPagination = () => {

    return (
      <Pagination
        color="primary"
        count={pageCount}
        page={page}
        onChange={(_, value) => {
          setPage(value)
        }}
      />
    )
  }

  const CustomFooter = () => {
    const offset = page * limit - limit || 0
    return (
      <GridFooterContainer>
        <div className="flex">
          {totalRow > 0 && (
            <h5 className="text-secondary ml-4">
              Show {offset + 1} - {offset + limit} of {totalRow} results
            </h5>
          )}
        </div>
        <CustomPagination />
        <div className="pr-4 flex">
          <GridPagination
            sx={{
              '& .MuiInputBase-root': {
                marginRight: '5px',
              },
            }}
            labelDisplayedRows={() => <>entries</>}
            labelRowsPerPage={'Show'}
            ActionsComponent={() => <></>}
            getItemAriaLabel={undefined}
          />
        </div>
      </GridFooterContainer>
    )
  }

  const [gridHeight, setGridHeight] = useState(0)

  useEffect(() => {
    const handleResize = () => {
      const windowHeight = window.innerHeight
      const navbarHeight =
        document.getElementById('navbar-inventory')?.offsetHeight
      const availableHeight = windowHeight - navbarHeight - 65
      setGridHeight(availableHeight)
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div className={'w-full'} style={{ height: gridHeight }}>
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
        apiRef={apiRef}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 15 },
          },
        }}
        onPaginationModelChange={onPaginationModelChange}
        pageSizeOptions={[15, 30]}
        checkboxSelection
        disableRowSelectionOnClick
        disableColumnMenu
        disableColumnSelector
        slots={{ footer: CustomFooter }}
        loading={loading}
      />
    </div>
  )
}

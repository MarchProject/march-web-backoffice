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
import { useTranslation } from 'react-i18next'
import { tkeys } from '@/translations/i18n'
import { useResize } from '@/core/utils/hook/resizeHook'

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
  idNav?: string
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
  idNav,
}: DataTableMarchProps) {
  const apiRef = useGridApiRef()
  const { t: trans }: any = useTranslation()

  const CustomPagination = () => {
    return (
      <Pagination
        size="small"
        color="primary"
        sx={{
          '& .Mui-selected': {
            color: 'white !important',
          },
        }}
        // style={{ margin: 'auto' }}
        count={pageCount}
        siblingCount={0}
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
        <div className="grid grid-cols-3 w-full">
          <div className="">
            <div className="lg:flex hidden">
              {totalRow > 0 && (
                <h5 className="text-secondary ml-4 font-medium">
                  {`${trans(tkeys.common.table.footer.show)} ${offset + 1} - ${
                    offset + limit
                  } ${trans(tkeys.common.table.footer.of)} ${totalRow} ${trans(
                    tkeys.common.table.footer.results,
                  )}`}
                </h5>
              )}
            </div>
            <div className="lg:hidden flex justify-center items-center text-center w-full h-full">
              {totalRow > 0 && (
                <p className="text-secondary m-0 font-medium text-xs">
                  {`${offset + 1} - ${offset + limit} / ${totalRow}`}
                </p>
              )}
            </div>
          </div>
          <div className="col-span-2 lg:col-span-1 lg:my-auto lg:mx-auto flex lg:block justify-end px-[5px]">
            <CustomPagination />
          </div>
          <div className="pr-4 justify-end items-center lg:flex hidden">
            <GridPagination
              SelectProps={{
                MenuProps: {
                  sx: {
                    '& .MuiPaper-root': {
                      backgroundColor: '#fff',
                      borderRadius: '8px',
                    },
                    '& .Mui-selected': {
                      backgroundColor: '#a78bfa !important',
                      color: 'white',
                    },
                    '& .Mui-selected:hover': {
                      backgroundColor: '#8b5cf6 !important',
                    },
                    '& .MuiButtonBase-root:hover': {
                      backgroundColor: '#8b5cf6',
                      color: '#fff',
                    },
                    '& .MuiButtonBase-root': {
                      // marginX: 'auto',
                      // width: '30px',
                      // height: '30px',
                      // display: 'flex',
                      // justifyContent: 'center',
                      // borderRadius: '8px',
                    },
                    '& .MuiList-root': {
                      display: 'grid',
                      // gap: '8px',
                    },
                  },
                },
              }}
              sx={{
                '& .MuiInputBase-root': {
                  marginRight: '5px',
                },
                '& .MuiPaper-root': {
                  // backgroundColor: 'red',
                },
                '& .MuiTablePagination-selectLabel': {
                  color: '#878787',
                  fontSize: '12px',
                  fontWeight: '500',
                },
                '& .MuiSelect-select': {
                  color: '#878787',
                  fontSize: '12px',
                  fontWeight: '400',
                },
                //MuiPaper-root
              }}
              labelDisplayedRows={() => (
                <div className="text-secondary text-xs font-medium lg:block hidden">
                  {trans(tkeys.common.table.footer.entries)}
                </div>
              )}
              labelRowsPerPage={trans(tkeys.common.table.footer.show)}
              ActionsComponent={() => <></>}
              getItemAriaLabel={undefined}
            />
          </div>
        </div>
      </GridFooterContainer>
    )
  }

  // const [gridHeight, setGridHeight] = useState(0)

  // useEffect(() => {
  //   const handleResize = () => {
  //     const windowHeight = window.innerHeight
  //     const navbarHeight =
  //       document.getElementById('navbar-inventory')?.offsetHeight
  //     const availableHeight = windowHeight - navbarHeight - 65
  //     setGridHeight(availableHeight)
  //   }

  //   window.addEventListener('resize', handleResize)
  //   handleResize()

  //   return () => {
  //     window.removeEventListener('resize', handleResize)
  //   }
  // }, [])
  const gridHeight = useResize(idNav)
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
        autoHeight={gridHeight === 0}
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
        // checkboxSelection
        disableRowSelectionOnClick
        disableColumnMenu
        disableColumnSelector
        slots={{ footer: CustomFooter }}
        loading={loading}
      />
    </div>
  )
}

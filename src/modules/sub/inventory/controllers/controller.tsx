import { useCallback, useEffect, useMemo, useState } from 'react'
import { columns } from './view/column'
import { Inventory } from '@/core/model/inventory'
import { getMainInventoryColumn, setMainInventoryColumn } from '@/config/client'
import { IMainTables } from '@/modules/inventory/interface'
import { ColumnsType } from 'antd/es/table'
import { useNotificationContext } from '@/context/notification'
import { useQueryInventories } from './apiHandler/useQueryInventories'
import { useMutationFavorite } from './apiHandler/useMutationFavorite'

export const useControllerInventory = () => {
  const { notification, errorNotification } = useNotificationContext()

  const {
    inventoryData,
    inventoryLoading,
    // inventoryPage,
    // inventoryLimit,
    // inventorySearch,
    onPaginationModelChange,
    handleSearchChange,
    // setType,
    setPage,
    // setBrand,
    // setBranch,
    // setFavorite,
    // favorite,
    // handleFavoriteChange,
    // handleClearChange,
    // inventoryTypeValue,
    // inventoryBrandValue,
    // inventoryBranchValue,
    setTriggerInventories,
  } = useQueryInventories({
    notification,
  })

  const { favoriteInventoryLoading, favoriteInventoryHandler } =
    useMutationFavorite({
      errorNotification,
      notification,
      setTrigger: setTriggerInventories,
    })

  const { userColumn } = useColumnHandler({
    favoriteInventoryHandler,
  })

  const onChangePagination = (page: number, pageSize: number) => {
    setPage(page)
    onPaginationModelChange(pageSize)
  }

  return {
    table: {
      handleSearchChange,
      userColumn,
      data: {
        inventory: {
          data: inventoryData?.getInventories?.inventories,
          loading: inventoryLoading || favoriteInventoryLoading,
          totalRow: inventoryData?.getInventories?.totalRow,
          onChangePagination,
        },
      },
    },
  }
}

const useColumnHandler = ({ favoriteInventoryHandler }) => {
  const mainTableColumn = columns({ favoriteInventoryHandler })

  const [userColumn, setUserColumn] = useState<ColumnsType<Inventory>>([])
  const [unUsedColumn, setUnUsedColumn] = useState<ColumnsType<Inventory>>([])
  const mainTable = getMainInventoryColumn()

  const localTables: IMainTables[] = useMemo(() => {
    return JSON.parse(mainTable) ?? []
  }, [mainTable])

  const mainTableColumns: ColumnsType<Inventory> = useMemo(
    () => mainTableColumn || [],
    [mainTableColumn],
  )

  const arraysEqual = (arr1, arr2) => {
    return JSON.stringify(arr1) === JSON.stringify(arr2)
  }

  useEffect(() => {
    const newUserColumn: ColumnsType<Inventory> = []
    const newUnUsedColumn: ColumnsType<Inventory> = []
    if (localTables.length > 0 && mainTableColumns.length > 0) {
      mainTableColumns.forEach((m) => {
        const check = Object.values(localTables).some((e) => e.field === m.key)
        if (check) {
          newUserColumn.push(m)
        } else {
          newUnUsedColumn.push(m)
        }
      })

      newUserColumn.sort((a, b) => {
        const indexA = localTables.findIndex(
          (localTable) => localTable.field === a.key,
        )
        const indexB = localTables.findIndex(
          (localTable) => localTable.field === b.key,
        )
        return indexA - indexB
      })
    }

    if (!arraysEqual(newUserColumn, userColumn)) {
      setUserColumn(newUserColumn)
      setUnUsedColumn(newUnUsedColumn)
    }
  }, [localTables, mainTableColumns, userColumn])

  const updateTable = useCallback((selected: any[], unSelected: any[]) => {
    setUserColumn(selected)
    setUnUsedColumn(unSelected)
    const valueLocals = selected.map((e) => {
      return { field: e.field }
    })
    setMainInventoryColumn(JSON.stringify(valueLocals))
  }, [])

  return { userColumn, unUsedColumn, updateTable }
}

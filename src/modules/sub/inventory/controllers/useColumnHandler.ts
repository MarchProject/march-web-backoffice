import { getMainInventoryColumn, setMainInventoryColumn } from '@/config/client'
import { IMainTables } from '@/modules/inventory/interface'
import { ColumnsType } from 'antd/es/table'
import { useState, useMemo, useEffect, useCallback } from 'react'
import { columns } from '../view/column'
import { InventoriesData } from '@/core/gql/inventory/getInventoriesQuery'

type useColumnHandlerPropsType = {
  favoriteInventoryHandler: (id: string) => void
}

export const useColumnHandler = ({
  favoriteInventoryHandler,
}: useColumnHandlerPropsType) => {
  const mainTableColumn = columns({ favoriteInventoryHandler })

  const [userColumn, setUserColumn] = useState<ColumnsType<InventoriesData>>([])
  const [unUsedColumn, setUnUsedColumn] = useState<
    ColumnsType<InventoriesData>
  >([])
  const mainTable = getMainInventoryColumn()

  const localTables: IMainTables[] = useMemo(() => {
    return JSON.parse(mainTable) ?? []
  }, [mainTable])

  const mainTableColumns: ColumnsType<InventoriesData> = useMemo(
    () => mainTableColumn || [],
    [mainTableColumn],
  )

  const arraysEqual = (arr1, arr2) => {
    return JSON.stringify(arr1) === JSON.stringify(arr2)
  }

  useEffect(() => {
    const newUserColumn: ColumnsType<InventoriesData> = []
    const newUnUsedColumn: ColumnsType<InventoriesData> = []
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

  const updateTable = useCallback((selected: any[]) => {
    setUserColumn(selected)
    // setUnUsedColumn(unSelected)
    const valueLocals = selected.map((e) => {
      return { field: e.key }
    })
    console.log({ valueLocals })
    setMainInventoryColumn(JSON.stringify(valueLocals))
  }, [])

  return { userColumn, unUsedColumn, updateTable, mainTableColumns }
}

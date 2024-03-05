import { useNotificationContext } from '@/context/notification'
import { InventoryBrand, InventoryType } from '@/core/model/inventory'
import { AutocompleteChangeReason } from '@mui/material'
import {
  SyntheticEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { useQueryInventoryBrand } from './fetcher/useQueryInventoryBrand'
import { useQueryInventoryType } from './fetcher/useQueryInventoryType'
import { useMutationFavorite } from './fetcher/useMutationFavorite'
import { useGetInventoryNames } from './fetcher/useGetInventoryNames'
import { useQueryInventories } from './fetcher/useQueryInventories'
import { useQueryTrashHandler } from './fetcher/useQueryTrash'
import { useQueryInventoryBranch } from './fetcher/useQueryInventoryBranch'
import { GridColDef } from '@mui/x-data-grid'
import { IMainTables } from './interface'
import { getMainInventoryColumn, setMainInventoryColumn } from '@/config/client'
import { mainTableColumns } from './view/column'

export const useInventoryController = () => {
  const { notification } = useNotificationContext()
  const [triggerType, setTriggerType] = useState(true)
  const [triggerBrand, setTriggerBrand] = useState(true)
  const [triggerBranch, setTriggerBranch] = useState(true)
  const [triggerFavorite, setTriggerFavorite] = useState(true)
  const [triggerGetInventoryNames, setTriggerGetInventoryNames] = useState(true)
  const [triggerInventory, setTriggerInventory] = useState(true)
  const {
    inventoryData,
    inventoryLoading,
    inventoryPage,
    inventoryLimit,
    inventorySearch,
    onPaginationModelChange,
    onRow,
    handleChangeInventory,
    setType,
    setPage,
    setBrand,
    setBranch,
    setFavorite,
    favorite,
    handleFavoriteChange,
    handleClearChange,
    inventoryTypeValue,
    inventoryBrandValue,
    inventoryBranchValue,
  } = useQueryInventories({
    notification,
    triggerType,
    triggerBrand,
    triggerBranch,
    triggerFavorite,
    triggerGetInventoryNames,
    triggerInventory,
  })

  const {
    inventoriesTypeData,
    inventoriesTypeDataError,
    inventoriesTypeLoading,
    handleSearchInventoryType,
  } = useQueryInventoryType({ trigger: triggerType })
  const { inventoryNamesData, inventoryNamesError, inventoryNamesLoading } =
    useGetInventoryNames({ triggerGetInventoryNames })
  const { favoriteInventoryHandle } = useMutationFavorite({
    notification,
    setTriggerFavorite,
  })
  const { setTriggerTrash, trashData } = useQueryTrashHandler({ notification })
  const {
    inventoriesBrandData,
    inventoriesBrandDataError,
    inventoriesBrandLoading,
    handleSearchInventoryBrand,
  } = useQueryInventoryBrand({ trigger: triggerBrand })
  const {
    inventoriesBranchData,
    inventoriesBranchDataError,
    inventoriesBranchLoading,
    handleSearchInventoryBranch,
  } = useQueryInventoryBranch({ trigger: triggerBranch })
  const { handleTypeChange, handleBrandChange, handleBranchChange } =
    useHandleInventory({
      setType,
      setBrand,
      setBranch,
    })

  const { userColumn, unUsedColumn, updateTable } = useHandleMainTable({
    mainTableColumn: mainTableColumns({ favoriteInventoryHandle }),
  })

  return {
    globalState: {},
    setTriggerType,
    setTriggerBrand,
    setTriggerBranch,
    setTriggerFavorite,
    inventory: {
      inventoryData,
      inventoryLoading,
      inventoryPage,
      inventoryLimit,
      inventorySearch,
      handleClearChange,
      onPaginationModelChange,
      onRow,
      handleChangeInventory,
      setType,
      setPage,
      setBrand,
      setBranch,
      favorite,
      setFavorite,
      handleFavoriteChange,
      inventoryTypeValue,
      inventoryBrandValue,
      inventoryBranchValue,
      setTriggerInventory,
      triggerInventory,
    },
    inventoriesType: {
      inventoriesTypeData,
      inventoriesTypeDataError,
      inventoriesTypeLoading,
      handleSearchInventoryType,
    },
    inventoriesBrand: {
      inventoriesBrandData,
      inventoriesBrandDataError,
      inventoriesBrandLoading,
      handleSearchInventoryBrand,
    },
    inventoriesBranch: {
      inventoriesBranchData,
      inventoriesBranchLoading,
      inventoriesBranchDataError,
      handleSearchInventoryBranch,
    },
    handleInventory: {
      handleTypeChange,
      handleBrandChange,
      handleBranchChange,
    },
    favoriteInventoryHandle,
    InventoryNames: {
      inventoryNamesData,
      inventoryNamesError,
      inventoryNamesLoading,
      setTriggerGetInventoryNames,
    },
    trash: {
      setTriggerTrash,
      trashData,
    },
    mainTab: {
      userColumn,
      unUsedColumn,
      updateTable,
    },
  }
}

// const useGlobalInventory = ({}) => {}

const useHandleInventory = ({ setType, setBrand, setBranch }) => {
  const handleTypeChange = useCallback(
    (
      _: SyntheticEvent<Element, Event>,
      value: InventoryType[],
      reason: AutocompleteChangeReason,
    ) => {
      if (reason === 'selectOption' || reason === 'removeOption') {
        setType(value)
      } else {
        setType([])
      }
    },
    [setType],
  )

  const handleBrandChange = useCallback(
    (
      _: SyntheticEvent<Element, Event>,
      value: InventoryBrand[],
      reason: AutocompleteChangeReason,
    ) => {
      if (reason === 'selectOption' || reason === 'removeOption') {
        setBrand(value)
      } else {
        setBrand([])
      }
    },
    [setBrand],
  )

  const handleBranchChange = useCallback(
    (
      _: SyntheticEvent<Element, Event>,
      value: InventoryBrand[],
      reason: AutocompleteChangeReason,
    ) => {
      if (reason === 'selectOption' || reason === 'removeOption') {
        setBranch(value)
      } else {
        setBranch([])
      }
    },
    [setBranch],
  )

  return {
    handleTypeChange,
    handleBrandChange,
    handleBranchChange,
  }
}

const useHandleMainTable = ({ mainTableColumn }) => {
  const [userColumn, setUserColumn] = useState([])
  const [unUsedColumn, setUnUsedColumn] = useState([])
  const mainTable = getMainInventoryColumn()

  const localTables: IMainTables[] = useMemo(() => {
    return JSON.parse(mainTable) ?? []
  }, [mainTable])

  const mainTableColumns: GridColDef[] = useMemo(
    () => mainTableColumn || [],
    [mainTableColumn],
  )

  const arraysEqual = (arr1, arr2) => {
    return JSON.stringify(arr1) === JSON.stringify(arr2)
  }

  useEffect(() => {
    const newUserColumn = []
    const newUnUsedColumn = []
    if (localTables.length > 0 && mainTableColumns.length > 0) {
      mainTableColumns.forEach((m) => {
        const check = Object.values(localTables).some(
          (e) => e.field === m.field,
        )
        if (check) {
          newUserColumn.push(m)
        } else {
          newUnUsedColumn.push(m)
        }
      })

      newUserColumn.sort((a, b) => {
        const indexA = localTables.findIndex(
          (localTable) => localTable.field === a.field,
        )
        const indexB = localTables.findIndex(
          (localTable) => localTable.field === b.field,
        )
        return indexA - indexB
      })
    }

    if (!arraysEqual(newUserColumn, userColumn)) {
      setUserColumn(newUserColumn)
      setUnUsedColumn(newUnUsedColumn)
    }
  }, [localTables, mainTableColumns, userColumn])

  const updateTable = useCallback(
    (selected: GridColDef[], unSelected: GridColDef[]) => {
      setUserColumn(selected)
      setUnUsedColumn(unSelected)
      const valueLocals = selected.map((e) => {
        return { field: e.field }
      })
      setMainInventoryColumn(JSON.stringify(valueLocals))
    },
    [],
  )

  return { userColumn, unUsedColumn, updateTable }
}

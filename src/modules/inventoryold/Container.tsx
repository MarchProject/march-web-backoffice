import React from 'react'
import { InventoryManagement } from './view/InventoryManagement'
import DataTableMarch from '@/components/common/Table/table'
import { useInventoryController } from './controller'

const ContainerInventory = () => {
  const {
    globalState: {},
    inventory: {
      inventoryData,
      inventoryLoading,
      inventoryPage,
      inventoryLimit,
      onPaginationModelChange,
      inventorySearch,
      onRow,
      handleChangeInventory,
      setPage,
      handleClearChange,
      inventoryTypeValue,
      inventoryBrandValue,
      inventoryBranchValue,
      handleFavoriteChange,
      favorite,
      setTriggerInventory,
    },
    inventoriesType: {
      inventoriesTypeData,
      inventoriesTypeLoading,
      handleSearchInventoryType,
    },
    inventoriesBrand: {
      inventoriesBrandData,
      inventoriesBrandLoading,
      handleSearchInventoryBrand,
    },
    inventoriesBranch: {
      inventoriesBranchData,
      inventoriesBranchLoading,
      handleSearchInventoryBranch,
    },
    handleInventory: {
      handleTypeChange,
      handleBrandChange,
      handleBranchChange,
    },
    setTriggerType,
    setTriggerBrand,
    setTriggerBranch,
    InventoryNames: { inventoryNamesData, setTriggerGetInventoryNames },
    trash: { setTriggerTrash, trashData },
    mainTab: { userColumn, unUsedColumn, updateTable },
  } = useInventoryController()

  return (
    <div className="w-full mainBg min-h-[calc(100vh + 10px)] h-auto lg:h-[calc(100vh)]">
      <div className="p-[15px]">
        <div className="bg-white m-0 rounded-lg lg:min-h-[calc(100vh-63px)] min-h-[calc(100vh-56px)]">
          <div className="mb-[0px] h-full">
            <div className="p-4">
              <InventoryManagement
                inventorySearch={inventorySearch}
                setSearch={handleChangeInventory}
                handleTypeChange={handleTypeChange}
                handleBrandChange={handleBrandChange}
                handleBranchChange={handleBranchChange}
                handleClearChange={handleClearChange}
                inventoryType={{
                  inventoriesTypeData,
                  inventoriesTypeLoading,
                  handleSearchInventoryType,
                }}
                inventoryBrand={{
                  inventoriesBrandData,
                  inventoriesBrandLoading,
                  handleSearchInventoryBrand,
                }}
                inventoryNamesData={inventoryNamesData}
                setTriggerGetInventoryNames={setTriggerGetInventoryNames}
                inventoryTypeValue={inventoryTypeValue}
                inventoryBrandValue={inventoryBrandValue}
                inventoryBranchValue={inventoryBranchValue}
                handleFavoriteChange={handleFavoriteChange}
                setTriggerType={setTriggerType}
                setTriggerBrand={setTriggerBrand}
                setTriggerBranch={setTriggerBranch}
                setTriggerInventory={setTriggerInventory}
                favorite={favorite}
                trash={{
                  setTriggerTrash,
                  trashData,
                }}
                inventoryBranch={{
                  inventoriesBranchData,
                  inventoriesBranchLoading,
                  handleSearchInventoryBranch,
                }}
                tableController={{
                  userColumn,
                  unUsedColumn,
                  updateTable,
                }}
              />
              <DataTableMarch
                rows={inventoryData?.getInventories?.inventories || []}
                columns={userColumn}
                onRow={onRow}
                onPaginationModelChange={onPaginationModelChange}
                pageCount={inventoryData?.getInventories?.totalPage || 1}
                setPage={setPage}
                page={inventoryPage}
                loading={inventoryLoading}
                limit={inventoryLimit}
                totalRow={inventoryData?.getInventories?.totalRow}
                idNav="navbar-inventory"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContainerInventory

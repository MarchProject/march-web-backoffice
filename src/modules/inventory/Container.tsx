import React from 'react'
import { InventoryManagement } from './view/InventoryManagement'
import DataTableMarch from '@/components/common/Table/table'
import { columns } from './view/column'
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
    handleInventory: { handleTypeChange, handleBrandChange },
    setTriggerType,
    setTriggerBrand,
    favoriteInventoryHandle,
    InventoryNames: { inventoryNamesData, setTriggerGetInventoryNames },
    trash: { setTriggerTrash, trashData },
  } = useInventoryController()
  return (
    <div className="w-full mainBg h-screen" style={{ height: '100%' }}>
      <div className="p-[15px]">
        <div className="bg-white m-0 rounded-lg " style={{ height: '100%' }}>
          <div className="mb-[0px] h-full">
            <div className="p-4">
              <InventoryManagement
                inventorySearch={inventorySearch}
                setSearch={handleChangeInventory}
                handleTypeChange={handleTypeChange}
                handleBrandChange={handleBrandChange}
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
                handleFavoriteChange={handleFavoriteChange}
                setTriggerType={setTriggerType}
                setTriggerBrand={setTriggerBrand}
                setTriggerInventory={setTriggerInventory}
                favorite={favorite}
                trash={{
                  setTriggerTrash,
                  trashData,
                }}
              />
              <DataTableMarch
                rows={inventoryData?.getInventories?.inventories || []}
                columns={columns({ favoriteInventoryHandle })}
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

import React from 'react'
import { InventoryManagement } from './view/InventoryManagement'
import DataTableMarch from '@/components/common/Table/table'
import { columns } from './view/column'
import { useInventoryController } from './controller'

const ContainerInventory = () => {
  const {
    globalState: {
      inventoryPage,
      inventoryLimit,
      onPaginationModelChange,
      onRow,
      handleChangeInventory,
      setPage,
    },
    inventory: { inventoryData, inventoryLoading },
    inventoriesType: { inventoriesTypeData, inventoriesTypeLoading },
    handleInventory: { handleTypeChange },
  } = useInventoryController()

  return (
    <div className="w-full mainBg h-screen" style={{ height: '100%' }}>
      <div className="p-[15px]">
        <div className="bg-white m-0 rounded-lg " style={{ height: '100%' }}>
          <div className="mb-[0px] h-full">
            <div className="p-4">
              <InventoryManagement
                setSearch={handleChangeInventory}
                handleTypeChange={handleTypeChange}
                inventoryType={{ inventoriesTypeData, inventoriesTypeLoading }}
              />
              <DataTableMarch
                rows={inventoryData?.getInventories?.inventories || []}
                columns={columns()}
                onRow={onRow}
                onPaginationModelChange={onPaginationModelChange}
                pageCount={inventoryData?.getInventories?.totalPage || 1}
                setPage={setPage}
                page={inventoryPage}
                loading={inventoryLoading}
                limit={inventoryLimit}
                totalRow={inventoryData?.getInventories?.totalRow}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContainerInventory

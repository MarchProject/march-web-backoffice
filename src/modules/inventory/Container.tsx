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
    inventoryData: { inventoryData, inventoryLoading },
  } = useInventoryController()
  
  return (
    <div className="w-full mainBg">
      <div className="bg-white m-4 rounded-lg">
        <div className="p-4 mb-[30px]">
          <InventoryManagement setSearch={handleChangeInventory} />
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
  )
}

export default ContainerInventory

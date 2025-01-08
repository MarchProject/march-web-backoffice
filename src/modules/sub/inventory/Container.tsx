import TableMarch from '@/components/commonAntd/Table/Table'
import React from 'react'
import { useControllerInventory } from './controllers/controller'
import Search from '@/components/commonAntd/Search/Search'
import { BsBoxSeam } from 'react-icons/bs'
import { styleIconMarch } from '@/utils/style/utill'
import { useTranslation } from 'react-i18next'
import { tkeys } from '@/translations/i18n'
import { Flex } from 'antd'
import DropdownButton from '@/components/commonAntd/Button/DropdownButton'
import Filter from './view/Menu/Filter'
import Transfer from './view/Menu/Transfer'
import Trash from './view/Menu/trash/Trash'
import MainModal from './view/Menu/main/MainModal'

const Container = () => {
  const { t: trans } = useTranslation()
  const {
    table: {
      handleSearchChange,
      userColumn,
      data: {
        inventory: {
          data: inventoryData,
          loading: inventoryLoading,
          totalRow,
          onChangePagination,
        },
      },
    },
    menuProps: {
      menuProps,
      data: {
        inventoriesBranchData,
        inventoriesBrandData,
        inventoriesTypeData,
      },
      loading: {
        inventoriesBranchLoading,
        inventoriesBrandLoading,
        inventoriesTypeLoading,
      },
      filter: {
        onChange: onChangeFilter,
        filterModal: { ...filterModal },
        favorite,
        handleFavoriteChange,
        handleClearChange,
      },
      transfer: { updateTable, mainTableColumns, transferModal },
      trash: {
        trashModal,
        trashData,
        recoveryHardDeletedHandler,
        recoveryHardDeletedLoading,
      },
      branch: {
        branchModal,
        updateBranchHandle,
        upsertInventoryBranchLoading,
        deleteBranchHandle,
        deleteInventoryBranchLoading,
      },
      brand: {
        brandModal,
        upsertInventoryBrandLoading,
        updateBrandHandle,
        deleteBrandHandle,
        deleteInventoryBrandLoading,
      },
      type: {
        typeModal,
        upsertInventoryTypeLoading,
        updateTypeHandle,
        deleteTypeHandle,
        deleteInventoryTypeLoading,
      },
    },
  } = useControllerInventory()

  return (
    <div className="w-full mainBg min-h-[calc(100vh + 10px)] h-auto lg:h-[calc(100vh)]">
      <Filter
        inventoriesBranchData={inventoriesBranchData}
        inventoriesBrandData={inventoriesBrandData}
        inventoriesTypeData={inventoriesTypeData}
        onChange={onChangeFilter}
        modalProps={filterModal}
        favorite={favorite}
        handleFavoriteChange={handleFavoriteChange}
        handleClearChange={handleClearChange}
      />
      <Transfer
        dataSource={mainTableColumns}
        userColumn={userColumn}
        updateTable={updateTable}
        modalProps={transferModal}
      />
      <Trash
        modalProps={trashModal}
        trashData={trashData}
        recoveryHardDeletedHandler={recoveryHardDeletedHandler}
        recoveryHardDeletedLoading={recoveryHardDeletedLoading}
      />
      <MainModal
        mode="branch"
        modalProps={branchModal}
        data={inventoriesBranchData}
        loading={
          inventoriesBranchLoading ||
          upsertInventoryBranchLoading ||
          deleteInventoryBranchLoading
        }
        updateHandle={updateBranchHandle}
        deleteHandle={deleteBranchHandle}
      />
      <MainModal
        mode="brand"
        modalProps={brandModal}
        data={inventoriesBrandData}
        loading={
          inventoriesBrandLoading ||
          upsertInventoryBrandLoading ||
          deleteInventoryBrandLoading
        }
        updateHandle={updateBrandHandle}
        deleteHandle={deleteBrandHandle}
      />
      <MainModal
        mode="type"
        modalProps={typeModal}
        data={inventoriesTypeData}
        loading={
          inventoriesTypeLoading ||
          upsertInventoryTypeLoading ||
          deleteInventoryTypeLoading
        }
        updateHandle={updateTypeHandle}
        deleteHandle={deleteTypeHandle}
      />

      <div className="p-[15px]">
        <div className="bg-white m-0 rounded-lg lg:min-h-[calc(100vh-63px)] min-h-[calc(100vh-56px)]">
          <div className="mb-[0px] h-full">
            <div className="p-4">
              <div className="h-[60px] flex justify-between">
                <div className="flex gap-[15px] my-auto">
                  <BsBoxSeam style={styleIconMarch} />
                  <p className="text-base text-primary font-medium">
                    {trans(tkeys.Inventory.MainPage.HeadText)}
                  </p>
                </div>
                <Flex align="center" gap={10}>
                  <Search
                    loading={inventoryLoading}
                    onSearch={handleSearchChange}
                    inputProps={{
                      placeholder: trans(tkeys.Inventory.MainPage.searchText),
                      size: 'middle',
                    }}
                    style={{ width: 304 }}
                  />
                  <DropdownButton
                    title={trans(tkeys.Inventory.MainPage.filter.label)}
                    type="primary"
                    menu={menuProps}
                    onClick={filterModal.handleOpen}
                  />
                </Flex>
              </div>
              <TableMarch
                data={inventoryData ?? []}
                columns={userColumn}
                onChangePagination={onChangePagination}
                totalRow={totalRow}
                loading={inventoryLoading}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Container

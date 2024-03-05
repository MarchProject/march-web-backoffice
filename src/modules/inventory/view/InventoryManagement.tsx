import { Input } from '@/components/common/Input'
import { IFavoriteStatus } from '@/core/gql/inventory/getInventoriesQuery'
import { styleIconMarch } from '@/utils/style/utill'
import { AutocompleteInputChangeReason, InputAdornment } from '@mui/material'
import { debounce } from 'lodash'
import React, { useRef, useState } from 'react'
import { BsBoxSeam } from 'react-icons/bs'
import { RiSearchLine } from 'react-icons/ri'
import {
  InventoryBranch,
  InventoryBrand,
  InventoryNamesClass,
  InventoryTrash,
  InventoryType,
} from '@/core/model/inventory'
import { BiCaretDown } from 'react-icons/bi'
import ButtonForm from '@/components/common/Button/button'
import { AutocompleteSelectAsync } from '@/components/common/Autocomplete/AutocompleteSelect'
import { DialogM } from '@/components/common/Dialog/DialogM'
import { ButtonMenu } from './ButtonMenu'
import { FcLike, FcLikePlaceholder } from 'react-icons/fc'
import { useLoadingContext } from '@/context/loading'
import { max } from '@/utils/common/normalizeInput'
import { useTranslation } from 'react-i18next'
import { tkeys } from '@/translations/i18n'
import SelectAllTransferList from '@/components/common/Transferlist/TransferList'
import { GridColDef } from '@mui/x-data-grid'

type InventoryManagementProps = {
  setSearch: (value: string) => void
  handleClearChange: () => void
  inventorySearch: string
  inventoryBrandValue: InventoryBrand[]
  inventoryBranchValue: InventoryBranch[]
  inventoryTypeValue: InventoryType[]
  handleTypeChange: (event, value, reason) => void
  handleBrandChange: (event, value, reason) => void
  handleBranchChange: (event, value, reason) => void
  inventoryType: {
    setInventoryType?: (value: string) => void
    inventoriesTypeData: InventoryType[]
    inventoriesTypeLoading: boolean
    handleSearchInventoryType: (
      event: React.SyntheticEvent,
      value: string,
      reason: AutocompleteInputChangeReason,
    ) => void
  }
  inventoryBrand: {
    setInventoryBrand?: (value: string) => void
    inventoriesBrandData: InventoryBrand[]
    inventoriesBrandLoading: boolean
    handleSearchInventoryBrand: (
      event: React.SyntheticEvent,
      value: string,
      reason: AutocompleteInputChangeReason,
    ) => void
  }
  inventoryBranch: {
    setInventoryBranch?: (value: string) => void
    inventoriesBranchData: InventoryBrand[]
    inventoriesBranchLoading: boolean
    handleSearchInventoryBranch: (
      event: React.SyntheticEvent,
      value: string,
      reason: AutocompleteInputChangeReason,
    ) => void
  }
  setTriggerType: (value: boolean) => void
  setTriggerGetInventoryNames: (value: boolean) => void
  setTriggerBrand: (value: boolean) => void
  setTriggerBranch: (value: boolean) => void
  setTriggerInventory: (value: boolean) => void
  handleFavoriteChange: () => void
  favorite: IFavoriteStatus
  inventoryNamesData: InventoryNamesClass[]
  trash: {
    trashData: InventoryTrash
    setTriggerTrash: (value: boolean) => void
  }
  tableController: {
    userColumn: GridColDef[]
    unUsedColumn: GridColDef[]
    updateTable: (selected: GridColDef[], unSelected: GridColDef[]) => void
  }
}

export const InventoryManagement = ({
  setSearch,
  inventoryBrandValue,
  inventoryBranchValue,
  inventoryTypeValue,
  handleTypeChange,
  handleClearChange,
  handleBrandChange,
  handleBranchChange,
  setTriggerGetInventoryNames,
  inventoryType: {
    inventoriesTypeData,
    inventoriesTypeLoading,
    handleSearchInventoryType,
  },
  inventoryBrand: {
    inventoriesBrandData,
    inventoriesBrandLoading,
    handleSearchInventoryBrand,
  },
  inventoryBranch: {
    inventoriesBranchData,
    inventoriesBranchLoading,
    handleSearchInventoryBranch,
  },
  setTriggerType,
  setTriggerBrand,
  setTriggerBranch,
  setTriggerInventory,
  handleFavoriteChange,
  favorite,
  inventoryNamesData,
  trash: { trashData, setTriggerTrash },
  tableController: { userColumn, unUsedColumn, updateTable },
}: InventoryManagementProps) => {
  const searchFieldRef = useRef(null)
  const typeFieldRef = useRef(null)
  const brandFieldRef = useRef(null)
  const branchFieldRef = useRef(null)
  const { zIndexLoading } = useLoadingContext()
  const handleReset = () => {
    handleClearChange()
    searchFieldRef.current.value = ''
    typeFieldRef.current.value = ''
    brandFieldRef.current.value = ''
  }
  const { t: trans }: any = useTranslation()
  const [open, setOpen] = useState(false)
  const [openTableSort, setOpenTableSort] = useState(false)

  const handleClickOpen = () => {
    zIndexLoading(20)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    zIndexLoading(9999)
  }

  const handleClickOpenTableSort = () => {
    zIndexLoading(20)
    setOpenTableSort(true)
  }

  const handleCloseTableSort = () => {
    setOpenTableSort(false)
    zIndexLoading(9999)
  }

  return (
    <>
      <DialogM
        maxWidth="sm"
        dialogTitle={trans(tkeys.Inventory.MainPage.filter.label)}
        open={openTableSort}
        handleClose={handleCloseTableSort}
        contentRender={() => {
          return (
            <>
              <SelectAllTransferList
                selected={userColumn}
                unselected={unUsedColumn}
                updateTable={updateTable}
              />
            </>
          )
        }}
        actionRender={() => {
          return <></>
        }}
      />
      <DialogM
        dialogTitle={trans(tkeys.Inventory.MainPage.filter.label)}
        open={open}
        handleClose={handleClose}
        contentRender={() => {
          return (
            <div className="mx-auto w-full pb-[20px]">
              <div className="px-5">
                <AutocompleteSelectAsync
                  inputRef={brandFieldRef}
                  value={inventoryBrandValue}
                  classNames="mx-auto"
                  id="brandFilter"
                  labelIndex="name"
                  valueIndex={'id'}
                  multiple={true}
                  options={inventoriesBrandData}
                  InputProps={{
                    label: trans(tkeys.Inventory.MainPage.filter.brand),
                    placeholder: trans(tkeys.Inventory.MainPage.filter.brand),
                  }}
                  onChange={handleBrandChange}
                  loading={inventoriesBrandLoading}
                  onInputChange={handleSearchInventoryBrand}
                />
                <AutocompleteSelectAsync
                  inputRef={branchFieldRef}
                  value={inventoryBranchValue}
                  classNames="mx-auto mt-[10px]"
                  id="branchFilter"
                  labelIndex="name"
                  valueIndex={'id'}
                  multiple={true}
                  options={inventoriesBranchData}
                  InputProps={{
                    label: trans(tkeys.Inventory.MainPage.filter.branch),
                    placeholder: trans(tkeys.Inventory.MainPage.filter.branch),
                  }}
                  onChange={handleBranchChange}
                  loading={inventoriesBranchLoading}
                  onInputChange={handleSearchInventoryBranch}
                />
                <AutocompleteSelectAsync
                  inputRef={typeFieldRef}
                  id="typeFilter"
                  classNames="mx-auto mt-[10px]"
                  labelIndex="name"
                  valueIndex={'id'}
                  multiple={true}
                  options={inventoriesTypeData}
                  InputProps={{
                    label: trans(tkeys.Inventory.MainPage.filter.type),
                    placeholder: trans(tkeys.Inventory.MainPage.filter.type),
                  }}
                  value={inventoryTypeValue}
                  onChange={handleTypeChange}
                  loading={inventoriesTypeLoading}
                  onInputChange={handleSearchInventoryType}
                />
                <div className="  mt-[20px]">
                  <div className="flex gap-[10px] justify-start max-w-[380px]">
                    <ButtonForm
                      classNames="!w-[150px] !h-[40px] !normal-case"
                      label={trans(tkeys.button.favorite)}
                      variant="outlined"
                      color="error"
                      endIcon={
                        favorite === 'DEFAULT' ? (
                          <FcLikePlaceholder
                            className="cursor-pointer text-secondary my-auto"
                            size={18}
                          />
                        ) : (
                          <FcLike
                            className="cursor-pointer text-secondary my-auto"
                            size={18}
                          />
                        )
                      }
                      onClick={() => {
                        handleFavoriteChange()
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )
        }}
        actionRender={() => {
          return (
            <div className="pr-[12px] flex gap-2">
              <ButtonForm
                classNames="!w-[80px] !h-[40px] !w-[100%] !normal-case"
                label={trans(tkeys.button.clear)}
                color={'primary'}
                variant="outlined"
                onClick={handleReset}
              />
              <ButtonForm
                classNames="!w-[80px] !h-[40px] !w-[100%] !normal-case"
                label={trans(tkeys.button.close)}
                color={'primary'}
                variant="contained"
                onClick={handleClose}
              />
            </div>
          )
        }}
      />

      <div
        id="navbar-inventory"
        className="grid grid-cols-1 lg:grid-cols-3 w-[100%] pb-[15px]">
        <div className="flex gap-[15px] my-auto">
          <BsBoxSeam style={styleIconMarch} />
          <p className="text-base text-primary font-medium">
            {trans(tkeys.Inventory.MainPage.HeadText)}
          </p>
        </div>
        <div className="my-auto grid lg:grid-cols-1 gap-[15px] lg:col-span-2">
          {/* <div className="lg:masx-w-[220px] my-auto lg:ml-auto w-full lg:col-span-6"></div> */}
          <div className="flex justify-end gap-[15px] items-center ">
            <div className="flex items-center col-span-3">
              <Input
                inputRef={searchFieldRef}
                classNames="lg:!max-w-[220px] !w-[100%] !ml-auto !my-auto "
                id="searchItems"
                variant="outlined"
                placeholder={trans(tkeys.Inventory.MainPage.searchText)}
                inputLabel={{
                  classNames: '!w-full !my-auto',
                  label: '',
                  required: false,
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <RiSearchLine size={12} className="lg:!hidden block" />
                      <RiSearchLine className="lg:!block hidden" />
                    </InputAdornment>
                  ),
                }}
                onChange={debounce(setSearch, 1000)}
                type={'text'}
                name="searchItems"
                size="small"
                normalizes={[max(60)]}
              />
            </div>

            <ButtonForm
              classNames="lg:!w-[120px] !w-[60px] !h-[40px] !normal-case"
              label={trans(tkeys.button.filter)}
              color={'primary'}
              endIcon={<BiCaretDown size={15} />}
              onClick={handleClickOpen}
            />
            <ButtonMenu
              setTriggerType={setTriggerType}
              inventoriesTypeData={inventoriesTypeData}
              setTriggerBrand={setTriggerBrand}
              setTriggerInventory={setTriggerInventory}
              inventoriesBrandData={inventoriesBrandData}
              inventoryNamesData={inventoryNamesData}
              setTriggerGetInventoryNames={setTriggerGetInventoryNames}
              handleSearchInventoryType={handleSearchInventoryType}
              handleSearchInventoryBrand={handleSearchInventoryBrand}
              trashData={trashData}
              setTriggerTrash={setTriggerTrash}
              inventoriesBranchData={inventoriesBranchData}
              handleSearchInventoryBranch={handleSearchInventoryBranch}
              setTriggerBranch={setTriggerBranch}
            />
          </div>
        </div>
      </div>
    </>
  )
}

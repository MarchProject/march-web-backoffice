import ButtonForm from '@/components/common/Button/button'
import { inventoryCreateRoute } from '@/router/inventory'
import { Menu, MenuItem } from '@mui/material'
import router from 'next/router'
import React, { useState } from 'react'
import { RiAddLine } from 'react-icons/ri'
import DialogEditor from '../dialog/DialogEditor/DialogEditor'

export const ButtonMenu = ({
  inventoriesTypeData,
  setTriggerType,
  setTriggerBrand,
  inventoriesBrandData,
  inventoryNamesData,
  setTriggerGetInventoryNames,
  handleSearchInventoryType,
  handleSearchInventoryBrand,
  setTriggerInventory,
  trashData,
  setTriggerTrash,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <ButtonForm
        classNames="!w-[150px] !h-[40px] !normal-case"
        label={'Item'}
        color={'primary'}
        endIcon={<RiAddLine size={15} />}
        onClick={handleClick as any}
      />
      <Menu
        id="product-menu"
        style={{ marginRight: 10 }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}>
        <MenuItem
          className=" !mx-3 hover:!bg-gray-200 !rounded"
          onClick={() => {
            handleClose()
            router.push({ pathname: inventoryCreateRoute.path })
          }}>
          Add Item
        </MenuItem>
        <DialogEditor
          setTriggerType={setTriggerType}
          inventoriesTypeData={inventoriesTypeData}
          setTriggerInventory={setTriggerInventory}
          setTriggerBrand={setTriggerBrand}
          inventoriesBrandData={inventoriesBrandData}
          inventoryNamesData={inventoryNamesData}
          setTriggerGetInventoryNames={setTriggerGetInventoryNames}
          handleSearchInventoryType={handleSearchInventoryType}
          handleSearchInventoryBrand={handleSearchInventoryBrand}
          trashData={trashData}
          setTriggerTrash={setTriggerTrash}
        />
      </Menu>
    </>
  )
}

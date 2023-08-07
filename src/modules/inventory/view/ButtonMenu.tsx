import ButtonForm from '@/components/common/Button/button'
import { inventoryCreateRoute } from '@/router/inventory'
import { Menu, MenuItem } from '@mui/material'
import router from 'next/router'
import React, { useState } from 'react'
import { RiAddLine } from 'react-icons/ri'
import DialogEditor from '../dialog/DialogEditor/DialogEditor'
import { useTranslation } from 'react-i18next'
import { tkeys } from '@/translations/i18n'

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
  const { t: trans }: any = useTranslation()
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
        label={trans(tkeys.button.menu)}
        color={'primary'}
        endIcon={<RiAddLine size={15} />}
        onClick={handleClick as any}
      />
      <Menu
        id="product-menu"
        sx={{
          '& .MuiMenu-paper': {
            borderRadius: '16px',
            marginTop: '5px',
            marginLeft: '3px',
          },
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}>
        <MenuItem
          className="!mx-3 hover:!bg-violet-400 hover:!text-white !rounded-xl !mt-[3px]"
          onClick={() => {
            handleClose()
            router.push({ pathname: inventoryCreateRoute.path })
          }}>
          {trans(tkeys.Inventory.MainPage.menu.addItem)}
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

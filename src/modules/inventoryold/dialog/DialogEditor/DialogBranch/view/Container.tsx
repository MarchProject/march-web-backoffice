import { Tab, Tabs } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { BranchObjView } from './BranchView'
import { InventoryBranch } from '@/core/model/inventory'
import { BranchObjUpdate } from './BranchUpdate'
import { BranchObjCreate } from './BranchCreate'
import { useTranslation } from 'react-i18next'
import { tkeys } from '@/translations/i18n'

const typeTab = [
  { key: 'view', Label: 'View', secondaryLabel: 'Update' },
  { key: 'create', Label: 'Create', secondaryLabel: 'Create' },
  { key: 'update', Label: 'Update', secondaryLabel: 'Create' },
]

interface IBranchViewMain {
  inventoriesBranchData: InventoryBranch[]
  deleteBranchHandle: (id: string) => void
  updateBranchHandle: (data: any) => void
  setIsEdit: (data: boolean) => void
  handleClose: () => void
  isEditPage: boolean
}

export const BranchViewMain = ({
  inventoriesBranchData,
  deleteBranchHandle,
  updateBranchHandle,
  setIsEdit,
  isEditPage,
  handleClose,
}: IBranchViewMain) => {
  const { t: trans }: any = useTranslation()
  const keys = tkeys.Inventory.MainPage.dialog.branch
  const [value, setValue] = useState('view')
  const [idBranch, setIdBranch] = useState('')
  const [inventoryBranchData, setInventoryBranchData] =
    useState<InventoryBranch>(null)

  useEffect(() => {
    if (idBranch) {
      setInventoryBranchData(
        inventoriesBranchData.find((e) => e.id === idBranch),
      )
    }
  }, [idBranch, inventoriesBranchData])

  useEffect(() => {
    if (isEditPage) {
      setValue('create')
    }
  }, [isEditPage])

  useEffect(() => {
    if (value !== 'view') {
      setIsEdit(true)
    } else {
      setIsEdit(false)
    }
  }, [setIsEdit, value])

  // useEffect(() => {
  //   if (value === 'view' || value === 'create') {
  //     setInventoryTypeData(null)
  //   }
  // }, [value])

  const TabBranch = (typeTab, value) => {
    const Tabs = typeTab.map((n) => {
      const labelMode = n.Label.toString().toLowerCase()
      return (
        <Tab
          key={n.key}
          label={trans(keys.mode[labelMode].label)}
          style={{ borderRadius: '5px', zIndex: 2, fontWeight: 600 }}
          onClick={() => {
            setValue(n.key)
          }}
          disabled={
            !isEditPage
              ? n.key === 'update' && value !== 'update'
              : n.key !== 'create'
          }
          value={n.key}
        />
      )
    })
    return Tabs
  }

  const ModeBranch = (value, inventoriesBranchData, setValue) => {
    switch (value) {
      case 'view': {
        return (
          <BranchObjView
            inventoriesBranchData={inventoriesBranchData}
            setValue={setValue}
            deleteBranchHandle={deleteBranchHandle}
            setIdBranch={setIdBranch}
          />
        )
      }
      case 'create': {
        return (
          <BranchObjCreate
            updateBranchHandle={updateBranchHandle}
            setValueMode={setValue}
            isEditPage={isEditPage}
            handleClose={handleClose}
          />
        )
      }
      case 'update': {
        return (
          <BranchObjUpdate
            inventoryBranchData={inventoryBranchData}
            updateBranchHandle={updateBranchHandle}
            setValueMode={setValue}
          />
        )
      }
      default: {
        return null
      }
    }
  }

  return (
    <div className="px-[20px] mt-[10px]">
      <Tabs
        className="bg-gray-100 rounded-xl p-[5px] gap-[10px]"
        value={value}
        variant="fullWidth"
        TabIndicatorProps={{
          style: {
            backgroundColor: 'white',
            height: '100%',
            zIndex: 1,
            borderRadius: '12px',
          },
        }}>
        {TabBranch(typeTab, value)}
      </Tabs>
      {ModeBranch(value, inventoriesBranchData, setValue)}
    </div>
  )
}

import { Tab, Tabs } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { BrandObjView } from './BrandView'
import { InventoryBrand } from '@/core/model/inventory'
import { BrandObjUpdate } from './BrandUpdate'
import { BrandObjCreate } from './BrandCreate'
import { useTranslation } from 'react-i18next'
import { tkeys } from '@/translations/i18n'

const typeTab = [
  { key: 'view', Label: 'View', secondaryLabel: 'Update' },
  { key: 'create', Label: 'Create', secondaryLabel: 'Create' },
  { key: 'update', Label: 'Update', secondaryLabel: 'Create' },
]

interface IBrandViewMain {
  inventoriesBrandData: InventoryBrand[]
  deleteBrandHandle: (id: string) => void
  updateBrandHandle: (data: any) => void
  setIsEdit: (data: boolean) => void
  handleClose: () => void
  isEditPage: boolean
}

export const BrandViewMain = ({
  inventoriesBrandData,
  deleteBrandHandle,
  updateBrandHandle,
  setIsEdit,
  isEditPage,
  handleClose,
}: IBrandViewMain) => {
  const { t: trans }: any = useTranslation()
  const keys = tkeys.Inventory.MainPage.dialog.brand
  const [value, setValue] = useState('view')
  const [idBrand, setIdBrand] = useState('')
  const [inventoryBrandData, setInventoryBrandData] =
    useState<InventoryBrand>(null)

  useEffect(() => {
    if (idBrand) {
      setInventoryBrandData(inventoriesBrandData.find((e) => e.id === idBrand))
    }
  }, [idBrand, inventoriesBrandData])

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

  const TabBrand = (typeTab, value) => {
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

  const ModeBrand = (value, inventoriesBrandData, setValue) => {
    switch (value) {
      case 'view': {
        return (
          <BrandObjView
            inventoriesBrandData={inventoriesBrandData}
            setValue={setValue}
            deleteBrandHandle={deleteBrandHandle}
            setIdBrand={setIdBrand}
          />
        )
      }
      case 'create': {
        return (
          <BrandObjCreate
            updateBrandHandle={updateBrandHandle}
            setValueMode={setValue}
            isEditPage={isEditPage}
            handleClose={handleClose}
          />
        )
      }
      case 'update': {
        return (
          <BrandObjUpdate
            inventoryBrandData={inventoryBrandData}
            updateBrandHandle={updateBrandHandle}
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
        {TabBrand(typeTab, value)}
      </Tabs>
      {ModeBrand(value, inventoriesBrandData, setValue)}
    </div>
  )
}

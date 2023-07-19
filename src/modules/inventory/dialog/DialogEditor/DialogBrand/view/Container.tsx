import { Tab, Tabs } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { BrandObjView } from './BrandView'
import { BrandType } from '@/core/model/inventory'
import { BrandObjUpdate } from './BrandUpdate'
import { BrandObjCreate } from './BrandCreate'

const typeTab = [
  { key: 'view', Label: 'View', secondaryLabel: 'Update' },
  { key: 'create', Label: 'Create', secondaryLabel: 'Create' },
  { key: 'update', Label: 'Update', secondaryLabel: 'Create' },
]

interface IBrandViewMain {
  inventoriesBrandData: BrandType[]
  deleteBrandHandle: (id: string) => void
  updateBrandHandle: (data: any) => void
}

export const BrandViewMain = ({
  inventoriesBrandData,
  deleteBrandHandle,
  updateBrandHandle,
}: IBrandViewMain) => {
  const [value, setValue] = useState('view')
  const [idBrand, setIdBrand] = useState('')
  const [inventoryBrandData, setInventoryBrandData] = useState<BrandType>(null)

  useEffect(() => {
    if (idBrand) {
      setInventoryBrandData(inventoriesBrandData.find((e) => e.id === idBrand))
    }
  }, [idBrand, inventoriesBrandData])

  // useEffect(() => {
  //   if (value === 'view' || value === 'create') {
  //     setInventoryTypeData(null)
  //   }
  // }, [value])

  const TabBrand = (typeTab, value) => {
    const Tabs = typeTab.map((n) => {
      return (
        <Tab
          key={n.key}
          label={n.Label}
          style={{ borderRadius: '5px', zIndex: 2, fontWeight: 600 }}
          onClick={() => {
            setValue(n.key)
          }}
          disabled={n.key === 'update' && value !== 'update'}
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
    <div className="px-[24px] mt-[10px]">
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

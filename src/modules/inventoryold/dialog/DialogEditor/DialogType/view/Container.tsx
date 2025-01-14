import { Tab, Tabs } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { TypeObjView } from './TypeView'
import { InventoryType } from '@/core/model/inventory'
import { TypeObjUpdate } from './TypeUpdate'
import { TypeObjCreate } from './TypeCreate'
import { useTranslation } from 'react-i18next'
import { tkeys } from '@/translations/i18n'

const typeTab = [
  { key: 'view', Label: 'View', secondaryLabel: 'Update' },
  { key: 'create', Label: 'Create', secondaryLabel: 'Create' },
  { key: 'update', Label: 'Update', secondaryLabel: 'Create' },
]

interface ITypeViewMain {
  inventoriesTypeData: InventoryType[]
  deleteTypeHandle: (id: string) => void
  handleClose: () => void
  updateTypeHandle: (data: any) => void
  setIsEdit: (data: boolean) => void
  isEditPage: boolean
}

export const TypeViewMain = ({
  handleClose,
  inventoriesTypeData,
  deleteTypeHandle,
  updateTypeHandle,
  setIsEdit,
  isEditPage,
}: ITypeViewMain) => {
  const { t: trans }: any = useTranslation()
  const keys = tkeys.Inventory.MainPage.dialog.type
  const [value, setValue] = useState('view')
  const [idType, setIdType] = useState('')
  const [inventoryTypeData, setInventoryTypeData] =
    useState<InventoryType>(null)

  useEffect(() => {
    if (isEditPage) {
      setValue('create')
    }
  }, [isEditPage])

  useEffect(() => {
    if (idType) {
      setInventoryTypeData(inventoriesTypeData.find((e) => e.id === idType))
    }
  }, [idType, inventoriesTypeData])

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

  const TabType = (typeTab, value, isEditPage) => {
    const Tabs = typeTab.map((n) => {
      const labelMode = n.Label.toString().toLowerCase()
      return (
        <Tab
          key={n.key}
          label={trans(keys.mode[labelMode].label)}
          // label={n.Label}
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

  const ModeType = (value, inventoriesTypeData, setValue) => {
    switch (value) {
      case 'view': {
        return (
          <TypeObjView
            inventoriesTypeData={inventoriesTypeData}
            setValue={setValue}
            deleteTypeHandle={deleteTypeHandle}
            setIdType={setIdType}
          />
        )
      }
      case 'create': {
        return (
          <TypeObjCreate
            isEditPage={isEditPage}
            updateTypeHandle={updateTypeHandle}
            setValueMode={setValue}
            handleClose={handleClose}
          />
        )
      }
      case 'update': {
        return (
          <TypeObjUpdate
            inventoryTypeData={inventoryTypeData}
            updateTypeHandle={updateTypeHandle}
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
        {TabType(typeTab, value, isEditPage)}
      </Tabs>
      {ModeType(value, inventoriesTypeData, setValue)}
    </div>
  )
}

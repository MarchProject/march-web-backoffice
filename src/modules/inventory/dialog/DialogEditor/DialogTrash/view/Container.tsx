import {
  EnumDeletedMode,
  EnumDeletedType,
} from '@/core/gql/inventory/inventoryTrash'
import { InventoryTrash, TrashInventory } from '@/core/model/inventory'
import { tkeys } from '@/translations/i18n'
import { styleIconMarch } from '@/utils/style/utill'
import { Tab, Tabs } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BsFillBoxSeamFill, BsTrash } from 'react-icons/bs'
import { HiOutlineWallet } from 'react-icons/hi2'
interface ITrash {
  trashData: InventoryTrash
  recoveryHardDeletedHandle: (
    id: string,
    type: EnumDeletedType,
    mode: EnumDeletedMode,
  ) => void
}

const nameTab = [
  { key: 'inventory', Label: 'Inventory', type: EnumDeletedType.inventory },
  { key: 'type', Label: 'Type', type: EnumDeletedType.inventoryType },
  { key: 'brand', Label: 'Brand', type: EnumDeletedType.brandType },
]

export const Trash = ({ trashData, recoveryHardDeletedHandle }: ITrash) => {
  const [value, setValue] = useState('inventory')
  const [type, setType] = useState<EnumDeletedType>(EnumDeletedType.inventory)
  const [trashObjs, setTrashObjs] = useState<TrashInventory[]>(null)

  useEffect(() => {
    if (trashData) setTrashObjs(trashData[value])
  }, [trashData, value])

  const TrashOBJView = (
    trashObjs: TrashInventory[],
    recoveryHardDeletedHandle: (
      id: string,
      type: EnumDeletedType,
      mode: EnumDeletedMode,
    ) => void,
    type: EnumDeletedType,
  ) => {
    const { t: trans }: any = useTranslation()
    const keys = tkeys.Inventory.MainPage.dialog.trash
    const trashObj = trashObjs?.map((t) => {
      return (
        <div className="flex justify-between mt-[10px]" key={t.key}>
          <div className="flex gap-[15px]">
            {type === EnumDeletedType.inventory ? (
              <BsFillBoxSeamFill
                style={{ ...styleIconMarch, fontSize: '40px' }}
              />
            ) : type === EnumDeletedType.inventoryType ? (
              <HiOutlineWallet
                style={{ ...styleIconMarch, fontSize: '40px' }}
              />
            ) : (
              <HiOutlineWallet
                style={{ ...styleIconMarch, fontSize: '40px' }}
              />
            )}

            <div>
              <div className="text-primary text-lg font-semibold">
                {t._name}
              </div>
              <div className="text-secondary text-base ">
                {trans(keys.header.by)} {t.updatedBy} {trans(keys.header.on)}{' '}
                {t.formattedUpdatedAt}
              </div>
            </div>
          </div>
          <div className="flex justify-between text-center w-[150px] items-center">
            <div
              className="hover:bg-emerald-600 bg-emerald-400 p-[8px] cursor-pointer rounded-xl min-w-[40px]"
              onClick={() => {
                recoveryHardDeletedHandle(t.id, type, EnumDeletedMode.RECOVERY)
              }}>
              <p className="m-0 text-white">{trans(tkeys.button.restore)}</p>
            </div>
            <div
              className="hover:bg-rose-600 bg-rose-400 p-[8px] cursor-pointer rounded-xl min-w-[60px]"
              onClick={() => {
                recoveryHardDeletedHandle(t.id, type, EnumDeletedMode.DELETE)
              }}>
              <p className="m-0 text-white">{trans(tkeys.button.delete)}</p>
            </div>
          </div>
        </div>
      )
    })
    if (trashObjs?.length > 0) {
      return (
        <div className="mt-[10px] h-[350px] overflow-y-auto">{trashObj}</div>
      )
    }
    return (
      <div className="mt-[10px] h-[350px] overflow-y-auto">
        <div className="flex items-center justify-center h-full">
          <div>
            <div className="w-full text-center">
              <BsTrash style={{ ...styleIconMarch, fontSize: '40px' }} />
              <p className="m-0 mt-[5px] text-secondary">
                {trans(tkeys.button.empty)}
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const TabTrash = (nameTab) => {
    const Tabs = nameTab.map((n) => {
      return (
        <Tab
          key={n.key}
          label={n.Label}
          style={{ borderRadius: '5px', zIndex: 2, fontWeight: 600 }}
          onClick={() => {
            setValue(n.key)
            setType(n.type)
          }}
          value={n.key}
        />
      )
    })
    return Tabs
  }

  return (
    <div className="px-[24px] mt-[10px]">
      <Tabs
        className="bg-gray-100 rounded-xl p-[5px] gap-[10px]"
        value={value}
        variant="fullWidth"
        // style={{backgroundColor: "#0f0"}}
        TabIndicatorProps={{
          style: {
            backgroundColor: 'white',
            height: '100%',
            zIndex: 1,
            borderRadius: '12px',
          },
        }}>
        {TabTrash(nameTab)}
      </Tabs>
      {TrashOBJView(trashObjs, recoveryHardDeletedHandle, type)}
    </div>
  )
}

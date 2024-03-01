import {
  EnumDeletedMode,
  EnumDeletedType,
} from '@/core/gql/inventory/recoveryHardDeletedMutation'
import { InventoryTrash, TrashInventory } from '@/core/model/inventory'
import { tkeys } from '@/translations/i18n'
import { styleIconMarch } from '@/utils/style/utill'
import { Tab, Tabs } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BsFillBoxSeamFill, BsTrash } from 'react-icons/bs'
import { HiOutlineWallet } from 'react-icons/hi2'
import { MdDeleteForever, MdRestore } from 'react-icons/md'
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
  { key: 'brand', Label: 'Brand', type: EnumDeletedType.inventoryBrand },
  { key: 'branch', Label: 'Branch', type: EnumDeletedType.inventoryBranch },
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
        <div className="mt-[10px] grid grid-cols-6" key={t.key}>
          <div className="flex gap-[15px] col-span-5 lg:col-span-5">
            {type === EnumDeletedType.inventory ? (
              <BsFillBoxSeamFill
                className="lg:!block !hidden"
                style={{ ...styleIconMarch, fontSize: '40px' }}
              />
            ) : type === EnumDeletedType.inventoryType ? (
              <HiOutlineWallet
                className="lg:!block !hidden"
                style={{ ...styleIconMarch, fontSize: '40px' }}
              />
            ) : (
              <HiOutlineWallet
                className="lg:!block !hidden"
                style={{ ...styleIconMarch, fontSize: '40px' }}
              />
            )}

            <div>
              <div className="text-primary text-lg font-semibold">
                {t._name}
              </div>
              <div className="text-secondary text-base lg:block hidden">
                {trans(keys.header.by)} {t.updatedBy} {trans(keys.header.on)}{' '}
                {t.formattedUpdatedAt}
              </div>
              <div className="text-secondary text-base lg:hidden block">
                <p className="m-0">
                  {trans(keys.header.by)} {t.updatedBy}
                </p>
                <p className="m-0">{t.formattedUpdatedAt}</p>
              </div>
            </div>
          </div>
          <div className="flex justify-between text-center items-center gap-[10px]">
            <div className="lg flex gap-[10px] justify-end ml-auto pr-[10px]">
              <MdRestore
                onClick={() => {
                  recoveryHardDeletedHandle(
                    t.id,
                    type,
                    EnumDeletedMode.RECOVERY,
                  )
                }}
                className="cursor-pointer text-primary200"
                size={20}
              />
              <MdDeleteForever
                onClick={() => {
                  recoveryHardDeletedHandle(t.id, type, EnumDeletedMode.DELETE)
                }}
                className="cursor-pointer text-primary200"
                size={20}
              />
            </div>
          </div>
        </div>
      )
    })
    if (trashObjs?.length > 0) {
      return <div className="mt-[10px] min-h-[350px] max-h-[350px]">{trashObj}</div>
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

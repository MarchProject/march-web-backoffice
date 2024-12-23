import {
  GetInventoryAllDeletedType,
  IDeletedInventory,
} from '@/core/gql/inventory/getInventoryAllDeletedQuery'
import {
  EnumDeletedMode,
  EnumDeletedType,
} from '@/core/gql/inventory/recoveryHardDeletedMutation'
import { tkeys } from '@/translations/i18n'
import { TableColumnsType } from 'antd'
import { useTranslation } from 'react-i18next'
import { MdDeleteForever, MdRestore } from 'react-icons/md'

type UseTrashControllerPropsType = {
  data: GetInventoryAllDeletedType
  recoveryHardDeletedHandler: (
    id: string,
    type: EnumDeletedType,
    mode: EnumDeletedMode,
  ) => void
}

type ColumnsTrash = {
  id: string
  name: string
  type: string
  typeApi: EnumDeletedType
}

export const useTrashController = ({
  data,
  recoveryHardDeletedHandler,
}: UseTrashControllerPropsType) => {
  const { t: trans } = useTranslation()

  const text = {
    inventory: trans(tkeys.Inventory.MainPage.editor.type.inventory.label),
    type: trans(tkeys.Inventory.MainPage.dialog.type.header.lable),
    brand: trans(tkeys.Inventory.MainPage.dialog.brand.header.lable),
    branch: trans(tkeys.Inventory.MainPage.dialog.branch.header.lable),
  }
  const columns: TableColumnsType<ColumnsTrash> = [
    {
      title: trans(tkeys.common.name),
      dataIndex: 'name',
      showSorterTooltip: { target: 'full-header' },
    },
    {
      title: trans(tkeys.common.type),
      dataIndex: 'type',
      defaultSortOrder: 'descend',
      width: 120,
      align: 'center',
      filters: [
        {
          text: text.inventory,
          value: text.inventory,
        },
        {
          text: text.type,
          value: text.type,
        },
        {
          text: text.brand,
          value: text.brand,
        },
        {
          text: text.branch,
          value: text.branch,
        },
      ],
      onFilter: (value, record) => record.type.indexOf(value as string) === 0,
    },
    {
      title: trans(tkeys.common.action),
      dataIndex: 'type',
      width: 50,
      render: (_value, record) => {
        return (
          <div className="flex gap-[15px] justify-between">
            <MdRestore
              onClick={() => {
                recoveryHardDeletedHandler(
                  record.id,
                  record.typeApi,
                  EnumDeletedMode.RECOVERY,
                )
              }}
              className="cursor-pointer text-primary200"
              size={20}
            />
            <MdDeleteForever
              onClick={() => {
                recoveryHardDeletedHandler(
                  record.id,
                  record.typeApi,
                  EnumDeletedMode.DELETE,
                )
              }}
              className="cursor-pointer text-primary200"
              size={20}
            />
          </div>
        )
      },
    },
  ]

  const trashData: ColumnsTrash[] = []

  const pushToTrashData = (
    items: IDeletedInventory[],
    type: string,
    typeApi: EnumDeletedType,
  ) => {
    items?.forEach((e) => {
      trashData.push({
        id: e.id,
        name: e.name,
        type,
        typeApi,
      })
    })
  }

  pushToTrashData(data?.inventory, text.inventory, EnumDeletedType.inventory)
  pushToTrashData(data?.type, text.type, EnumDeletedType.inventoryType)
  pushToTrashData(data?.brand, text.brand, EnumDeletedType.inventoryBrand)
  pushToTrashData(data?.branch, text.branch, EnumDeletedType.inventoryBranch)

  return {
    columns,
    data: trashData,
  }
}

import { InventoryType } from '@/core/model/inventory'
import { tkeys } from '@/translations/i18n'
import { styleIconMarch } from '@/utils/style/utill'
import { useTranslation } from 'react-i18next'
import { BsTrash } from 'react-icons/bs'
import { HiOutlineWallet } from 'react-icons/hi2'

interface ITypeObjView {
  inventoriesTypeData: InventoryType[]
  setValue: (value: string) => void
  setIdType: (value: string) => void
  deleteTypeHandle: (id: string) => void
}

export const TypeObjView = ({
  inventoriesTypeData,
  setValue,
  deleteTypeHandle,
  setIdType,
}: ITypeObjView) => {
  const { t: trans }: any = useTranslation()
  const keys = tkeys.Inventory.MainPage.dialog.type.mode.view

  const TypeObj = inventoriesTypeData?.map((t) => {
    return (
      <div
        key={t.id}
        className="mt-[10px] flex justify-between overflow-y-auto">
        <div className="flex gap-[15px]">
          <HiOutlineWallet style={{ ...styleIconMarch, fontSize: '40px' }} />
          <div>
            <div className="flex gap-[15px]">
              <div className="text-primary text-lg font-semibold">
                {t._name}
              </div>
              <p className="m-0 w-[200px] my-auto truncate text-secondary text-sm">
                {t.description}
              </p>
            </div>
            <div className="text-secondary text-base ">
              {trans(keys.field.createdBy)} {t.createdBy} on{' '}
              {t.formattedCreatedAt}
            </div>
          </div>
        </div>
        <div className="flex justify-between text-center w-[150px] items-center">
          <div
            className="w-[50px] hover:bg-emerald-600 bg-emerald-400 p-[8px] cursor-pointer rounded min-w-[40px]"
            onClick={() => {
              setValue('update')
              setIdType(t.id)
            }}>
            <p className="m-0 text-white">{trans(tkeys.button.edit)}</p>
          </div>
          <div
            className="hover:bg-rose-600 bg-rose-400 p-[8px] cursor-pointer rounded min-w-[60px]"
            onClick={() => {
              deleteTypeHandle(t.id)
            }}>
            <p className="m-0 text-white">{trans(tkeys.button.delete)}</p>
          </div>
        </div>
      </div>
    )
  })

  if (inventoriesTypeData.length > 0) {
    return <div className="mt-[10px] h-[350px] overflow-y-auto">{TypeObj}</div>
  }
  return (
    <div className="mt-[10px] h-[350px] overflow-y-auto">
      <div className="flex items-center justify-center h-full">
        <div className='text-center'>
          <BsTrash style={{ ...styleIconMarch, fontSize: '40px' }} />
          <p className="m-0 mt-[5px] text-secondary">
            {trans(tkeys.button.empty)}
          </p>
        </div>
      </div>
    </div>
  )
}

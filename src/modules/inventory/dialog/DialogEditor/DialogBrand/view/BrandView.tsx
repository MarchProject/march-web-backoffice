import { BrandType } from '@/core/model/inventory'
import { tkeys } from '@/translations/i18n'
import { styleIconMarch } from '@/utils/style/utill'
import { useTranslation } from 'react-i18next'
import { BsTrash } from 'react-icons/bs'
import { HiOutlineWallet } from 'react-icons/hi2'
import { RiEdit2Line } from 'react-icons/ri'
import { AiOutlineDelete } from 'react-icons/ai'

interface IBrandObjView {
  inventoriesBrandData: BrandType[]
  setValue: (value: string) => void
  setIdBrand: (value: string) => void
  deleteBrandHandle: (id: string) => void
}

export const BrandObjView = ({
  inventoriesBrandData,
  setValue,
  deleteBrandHandle,
  setIdBrand,
}: IBrandObjView) => {
  const { t: trans }: any = useTranslation()
  const keys = tkeys.Inventory.MainPage.dialog.brand.mode.view
  const BrandObj = inventoriesBrandData?.map((t) => {
    return (
      <div key={t.id} className="mt-[10px] grid grid-cols-6">
        <div className="flex gap-[15px] col-span-5 lg:col-span-5">
          <HiOutlineWallet
            className="lg:!block !hidden"
            style={{ ...styleIconMarch, fontSize: '40px' }}
          />
          <div>
            <div className="flex gap-[15px]">
              <div className="text-primary text-lg font-semibold">
                {t._name}
              </div>
              <p className="m-0 max-w-[200px] my-auto truncate text-secondary text-sm">
                {t.description}
              </p>
            </div>
            <div className="text-secondary text-base lg:block hidden">
              {trans(keys.field.createdBy)} {t.createdBy} {trans(keys.field.on)}{' '}
              {t.formattedCreatedAt}
            </div>
            <div className="text-secondary text-base lg:hidden block">
              <p className="m-0">
                {trans(keys.field.createdBy)} {t.createdBy}
              </p>
              <p className="m-0">{t.formattedCreatedAt}</p>
            </div>
          </div>
        </div>
        <div className="flex justify-between text-center items-center gap-[10px]">
          <div className="lg flex gap-[10px] justify-end ml-auto pr-[10px]">
            <RiEdit2Line
              onClick={() => {
                setValue('update')
                setIdBrand(t.id)
              }}
              className="cursor-pointer text-primary200"
              size={20}
            />
            <AiOutlineDelete
              onClick={() => {
                deleteBrandHandle(t.id)
              }}
              className="cursor-pointer text-primary200"
              size={20}
            />
          </div>
        </div>
      </div>
    )
  })

  if (inventoriesBrandData.length > 0) {
    return <div className="mt-[10px] h-[350px]">{BrandObj}</div>
  }
  return (
    <div className="mt-[10px] h-[350px] overflow-y-auto">
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <BsTrash style={{ ...styleIconMarch, fontSize: '40px' }} />
          <p className="m-0 mt-[5px] text-secondary">
            {trans(tkeys.button.empty)}
          </p>
        </div>
      </div>
    </div>
  )
}

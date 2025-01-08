import Button from '@/components/commonAntd/Button/Button'
import Modal from '@/components/commonAntd/Modal/Modal'
import { IFavoriteStatus } from '@/core/gql/inventory/getInventoriesQuery'
import { GetTypesInventoryType } from '@/core/gql/inventory/getTypesInventoryQuery'
import { tkeys } from '@/translations/i18n'
import { Flex, Select, Tag } from 'antd'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { FcLikePlaceholder, FcLike } from 'react-icons/fc'

export type RenderItem = {
  id: string
  value: string | number | null
  label: React.ReactNode
  type: 'type' | 'brand' | 'branch'
  desc: string
}

type FilterPropsType = {
  inventoriesBranchData: GetTypesInventoryType[]
  inventoriesBrandData: GetTypesInventoryType[]
  inventoriesTypeData: GetTypesInventoryType[]
  onChange: (
    value: { value: string; label: React.ReactNode }[],
    option: any[],
  ) => void
  modalProps: {
    open: boolean
    handleOK: () => void
    handleCancel: () => void
  }
  favorite: IFavoriteStatus
  handleFavoriteChange: () => void
  handleClearChange: () => void
}

const Filter = ({
  inventoriesBranchData,
  inventoriesBrandData,
  inventoriesTypeData,
  onChange,
  modalProps,
  favorite,
  handleFavoriteChange,
}: FilterPropsType) => {
  const { t: trans } = useTranslation()
  const renderItem = (
    id: string,
    title: string,
    description: string,
    type: 'type' | 'brand' | 'branch',
  ): RenderItem => ({
    id: id,
    value: id,
    desc: description,
    label: (
      <Flex
        id={type === 'type' ? 'gold' : type === 'branch' ? 'lime' : 'cyan'}
        align="center"
        justify="space-between">
        {title}
        <span>{description}</span>
      </Flex>
    ),
    type,
  })

  const Title: React.FC<Readonly<{ title?: string }>> = (props) => (
    <Flex align="center" justify="space-between">
      {props.title}
      <a
        href="https://www.google.com/search?q=antd"
        target="_blank"
        rel="noopener noreferrer">
        more
      </a>
    </Flex>
  )

  const branchData = inventoriesBranchData.map((e) => {
    return renderItem(e.id, e.name, e.description, 'branch')
  })

  const brandData = inventoriesBrandData.map((e) => {
    return renderItem(e.id, e.name, e.description, 'brand')
  })
  const typeData = inventoriesTypeData.map((e) => {
    return renderItem(e.id, e.name, e.description, 'type')
  })

  const options = [
    {
      label: <Title title={trans(tkeys.Inventory.MainPage.filter.branch)} />,
      options: branchData,
    },
    {
      label: <Title title={trans(tkeys.Inventory.MainPage.filter.brand)} />,
      options: brandData,
    },
    {
      label: <Title title={trans(tkeys.Inventory.MainPage.filter.type)} />,
      options: typeData,
    },
  ]

  const tagRender = (props) => {
    const { label, closable, onClose } = props
    const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
      event.preventDefault()
      event.stopPropagation()
    }
    return (
      <Tag
        color={label?.props?.id}
        onMouseDown={onPreventMouseDown}
        closable={closable}
        onClose={onClose}
        style={{ marginInlineEnd: 4 }}>
        {label?.props?.children[0]}
      </Tag>
    )
  }

  const { handleCancel, handleOK, open } = modalProps

  return (
    <>
      <Modal
        title={trans(tkeys.Inventory.MainPage.filter.label)}
        open={open}
        handleOk={handleOK}
        handleCancel={handleCancel}
        contentRender={() => {
          return (
            <div className="mx-auto w-full pb-[0px]">
              <div className="px-0 flex gap-[10px]">
                <Select
                  mode="multiple"
                  allowClear
                  tagRender={tagRender}
                  style={{ width: '100%' }}
                  placeholder={trans(
                    tkeys.Inventory.MainPage.filter.placeholder,
                  )}
                  defaultValue={[]}
                  onChange={onChange}
                  labelInValue
                  options={options}
                />
                <Button
                  danger
                  variant="outlined"
                  icon={
                    favorite === 'DEFAULT' ? (
                      <FcLikePlaceholder
                        className="cursor-pointer text-primary"
                        size={18}
                        color="red"
                      />
                    ) : (
                      <FcLike
                        className="cursor-pointer text-primary"
                        size={18}
                      />
                    )
                  }
                  shape="circle"
                  onClick={() => {
                    handleFavoriteChange()
                  }}
                />
              </div>
            </div>
          )
        }}
        footerRender={() => <></>}
      />
    </>
  )
}

export default Filter

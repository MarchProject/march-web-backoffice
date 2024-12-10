import TableMarch from '@/components/commonAntd/Table/Table'
import React from 'react'
import { useControllerInventory } from './controllers/controller'
import Search from '@/components/commonAntd/Search/Search'
import { BsBoxSeam } from 'react-icons/bs'
import { styleIconMarch } from '@/utils/style/utill'
import { useTranslation } from 'react-i18next'
import { tkeys } from '@/translations/i18n'
import { Dropdown, MenuProps, message } from 'antd'
import { UserOutlined } from '@ant-design/icons'

const Container = () => {
  const {
    table: {
      handleSearchChange,
      userColumn,
      data: {
        inventory: {
          data: inventoryData,
          loading: inventoryLoading,
          totalRow,
          onChangePagination,
        },
      },
    },
  } = useControllerInventory()
  const { t: trans } = useTranslation()

  const items: MenuProps['items'] = [
    {
      label: '1st menu item',
      key: '1',
      icon: <UserOutlined />,
    },
    {
      label: '2nd menu item',
      key: '2',
      icon: <UserOutlined />,
    },
    {
      label: '3rd menu item',
      key: '3',
      icon: <UserOutlined />,
      danger: true,
    },
    {
      label: '4rd menu item',
      key: '4',
      icon: <UserOutlined />,
      danger: true,
      disabled: true,
    },
  ]

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    console.log('click', e)
  }

  const menuProps = {
    items,
    onClick: handleMenuClick,
  }

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    message.info('Click on left button.')
    console.log('click left button', e)
  }

  return (
    <div className="w-full mainBg min-h-[calc(100vh + 10px)] h-auto lg:h-[calc(100vh)]">
      <div className="p-[15px]">
        <div className="bg-white m-0 rounded-lg lg:min-h-[calc(100vh-63px)] min-h-[calc(100vh-56px)]">
          <div className="mb-[0px] h-full">
            <div className="p-4">
              <div className="h-[60px] flex justify-between">
                <div className="flex gap-[15px] my-auto">
                  <BsBoxSeam style={styleIconMarch} />
                  <p className="text-base text-primary font-medium">
                    {trans(tkeys.Inventory.MainPage.HeadText)}
                  </p>
                </div>
                <div>
                  <Dropdown.Button menu={menuProps} onClick={handleButtonClick}>
                    Dropdown
                  </Dropdown.Button>

                  <Search
                    loading={inventoryLoading}
                    onSearch={handleSearchChange}
                    inputProps={{
                      placeholder: trans(tkeys.Inventory.MainPage.searchText),
                      size: 'middle',
                    }}
                    style={{ width: 304 }}
                  />
                </div>
              </div>
              <TableMarch
                data={inventoryData ?? []}
                columns={userColumn}
                onChangePagination={onChangePagination}
                totalRow={totalRow}
                loading={inventoryLoading}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Container

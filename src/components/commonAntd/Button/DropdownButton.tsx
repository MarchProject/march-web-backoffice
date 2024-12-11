import React from 'react'
import { Dropdown, MenuProps } from 'antd'
import { DropdownButtonType } from 'antd/es/dropdown'

type DropdownButtonPropsType = {
  title: string
  menu: MenuProps
  type: DropdownButtonType
  onClick: () => void
}

const DropdownButton = ({
  title,
  menu,
  onClick,
}: DropdownButtonPropsType) => {
  return (
    <>
      <Dropdown.Button
        className="w-[120px]"
        type="primary"
        menu={menu}
        onClick={onClick}>
        {title}
      </Dropdown.Button>
    </>
  )
}

export default DropdownButton

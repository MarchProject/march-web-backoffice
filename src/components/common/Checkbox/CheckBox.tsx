import { Checkbox } from '@mui/material'
import classnames from 'classnames'
import React from 'react'
import { Control, Controller, FieldValues } from 'react-hook-form'

interface ICheckBox {
  id: string
  name: string
  classNames: string
  icon: React.ReactNode
  checkedIcon: React.ReactNode
  checked?: boolean
  onChange?: (value: boolean) => void
  error?: string
}
interface ICheckBoxForm extends ICheckBox {
  control: Control<FieldValues, any>
}

const CheckBox = ({
  classNames,
  icon,
  checkedIcon,
  checked = false,
  onChange,
  name,
  ...rest
}: ICheckBox) => {
  return (
    <Checkbox
      name={name}
      className={classnames(classNames)}
      size="medium"
      icon={icon}
      checkedIcon={checkedIcon}
      onChange={(_, checked) => onChange(checked)}
      checked={checked}
      {...rest}
    />
  )
}

const CheckBoxForm = ({ control, name, id, ...rest }: ICheckBoxForm) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        return (
          <>
            <CheckBox
              id={id}
              name={name}
              onChange={field.onChange}
              checked={field.value}
              error={error?.message}
              {...rest}
            />
          </>
        )
      }}
    />
  )
}

export { CheckBox, CheckBoxForm }

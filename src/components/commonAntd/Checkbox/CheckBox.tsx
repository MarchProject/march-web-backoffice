import { Checkbox } from 'antd'
import classnames from 'classnames'
import React from 'react'
import { Control, Controller, FieldValues } from 'react-hook-form'

interface ICheckBox {
  id: string
  name: string
  classNames: string
  icon?: React.ReactNode
  checkedIcon?: React.ReactNode
  checked?: boolean
  onChange?: (value: boolean) => void
  error?: string
  disabled?: boolean
  label?: string
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
  label,
  ...rest
}: ICheckBox) => {
  if (icon) {
    return (
      <div
        role="checkbox"
        aria-checked={checked}
        aria-disabled={rest.disabled}
        tabIndex={0}
        className={classnames(
          'cursor-pointer',
          { 'opacity-50 pointer-events-none': rest.disabled },
          classNames,
        )}
        onClick={() => !rest.disabled && onChange && onChange(!checked)}
        onKeyDown={(e) => {
          if (!rest.disabled && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault()
            onChange && onChange(!checked)
          }
        }}>
        {checked ? checkedIcon || icon : icon}
      </div>
    )
  }

  return (
    <Checkbox
      className={classnames(classNames)}
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      {...rest}>
      {label}
    </Checkbox>
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

import React, { useState } from 'react'
// import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs from '../../../core/common/dayjs'
import { Control, Controller, FieldValues } from 'react-hook-form'
import classnames from 'classnames'
import { DateValidationError } from '@mui/x-date-pickers/internals'
import { DatePicker } from 'antd'
import { SizeType } from 'antd/es/config-provider/SizeContext'

interface IDatePickerSelect {
  onChange: (value: any, keyboardInputValue?: string) => void
  value: any
  inputFormat: string
  label?: string
  inputLabel?: {
    label: string
    required: boolean
    classNames?: string
  }
  error: string
  onError?: (reason: DateValidationError, value: any) => void
  disabled?: boolean
  size?: SizeType
}

const DatePickerSelect = ({
  onChange,
  value,
  inputFormat,
  label,
  error,
  disabled,
  size,
}: IDatePickerSelect) => {
  return (
    <>
      <DatePicker
        value={value}
        size={size}
        style={{ width: '100%', maxWidth: '250px' }}
        placeholder={label}
        onChange={onChange}
        disabled={disabled}
        format={inputFormat}
      />
      {error && <p className="text-xs text-red-600">{error}</p>}
    </>
  )
}

interface IDatePickerSelectForm {
  id: string
  name: string
  control: Control<FieldValues, any>
  label?: string
  inputLabel?: {
    label: string
    required: boolean
    classNames?: string
  }
  inputFormat: string
  onError?: (reason: DateValidationError, value: any) => void
  disabled?: boolean
  size?: SizeType
}

const DatePickerSelectForm = ({
  id,
  name,
  control,
  inputFormat,
  label,
  inputLabel,
  ...rest
}: IDatePickerSelectForm) => {
  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => {
          const onChange = (value) => {
            const transformedDate = value
              ? dayjs(value).format(inputFormat)
              : null
            field.onChange(transformedDate)
          }
          const value = field?.value ? dayjs(field.value, inputFormat) : null
          return (
            <>
              <DatePickerSelect
                label={label}
                inputFormat={inputFormat}
                onChange={onChange}
                value={value}
                inputLabel={inputLabel}
                error={error?.message}
                {...rest}
              />
            </>
          )
        }}
      />
    </>
  )
}

export { DatePickerSelect, DatePickerSelectForm }

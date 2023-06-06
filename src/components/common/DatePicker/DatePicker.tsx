import React from 'react'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { Dayjs } from 'dayjs'
import { DbFormat, dateFormat } from '@/core/common'
import dayjs from '../../../core/common/dayjs'
import { TextField } from '@mui/material'
import { Control, Controller, FieldValues } from 'react-hook-form'
import classnames from 'classnames'

interface IDatePickerSelect {
  onChange: (value: any, keyboardInputValue?: string) => void
  value: any
  inputFormat: string
  mask: string
  label?: string
  inputLabel?: {
    label: string
    required: boolean
    classNames?: string
  }
  error: string
}

const DatePickerSelect = ({
  onChange,
  value,
  inputFormat,
  mask,
  label,
  inputLabel,
  error,
}: IDatePickerSelect) => {
  return (
    <>
      {inputLabel && (
        <div
          className={classnames(
            'text-xs text-gray-600 mb-[4px]',
            inputLabel.classNames,
          )}>
          {inputLabel.label}
          {inputLabel.required && <span className="text-rose-600"> * </span>}
        </div>
      )}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          className="!h-[40px]"
          disablePast
          mask={mask}
          label={label}
          acceptRegex={/^(0[1-9]|[1-2][0-9]|3[0-1])-(0[1-9]|1[0-2])-[0-9]{4}$/}
          openTo="day"
          // views={['year', 'month', 'day']}
          inputFormat={inputFormat}
          value={value}
          onChange={onChange}
          renderInput={(params) => <TextField {...params} size={'small'} />}
        />
      </LocalizationProvider>
      {error && <p>{error}</p>}
    </>
  )
}

interface IDatePickerSelectForm {
  id: string
  name: string
  control: Control<FieldValues, any>
  mask: string
  label?: string
  inputLabel?: {
    label: string
    required: boolean
    classNames?: string
  }
  inputFormat: string
}

const DatePickerSelectForm = ({
  id,
  name,
  control,
  mask,
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
            const transformedDate = dayjs(value).format(DbFormat)
            field.onChange(transformedDate)
          }
          const value = field?.value ? dayjs(field.value, DbFormat) : null
          return (
            <>
              <DatePickerSelect
                label={label}
                inputFormat={inputFormat}
                mask={mask}
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

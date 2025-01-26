import { noop } from '@/utils/common/noop'
import { AutoComplete } from 'antd'
import classnames from 'classnames'
import React, { useState } from 'react'
import {
  Control,
  Controller,
  ControllerRenderProps,
  FieldValues,
} from 'react-hook-form'

interface IAutocompleteSelectForm<T> extends IAutocompleteSelect<T> {
  control?: Control<FieldValues, any>
}
interface IAutocompleteSelect<T> {
  inputRef?: any
  id: string
  name?: string
  size?: 'small' | 'medium'
  options?: T[]
  value?: T
  loading?: boolean
  classNames?: string
  classLogic?: {
    classLogicTrue?: string
    classLogicFalse?: string
  }
  error?: string
  field?: ControllerRenderProps<FieldValues, any>
  onInputChange?: (value: string) => void
  onChange?: (value: T | string) => void
  labelIndex: keyof T
  valueIndex: keyof T
  InputProps?: {
    label?: string
    placeholder?: string
  }
  inputLabel?: {
    label: string
    required: boolean
    classNames?: string
  }
  disabled?: boolean
}

const AutocompleteSelectAsync = <T extends object>({
  id,
  options = [],
  loading = false,
  size = 'small',
  classNames,
  classLogic = {
    classLogicFalse: '',
    classLogicTrue: '',
  },
  labelIndex,
  value,
  valueIndex,
  onInputChange = noop,
  inputRef,
  InputProps,
  inputLabel,
  onChange,
  error,
  disabled,
  ...otherProps
}: IAutocompleteSelect<T>) => {

  const [focus, setFocus] = useState(false)

  const mappedOptions = options.map((option) => ({
    value: `${option[valueIndex]}`,
    label: `${option[labelIndex]}`,
  }))

  return (
    <>
      {inputLabel && (
        <div
          className={classnames(
            inputLabel.classNames,
            `text-xs ${
              focus ? ' !text-violet-400 ' : ' !text-gray-600 '
            } mb-[4px]`,
          )}>
          {inputLabel.label}
          {inputLabel.required && <span className="text-rose-600"> * </span>}
        </div>
      )}
      <AutoComplete
        id={id}
        style={{ width: '100%' }}
        options={mappedOptions}
        value={value ? `${value[labelIndex]}` : undefined}
        placeholder={InputProps?.placeholder || 'Select...'}
        disabled={disabled}
        onSearch={(value) => {
          onInputChange(value)
        }}
        onChange={(selectedValue) => {
          const selectedOption = options.find(
            (option) => `${option[valueIndex]}` === selectedValue,
          )
          onChange?.(selectedOption || selectedValue)
        }}
        notFoundContent={loading ? 'Loading...' : 'No options available'}
        className={classnames(classNames)}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        size="middle"
        {...otherProps}
      />
      {error && <div className="text-rose-600 text-xs mt-1">{error}</div>}
    </>
  )
}

const AutocompleteAsyncFrom = <T extends object>(
  props: IAutocompleteSelectForm<T>,
) => {
  const { id, name, control, ...rest } = props
  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => {
          const onChange = (value: any) => {
            field.onChange(value)
          }
          return (
            <AutocompleteSelectAsync<T>
              id={id}
              name={name}
              onChange={onChange}
              value={field.value}
              error={error?.message}
              {...rest}
            />
          )
        }}
      />
    </>
  )
}

export { AutocompleteSelectAsync, AutocompleteAsyncFrom }

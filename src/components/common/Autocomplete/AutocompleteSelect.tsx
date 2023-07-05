import { noop } from '@/utils/common/noop'
import {
  Autocomplete,
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
  AutocompleteInputChangeReason,
  FilterOptionsState,
  TextField,
} from '@mui/material'
import classnames from 'classnames'
import { debounce } from 'lodash'
import React, { SyntheticEvent, useState } from 'react'
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
  multiple?: boolean
  value?: T
  loading?: boolean
  classNames?: string
  classLogic?: {
    classLogicTrue?: string
    classLogicFalse?: string
  }
  error?: string
  field?: ControllerRenderProps<FieldValues, any>
  onInputChange?: (
    event: React.SyntheticEvent<Element, Event>,
    value: string,
    reason: AutocompleteInputChangeReason,
  ) => void
  onChange?: (
    event: SyntheticEvent<Element, Event>,
    value: string | T | null,
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<T>,
  ) => void
  labelIndex: keyof T
  valueIndex: keyof T
  filterOptions?: (options: T[], state: FilterOptionsState<T>) => T[]
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
  options,
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
  filterOptions,
  multiple = false,
  onInputChange = noop,
  inputRef,
  field,
  InputProps,
  inputLabel,
  onChange,
  error,
  ...otherProps
}: IAutocompleteSelect<T>) => {
  const [open, setOpen] = useState(false)

  const _classLogic = `${
    open ? classLogic.classLogicTrue : classLogic.classLogicFalse
  }`
  return (
    <>
      {inputLabel && (
        <div
          className={classnames(
            inputLabel.classNames,
            'text-xs text-gray-600 mb-[4px]',
          )}>
          {inputLabel.label}
          {inputLabel.required && <span className="text-rose-600"> * </span>}
        </div>
      )}
      <Autocomplete
        sx={{
          '& .MuiAutocomplete-tag': {
            maxWidth: '140px',
          },
          '& .MuiInputBase-input': {
            height: 'auto',
          },
        }}
        multiple={multiple}
        open={multiple ? open : undefined}
        style={{ zIndex: 999, backgroundColor: 'white' }}
        className={classnames(_classLogic, classNames, 'w-[100%]')}
        onFocus={() => {
          setOpen(true)
        }}
        onBlur={() => {
          setOpen(false)
        }}
        id={id}
        onChange={onChange}
        options={options}
        size={size}
        disableClearable={false}
        limitTags={1}
        value={value}
        filterOptions={filterOptions}
        isOptionEqualToValue={(option: T, value: T) =>
          option[valueIndex] === value[valueIndex]
        }
        onInputChange={debounce(onInputChange, 1000)}
        getOptionLabel={(option) => {
          if (typeof option === 'string') return option
          if (!option) return ''
          return `${option[labelIndex]}`
        }}
        loading={loading}
        filterSelectedOptions
        {...field}
        {...otherProps}
        renderInput={(params) => (
          <TextField
            sx={{
              '& .Mui-error': {
                marginLeft: 0,
              },
            }}
            inputRef={inputRef}
            {...params}
            label={InputProps?.label}
            placeholder={InputProps?.placeholder}
            error={!!error}
            value={value}
            helperText={error}
          />
        )}
      />
    </>
  )
}

const AutocompleteSelectAsyncFrom = <T extends object>(
  props: IAutocompleteSelectForm<T>,
) => {
  const { id, name, control, ...rest } = props
  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => {
          const onChange = (_event, value, _reason, _details) => {
            field.onChange(value)
          }
          return (
            <AutocompleteSelectAsync<T>
              id={id}
              name={name}
              // field={field}
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

export { AutocompleteSelectAsync, AutocompleteSelectAsyncFrom }
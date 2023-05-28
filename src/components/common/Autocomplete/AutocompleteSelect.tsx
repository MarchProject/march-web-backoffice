import {
  Autocomplete,
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
  FilterOptionsState,
  TextField,
} from '@mui/material'
import classnames from 'classnames'
import React, { SyntheticEvent, useState } from 'react'

interface IAutocompleteSelect<T> {
  id: string
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
  }
}

const AutocompleteSelectAsync = <T extends object>({
  id,
  options,
  loading = false,
  size = 'small',
  classNames,
  classLogic: { classLogicFalse, classLogicTrue },
  labelIndex,
  value,
  valueIndex,
  filterOptions,
  multiple = false,
  ...otherProps
}: IAutocompleteSelect<T>) => {
  const [open, setOpen] = useState(false)

  const _classLogic = `${open ? classLogicTrue : classLogicFalse}`

  return (
    <Autocomplete
      sx={{
        '& .MuiAutocomplete-tag': {
          maxWidth: '140px',
        },
      }}
      multiple={multiple}
      open={open}
      style={{ zIndex: 999, backgroundColor: 'white' }}
      className={classnames(_classLogic, classNames, 'w-[100%]')}
      onFocus={() => {
        setOpen(true)
      }}
      onBlur={() => {
        setOpen(false)
      }}
      id={id}
      options={options}
      size={size}
      disableClearable={false}
      limitTags={1}
      value={value}
      filterOptions={filterOptions}
      isOptionEqualToValue={(option: T, value: T) =>
        option[valueIndex] === value[valueIndex]
      }
      onInputChange={(e, v, r) => console.log({ e, v, r })}
      getOptionLabel={(option) => {
        if (typeof option === 'string') return option
        if (!option) return ''
        return `${option[labelIndex]}`
      }}
      loading={loading}
      filterSelectedOptions
      {...otherProps}
      renderInput={(params) => (
        <TextField {...params} label="Filter Type" placeholder="Type" />
      )}
    />
  )
}

export default AutocompleteSelectAsync

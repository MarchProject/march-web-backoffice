import React from 'react'
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormHelperText,
} from '@mui/material'
import { Control, Controller, FieldValues } from 'react-hook-form'

export interface IRadioOption {
  value: string
  label: string
  description?: string
}

interface RadioGroupFormProps extends IRadioGroupProps {
  id: string
  label: string
  name: string
  control: Control<FieldValues, any>
}

interface IRadioGroupProps {
  id: string
  label?: string
  name?: string
  control?: Control<FieldValues, any>
  options: IRadioOption[]
  error?: string
  value?: string
  onChange?: (value?: any) => void
  classNames?: string
  row?: boolean
}

const RadioGroupComponent = (props: IRadioGroupProps) => {
  const {
    id,
    label,
    name,
    options,
    value,
    error,
    onChange,
    classNames,
    row = false,
    ...rest
  } = props

  return (
    <FormControl
      component="fieldset"
      error={!!error}
      className={classNames}
      {...rest}>
      {label && (
        <FormLabel
          className="!text-secondary !font-semibold !text-sm"
          component="legend">
          {label}
        </FormLabel>
      )}
      <RadioGroup
        aria-labelledby={id}
        name={name}
        value={value}
        onChange={onChange}
        row={row}>
        {options.map((option) => (
          <>
            <FormControlLabel
              key={option.value}
              value={option.value}
              control={<Radio />}
              label={option.label}
              classes={{
                label: '!mt-[5px] !text-primary !font-semibold !text-md',
              }}
            />
            <p className="m-0  ml-8  !text-secondary !font-semibold !text-sm">
              {option.description}
            </p>
          </>
        ))}
      </RadioGroup>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  )
}

const RadioGroupForm = (props: RadioGroupFormProps) => {
  const { id, label, name, control, options, ...rest } = props

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <RadioGroupComponent
          id={id}
          label={label}
          name={name}
          options={options}
          value={field.value}
          onChange={field.onChange}
          error={error?.message}
          {...rest}
        />
      )}
    />
  )
}

export { RadioGroupForm, RadioGroupComponent }

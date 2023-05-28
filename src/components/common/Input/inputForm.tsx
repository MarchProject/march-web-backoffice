import { noop } from '@/utils/common/noop'
import {
  FormControl,
  OutlinedInputProps,
  TextField,
  TextFieldProps,
} from '@mui/material'
import React from 'react'
import {
  Control,
  Controller,
  ControllerRenderProps,
  FieldValues,
} from 'react-hook-form'
import classnames from 'classnames'

type InputFormProps = {
  id: string
  classNames?: string
  inputLabel: {
    label: string
    required: boolean
  }
  type: string
  name: string
  control: Control<FieldValues, any>
  variant: 'standard' | 'filled' | 'outlined'
}

interface IInputProps {
  id: string
  classNames?: string
  inputLabel?: {
    label: string
    required: boolean
  }
  type: string
  name: string
  control?: Control<FieldValues, any>
  field?: ControllerRenderProps<FieldValues, string>
  size?: 'small' | 'medium'
  error?: string
  onChange?: (value?: any) => void
  InputProps?: Partial<OutlinedInputProps>
  placeholder?: string
  variant?: 'standard' | 'filled' | 'outlined'
}

const Input = (props: IInputProps) => {
  const {
    id,
    inputLabel,
    type,
    name,
    field,
    error,
    size,
    classNames,
    onChange = noop,
    InputProps,
    variant = 'standard',
    placeholder,
  } = props
  return (
    <FormControl
      variant="standard"
      required
      fullWidth={inputLabel ? true : false}>
      {inputLabel && (
        <div className="text-xs text-gray-600 mb-[4px]">
          {inputLabel.label}
          {inputLabel.required && <span className="text-rose-600"> * </span>}
        </div>
      )}
      <TextField
        id={id}
        className={classnames(classNames)}
        name={name}
        variant={variant}
        InputProps={InputProps}
        placeholder={placeholder || inputLabel.label}
        type={type}
        onChange={onChange}
        helperText={error}
        {...field}
        error={!!error}
        size={size}
      />
    </FormControl>
  )
}

const InputForm = (props: InputFormProps) => {
  const { id, inputLabel, type, name, control, variant, ...rest } = props
  return (
    <>
      <Controller
        name={name}
        control={control}
        defaultValue=""
        render={({ field, fieldState: { error } }) => {
          return (
            <>
              <Input
                id={id}
                variant={variant}
                name={name}
                inputLabel={inputLabel}
                type={type}
                control={control}
                field={field}
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

export { InputForm, Input }

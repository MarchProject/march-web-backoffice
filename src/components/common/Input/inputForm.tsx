import { noop } from '@/utils/common/noop'
import { FormControl, OutlinedInputProps, TextField } from '@mui/material'
import React, { ChangeEvent, ChangeEventHandler } from 'react'
import {
  Control,
  Controller,
  ControllerRenderProps,
  FieldValues,
} from 'react-hook-form'
import classnames from 'classnames'
import { Normalization } from '@/utils/common/utils'

interface InputFormProps extends IInputProps {
  id: string
  classNames?: string
  inputLabel?: {
    label: string
    required: boolean
    classNames?: string
  }
  type: string
  name: string
  control: Control<FieldValues, any>
  variant: 'standard' | 'filled' | 'outlined'
  disable?: boolean
}

interface IInputProps {
  id: string
  inputRef?: any
  classNames?: string
  inputLabel?: {
    label: string
    required: boolean
    classNames?: string
  }
  type: string
  name: string
  control?: Control<FieldValues, any>
  field?: ControllerRenderProps<FieldValues, string>
  size?: 'small' | 'medium'
  error?: string
  value?: string
  onChange?: (value?: any) => void
  InputProps?: Partial<OutlinedInputProps>
  placeholder?: string
  variant?: 'standard' | 'filled' | 'outlined'
  label?: string
  required?: boolean
  multiline?: boolean
  rows?: number
  normalizes?: Normalization[]
}

const Input = (props: IInputProps) => {
  const {
    id,
    inputLabel,
    inputRef,
    type,
    name,
    field,
    error,
    value,
    size = 'small',
    classNames,
    onChange = noop,
    InputProps,
    variant = 'standard',
    placeholder,
    normalizes = [],
    multiline,
    ...rest
  } = props

  const validateNormalize = (normalizes: Normalization[], value: string) => {
    const isValid = normalizes.every((normalize) => {
      return normalize(value)
    })

    return isValid
  }
  const onChangeHelper: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e?.target?.value
    if (normalizes.length > 0 && value) {
      const isValid = validateNormalize(normalizes, value)
      if (!isValid) {
        return e.preventDefault()
      }
    }
    if (onChange) {
      console.log('pass')
      onChange(e)
    }
  }
  return (
    <FormControl
      variant="standard"
      required
      fullWidth={inputLabel ? true : false}>
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
      <TextField
        inputRef={inputRef}
        id={id}
        className={classnames(classNames)}
        name={name}
        variant={variant}
        value={value}
        InputProps={InputProps}
        placeholder={placeholder || inputLabel?.label}
        type={type}
        multiline={multiline}
        onChange={onChangeHelper}
        helperText={error}
        {...field}
        error={!!error}
        size={size}
        {...rest}
        sx={{
          '& .Mui-error': {
            marginLeft: 0,
          },
          '& .MuiInputBase-input': {
            // height: '28px',
            // paddingY: '6px',
          },
        }}
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
                onChange={field.onChange}
                value={field.value}
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

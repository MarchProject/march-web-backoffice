import React, { ChangeEvent, ChangeEventHandler, useState } from 'react'
import { Input as AntInput, InputProps } from 'antd'
import {
  Control,
  Controller,
  FieldValues,
} from 'react-hook-form'
import classnames from 'classnames'
import { noop } from '@/utils/common/noop'
import { Normalization } from '@/utils/common/utils'
import TextArea from 'antd/es/input/TextArea'

interface InputFormProps extends IInputProps {
  id: string
  inputLabel?: {
    label: string
    required: boolean
    classNames?: string
    classInput?: string
  }
  type: string
  name: string
  control: Control<FieldValues, any>
}

interface IInputProps extends InputProps {

  inputRef?: any
  inputLabel?: {
    label: string
    required: boolean
    classNames?: string
    classInput?: string
  }
  multiline?: boolean
  error?: string
  onChange?: (value?: any) => void
  normalizes?: Normalization[]
  rows?: number
}

const Input = (props: IInputProps) => {
  const {
    id,
    inputLabel,
    inputRef,
    type,
    name,
    error,
    value,
    size = 'large',
    classNames,
    onChange = noop,
    placeholder,
    normalizes = [],
    disabled,
    suffix,
    prefix,
    rows,
    multiline,
    ...rest
  } = props

  const validateNormalize = (normalizes: Normalization[], value: string) => {
    return normalizes.every((normalize) => normalize(value))
  }

  const onChangeHelper: ChangeEventHandler<
    HTMLTextAreaElement | HTMLInputElement
  > = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const value = e?.target?.value
    let _e = e
    _e.target.value = value.replace('  ', ' ')
    if (normalizes.length > 0 && value) {
      const isValid = validateNormalize(normalizes, value)
      if (!isValid) {
        e.preventDefault()
        return
      }
    }
    onChange(_e)
  }

  const [focus, setFocus] = useState(false)

  return (
    <div>
      {inputLabel && (
        <div
          className={classnames(
            inputLabel.classNames,
            `text-xs ${focus ? 'text-violet-400' : 'text-gray-600'} mb-1`,
          )}>
          {inputLabel.label}
          {inputLabel.required && <span className="text-rose-600"> *</span>}
        </div>
      )}
      {multiline ? (
        <TextArea
          rows={rows}
          placeholder={placeholder || inputLabel?.label}
          value={value}
          disabled={disabled}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          onChange={onChangeHelper}
        />
      ) : (
        <AntInput
          ref={inputRef}
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChangeHelper}
          placeholder={placeholder || inputLabel?.label}
          disabled={disabled}
          size={size}
          className={classnames(classNames, inputLabel?.classInput)}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          status={error ? 'error' : ''}
          prefix={prefix}
          suffix={suffix}
          {...rest}
        />
      )}
      {error && <div className="text-rose-600 text-xs mt-1">{error}</div>}
    </div>
  )
}

const InputForm = (props: InputFormProps) => {
  const { id, inputLabel, type, name, control, ...rest } = props

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Input
          id={id}
          name={name}
          inputLabel={inputLabel}
          type={type}
          onChange={field.onChange}
          value={field.value}
          error={error?.message}
          {...rest}
        />
      )}
    />
  )
}

export { InputForm, Input }

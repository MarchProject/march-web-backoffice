import { FormControl, TextField } from '@mui/material'
import React from 'react'
import { Control, Controller, FieldValues } from 'react-hook-form'

type InputFormProps = {
  id: string
  inputLabel: {
    label: string
    required: boolean
  }
  type: string
  name: string
  control: Control<FieldValues, any>
}

type InputProps = {
  id: string
  inputLabel: {
    label: string
    required: boolean
  }
  type: string
  name: string
  control: Control<FieldValues, any>
  field: any
  error?: string
}

export const Input = (props: InputProps) => {
  const { id, inputLabel, type, name, field, error } = props
  return (
    <FormControl variant="standard" required style={{ width: '100%' }}>
      <div className="text-xs text-gray-600 mb-[4px]">
        {inputLabel.label}
        {inputLabel.required && <span className="text-rose-600"> * </span>}
      </div>
      <TextField
        id={id}
        name={name}
        variant="standard"
        placeholder={inputLabel.label}
        type={type}
        helperText={error}
        {...field}
        error={!!error}
      />
      {/* <Input error={true} id={id} type={type} placeholder={inputLabel.label} /> */}
    </FormControl>
  )
}

const InputForm = (props: InputFormProps) => {
  const { id, inputLabel, type, name, control } = props
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
                name={name}
                inputLabel={inputLabel}
                type={type}
                control={control}
                field={field}
                error={error?.message}
              />
            </>
          )
        }}
      />
    </>
  )
}

export default InputForm

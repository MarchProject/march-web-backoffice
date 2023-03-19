import {
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
  TextField,
} from '@mui/material'
import React from 'react'

type InputFormProps = {
  id: string
  inputLabel: {
    label: string
    required: boolean
  }
  type: string
}

function InputForm(props: InputFormProps) {
  const { id, inputLabel, type } = props
  return (
    <FormControl variant="standard" required style={{ width: '100%' }}>
      <div className="text-xs text-gray-600 mb-[4px]">
        {inputLabel.label}
        {inputLabel.required && <span className="text-rose-600"> * </span>}
      </div>
      <Input error={true} id={id} type={type} placeholder={inputLabel.label} />
    </FormControl>
  )
}

export default InputForm

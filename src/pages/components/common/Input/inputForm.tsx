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
  label: string
  required: boolean
  type: string
}

function InputForm(props: InputFormProps) {
  const { id, label, required, type } = props
  return (
    <FormControl variant="standard" required>
      <InputLabel htmlFor="input-with-icon-adornment">{label}</InputLabel>
      <Input
        id={id}
        required={required}
        type={type}
        style={{ width: '100%', minWidth: '220px' }}
      />
    </FormControl>
  )
}

export default InputForm

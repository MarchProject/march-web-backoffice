import { Button } from '@mui/material'
import React from 'react'

type ButtonFormProps = {
  label: string
  color?:
    | 'primary'
    | 'inherit'
    | 'secondary'
    | 'success'
    | 'error'
    | 'info'
    | 'warning'
    | undefined
}

function ButtonForm(props: ButtonFormProps) {
  const { label, color } = props
  return (
    <Button
      style={{ width: '100%' }}
      variant="contained"
      color={color}
      onClick={() => {}}>
      {label}
    </Button>
  )
}

export default ButtonForm

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
  onClick: () => void
}

function ButtonForm(props: ButtonFormProps) {
  const { label, color, onClick } = props
  return (
    <Button
      style={{ width: '100%' }}
      variant="contained"
      color={color}
      onClick={() => onClick()}>
      {label}
    </Button>
  )
}

export default ButtonForm

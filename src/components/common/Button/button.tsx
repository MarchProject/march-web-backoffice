import { Button } from '@mui/material'
import classnames from 'classnames'
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
  variant?: 'text' | 'outlined' | 'contained'
  classNames?: string
  endIcon?: React.ReactNode
  disabled?: boolean
}

function ButtonForm(props: ButtonFormProps) {
  const {
    label,
    color,
    onClick,
    classNames,
    endIcon,
    variant = 'contained',
    disabled,
  } = props
  return (
    <Button
      className={classnames(classNames, '!w-[100%] !rounded-xl')}
      size="medium"
      variant={variant}
      color={color}
      endIcon={endIcon}
      disabled={disabled}
      onClick={onClick}>
      {label}
    </Button>
  )
}

export default ButtonForm

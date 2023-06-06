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
  classNames?: string
  endIcon?: React.ReactNode
}

function ButtonForm(props: ButtonFormProps) {
  const { label, color, onClick, classNames, endIcon } = props
  return (
    <Button
      className={classnames(classNames, 'w-[100%]')}
      variant="contained"
      color={color}
      endIcon={endIcon}
      onClick={() => onClick()}>
      {label}
    </Button>
  )
}

export default ButtonForm

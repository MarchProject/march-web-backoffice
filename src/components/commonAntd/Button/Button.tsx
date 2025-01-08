import React from 'react'
import { Button as ButtonAntd } from 'antd'
import { ButtonProps } from 'antd/es/button/button'

type ButtonPropsType = ButtonProps & {
  label?: string
}

const Button = ({ label, ...rest }: ButtonPropsType) => {
  return <ButtonAntd {...rest}>{label}</ButtonAntd>
}

export default Button

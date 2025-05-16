/* eslint-disable @next/next/no-img-element */

import React from 'react'
import { Control, FieldValues } from 'react-hook-form'

import { Avatar, Card } from 'antd'

const { Meta } = Card

type LoginFormProps = {
  onSubmit: any
  control: Control<FieldValues, any>
  signInOAuthHandle: () => void
}

function LoginForm({
  // onSubmit, control,
  signInOAuthHandle,
}: LoginFormProps) {
  return (
    <div className="p-4">
      <Card
        className="w-full max-w-[400px]"
        cover={
          <img
            alt="example"
            src={`${process.env.basePath}/public/login.jpeg`}
          />
        }>
        <div className="cursor-pointer" onClick={signInOAuthHandle}>
          <Meta
            avatar={
              <Avatar src={`${process.env.basePath}/public/google.svg`} />
            }
            title="Sign In"
            description="March Project"
          />
        </div>
      </Card>
    </div>
  )
}

export default LoginForm

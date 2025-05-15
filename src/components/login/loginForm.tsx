/* eslint-disable @next/next/no-img-element */

import React from 'react'
import { Control, FieldValues } from 'react-hook-form'
import Button from '../commonAntd/Button/Button'
import { Card, Space } from 'antd'

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
    <div className="">
      <Space direction="vertical" size={16}>
        <Card
          className="card-login"
          style={{ minWidth: 275, borderRadius: '20px' }}>
          <div className="grid lg:grid-cols-3 gap-4">
            <div className="col-span-2 hidden lg:block">
              <img
                src={`${process.env.basePath}/public/login.jpeg`}
                className="img-login"
                alt="img-login"
              />
            </div>
            <div className="lg:p-[20px] max-w-[250px] px-[20px]">
              <h2 className="lg:mt-[40px] text-gray-600 font-medium">
                Sign In
              </h2>
              <div className="mt-[30px] ">
                <Button
                  className="w-full !normal-case !font-normal !bg-white !text-primary !rounded-xl"
                  type="primary"
                  onClick={signInOAuthHandle}>
                  <img
                    className="w-[18px] mr-[15px]"
                    src={`${process.env.basePath}/public/google.svg`}
                    alt=""
                  />
                  <span>Sign In Google</span>
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </Space>
    </div>
  )
}

export default LoginForm

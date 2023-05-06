/* eslint-disable @next/next/no-img-element */
import { Card, CardContent } from '@mui/material'
import React from 'react'
import InputForm from '../common/Input/inputForm'
import ButtonForm from '../common/Button/button'
import { Control, FieldValues } from 'react-hook-form'

type LoginFormProps = {
  onSubmit: any
  control: Control<FieldValues, any>
}

function LoginForm({ onSubmit, control }: LoginFormProps) {
  return (
    <div className="">
      <Card className="card-login" sx={{ minWidth: 275, borderRadius: '20px' }}>
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="col-span-2 hidden sm:block">
            <img
              src={`${process.env.basePath}/public/login.jpeg`}
              className="img-login"
              alt="img-login"
            />
          </div>
          <div className="p-[20px] max-w-[250px]">
            <CardContent>
              <h2 className="mt-[40px] text-gray-600">Sign In</h2>
              <div className="mt-[10px] max-w-[220px]">
                <InputForm
                  control={control}
                  id="username"
                  name="username"
                  inputLabel={{ label: 'username', required: true }}
                  type={'text'}
                />
              </div>
              <div className="mt-[10px]">
                <InputForm
                  control={control}
                  id="password"
                  name="password"
                  inputLabel={{ label: 'password', required: true }}
                  type={'password'}
                />
              </div>
              <div className="mt-[30px]">
                <ButtonForm
                  color="primary"
                  label="Sign In"
                  onClick={onSubmit}
                />
              </div>
            </CardContent>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default LoginForm

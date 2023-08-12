/* eslint-disable @next/next/no-img-element */
import { Button, Card, CardContent } from '@mui/material'
import React from 'react'
import ButtonForm from '../common/Button/button'
import { Control, FieldValues } from 'react-hook-form'
import { InputForm } from '../common/Input'

type LoginFormProps = {
  onSubmit: any
  control: Control<FieldValues, any>
  signInOAuthHandle: () => void
}

function LoginForm({ onSubmit, control, signInOAuthHandle }: LoginFormProps) {
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
              <h2 className="mt-[40px] text-gray-600 font-medium">Sign In</h2>
              <div className="mt-[10px] max-w-[220px]">
                <InputForm
                  control={control}
                  id="username"
                  classNames="!w-[100%] !max-w-[220px]"
                  name="username"
                  inputLabel={{ label: 'username', required: true }}
                  type={'text'}
                  variant={'standard'}
                />
              </div>
              <div className="mt-[10px]">
                <InputForm
                  control={control}
                  id="password"
                  name="password"
                  inputLabel={{ label: 'password', required: true }}
                  type={'password'}
                  variant={'standard'}
                />
              </div>
              <div className="mt-[30px] ">
                <ButtonForm
                  classNames="!normal-case !font-normal"
                  color="primary"
                  label="Sign In"
                  onClick={onSubmit}
                />
              </div>
              <div className="mt-[30px] ">
                <Button
                  className="w-full !normal-case !font-normal !bg-white !text-primary !rounded-xl"
                  variant="contained"
                  onClick={signInOAuthHandle}>
                  <img
                    className="w-[18px] mr-[15px]"
                    src={`${process.env.basePath}/public/google.svg`}
                    alt=""
                  />
                  <span>Sign In Google</span>
                </Button>
              </div>
            </CardContent>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default LoginForm

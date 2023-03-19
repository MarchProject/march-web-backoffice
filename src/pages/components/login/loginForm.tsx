/* eslint-disable @next/next/no-img-element */
import {
  Button,
  Card,
  CardActions,
  CardContent,
  FormControl,
  InputLabel,
  TextField,
  Typography,
} from '@mui/material'
import React from 'react'
import Input from '@mui/material/Input'
import InputForm from '../common/Input/inputForm'
import ButtonForm from '../common/Button/button'

function LoginForm() {
  return (
    <div className="">
      <Card className="card-login" sx={{ minWidth: 275, borderRadius: '20px' }}>
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2">
            <img src="/login.jpeg" className="img-login" alt="" />
          </div>
          <div className="p-[20px]">
            <CardContent>
              <h2 className="mt-[40px] text-gray-600">Sign In</h2>
              <div className="mt-[10px]">
                <InputForm
                  id="username"
                  label="username"
                  required={false}
                  type={'text'}
                />
              </div>
              <div className="mt-[10px]">
                <InputForm
                  id="password"
                  label="password"
                  required={false}
                  type={'password'}
                />
              </div>
              <div className="mt-[30px]">
                <ButtonForm color="primary" label="Sign In" />
              </div>
              <div className="mt-[30px]">
                <ButtonForm color="primary" label="Contact" />
              </div>
            </CardContent>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default LoginForm

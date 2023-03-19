import { Button, Card, TextField } from '@mui/material'
import React from 'react'
import router from 'next/router'
import LoginForm from '../components/login/loginForm'

function Index() {
  return (
    <>
      <div className="bg-login">
        <div className="container mx-auto">
          <div className="layout-loginForm">
            <LoginForm />
          </div>
        </div>
      </div>
    </>
  )
}

export default Index

import LoginForm from '@/components/login/loginForm'
import React from 'react'
import { useLoginController } from './controller'
import BlockUi from 'react-block-ui'

const ContainerLogin = () => {
  const {
    signInState: { signInLoading },
    formHandler: { onSubmit, control },
    OAuth: { signInOAuthHandle },
  } = useLoginController()

  return (
    <BlockUi tag="div" blocking={signInLoading}>
      <div className="bg-login">
        <div className="container mx-auto">
          <div className="layout-loginForm">
            <LoginForm
              onSubmit={onSubmit}
              control={control}
              signInOAuthHandle={signInOAuthHandle}
            />
          </div>
        </div>
      </div>
    </BlockUi>
  )
}

export default ContainerLogin

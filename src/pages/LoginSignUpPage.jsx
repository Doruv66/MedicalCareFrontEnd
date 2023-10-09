import React from 'react'
import style from './LoginSignUp.module.css'
import LoginSignUp from '../components/LoginSignUp/LoginSignUp'

const LoginSignUpPage = () => {
  return (
    <div className={style.container}>
        <LoginSignUp />
    </div>
  )
}

export default LoginSignUpPage
import React from 'react'
import style from './LoginInput.module.css'

const LoginInput = (props) => {
  return (
    <div className={style.input_box}>
        <span className={style.icon}>{props.icon}</span>
        <input type={props.type} required/>
        <label>{props.name}</label>
    </div>
  )
}

export default LoginInput
import React, { useState } from 'react'
import style from './LoginInput.module.css'

const LoginInput = (props) => {

  const handleBlur = (value) => {
    if (props.validator(value)) {
        props.setError('');
    } else {
        props.setError(props.errorMessage);
    }
};

  return (
    <div className={style.input_box}>
        <span className={style.icon}>{props.icon}</span>
        <input type={props.type} 
        onChange={(e) => props.setProperty(e.target.value)} 
        onBlur={(e) => handleBlur(e.target.value)}
        required/>
        <label>{props.name}</label>
    </div>
  )
}

export default LoginInput
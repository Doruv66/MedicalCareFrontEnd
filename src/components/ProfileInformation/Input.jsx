import React, { useState } from 'react'
import style from './Input.module.css'

const Input = (props) => {

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
        value={props.value} 
        required/>
        <label>{props.name}</label>
    </div>
  )
}

export default Input
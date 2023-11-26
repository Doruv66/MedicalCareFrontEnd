import React from 'react'
import style from './noaccess.module.css'
import image from '../../assets/401.png'

const Error401 = () => {
  return (
    <div className={style.wrapper}>
      <img src={image} alt="401" />
      <h2>You don't have access to this page. Try to log in with an account</h2>
    </div>
  )
}

export default Error401
import React from 'react'
import image from '../../../assets/questionmarks.png'
import style from './QuestionsBanner.module.css'

const QuestionsBanner = () => {
  return (
    <div className={style.image}>
        <img src={image} alt="questions image" />
    </div>
  )
}

export default QuestionsBanner
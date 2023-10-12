import React from 'react'
import QuestionsBanner from './QuestionsBanner'
import QuestionList from './QuestionList'
import style from './Questions.module.css'

const Questions = () => {
  return (
    <>
        <h1>Popular Questions</h1>
        <div className={style.section}>
            <QuestionsBanner />
            <div className={style.questions}>
            <QuestionList />
            </div>
        </div>
    </>
  )
}

export default Questions